import { Prisma } from '@prisma/client'
import { request } from 'graphql-request'

import { QUERY_NODE_ENDPOINT, STARTING_BLOCK } from '@/common/config'
import { prisma } from '@/common/prisma'
import { GetNotificationEventsDocument } from '@/common/queries'

import { toNotificationEvents } from './model/event'
import { notificationsFromEvent } from './model/notifications'
import { filterSubscriptions } from './model/subscriptionFilters'

interface ProgressDoc {
  block: number
  eventIds: string[]
}
const isProgressDoc = (consumed: any): consumed is ProgressDoc => typeof consumed === 'object'
const defaultProgress: ProgressDoc = { block: STARTING_BLOCK, eventIds: [] }
const PROGRESS_KEY = { key: 'Progress' }

export const createNotifications = async (): Promise<void> => {
  // Check the last block that where processed
  const { value } = (await prisma.store.findUnique({ where: PROGRESS_KEY })) ?? {}
  const progress: ProgressDoc = isProgressDoc(value) && value.block > STARTING_BLOCK ? value : defaultProgress

  const allMemberIds = (await prisma.member.findMany()).map(({ id }) => id)

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    // Fetch events from the query nodes and break if non are found
    const qnVariables = { from: progress.block, exclude: progress.eventIds }
    const qnData = await request(QUERY_NODE_ENDPOINT, GetNotificationEventsDocument, qnVariables)
    if (qnData.events.length === 0) break

    // Generate the potential notification based on the query nodes data
    const events = await Promise.all(qnData.events.map(toNotificationEvents(allMemberIds)))

    // Update the progress
    progress.block = Math.max(progress.block, ...events.map((event) => event.inBlock))
    progress.eventIds = events.flatMap((event) => (event.inBlock === progress.block ? event.id : []))

    const potentialNotifs = events.flatMap((event) => event.potentialNotifications)
    if (potentialNotifs.length === 0) continue

    // Fetch subscription related to the events
    const subscriptionFilter = { OR: filterSubscriptions(potentialNotifs) }
    const subscriptions = await prisma.subscription.findMany({ where: subscriptionFilter })

    // Create and save new notifications
    const notifications = events.flatMap(notificationsFromEvent(subscriptions, allMemberIds))
    await prisma.notification.createMany({ data: notifications })
  }

  // Save the curent proccess
  const document: Prisma.JsonObject = { block: progress.block, eventIds: progress.eventIds }
  const update = { value: document }
  prisma.store.upsert({ where: PROGRESS_KEY, update, create: { ...PROGRESS_KEY, ...update } })
}
