import { Prisma } from '@prisma/client'
import { request } from 'graphql-request'
import { uniq } from 'lodash'

import { QUERY_NODE_ENDPOINT, STARTING_BLOCK } from '@/common/config'
import { prisma } from '@/common/prisma'
import { GetNotificationEventsDocument } from '@/common/queries'

import { notifyByEmail } from './model/email'
import { toNotificationEvents } from './model/notificationEvents'
import { notificationsFromEvent } from './model/notifications'
import { subscriptionFiltersFromEvent } from './model/subscriptionFiltersFromEvents'

export async function run() {
  await createAndSaveNotifications()
  await sendNotifications()
}

interface ProgressDoc {
  block: number
  eventIds: string[]
}
const isProgressDoc = (consumed: any): consumed is ProgressDoc => typeof consumed === 'object'
const defaultProgress: ProgressDoc = { block: STARTING_BLOCK, eventIds: [] }
const PROGRESS_KEY = { key: 'Progress' }

export async function createAndSaveNotifications() {
  // Check the last block that where processed
  const { value } = (await prisma.store.findFirst({ where: PROGRESS_KEY })) ?? {}
  const progress: ProgressDoc = isProgressDoc(value) && value.block > STARTING_BLOCK ? value : defaultProgress

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    // Fetch events from the query nodes and break if non are found
    const qnVariables = { from: progress.block, exclude: progress.eventIds }
    const qnData = await request(QUERY_NODE_ENDPOINT, GetNotificationEventsDocument, qnVariables)
    if (qnData.events.length === 0) break

    // Generate the potential notification based on the query nodes data
    const events = qnData.events.map(toNotificationEvents)

    // Update the progress
    progress.block = Math.max(progress.block, ...events.map((event) => event.inBlock))
    progress.eventIds = events.flatMap((event) => (event.inBlock === progress.block ? event.id : []))

    const potentialNotifs = events.flatMap((event) => event.potentialNotifications)
    if (potentialNotifs.length === 0) continue

    // Fetch subscription and members related to the events
    const subscriptionFilter = { OR: subscriptionFiltersFromEvent(potentialNotifs) }
    const memberIds = uniq(potentialNotifs.flatMap((pn) => ('relatedMemberIds' in pn && pn.relatedMemberIds) || []))
    const [subscriptions, members] = await Promise.all([
      prisma.subscription.findMany({ where: subscriptionFilter }),
      prisma.member.findMany({ where: { id: { in: memberIds } } }),
    ])

    // Create and save new notifications
    const notifications = events.flatMap(notificationsFromEvent(subscriptions, members))
    await prisma.notification.createMany({ data: notifications })
  }

  // Save the curent proccess
  const document: Prisma.JsonObject = { block: progress.block, eventIds: progress.eventIds }
  const update = { value: document }
  prisma.store.upsert({ where: PROGRESS_KEY, update, create: { ...PROGRESS_KEY, ...update } })
}

async function sendNotifications() {
  const notifications = await prisma.notification.findMany({ where: { isSent: false }, include: { member: true } })

  const sendEmail = notifyByEmail()
  return Promise.all(
    notifications.map(async (notification) => {
      const { id, isSent } = await sendEmail(notification)
      if (isSent) {
        await prisma.notification.update({ where: { id }, data: { isSent: true } })
      } else {
        // TODO: update a fail counter instead so it can be retried N time later
        await prisma.notification.update({ where: { id }, data: { isSent: true } })
      }
    })
  )
}
