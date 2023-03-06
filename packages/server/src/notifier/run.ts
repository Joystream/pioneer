import { request } from 'graphql-request'

import { QUERY_NODE_ENDPOINT } from '@/common/config'
import { prisma } from '@/common/prisma'
import { GetNotificationEventsDocument } from '@/common/queries'

import { createEmail } from './model/email'
import { notificationEvents } from './model/notificationEvents'
import { createNotifications } from './model/notifications'
import { subscriptionFiltersFromEvent } from './model/subscriptionFiltersFromEvents'
import { unique } from './model/utils'

export async function run() {
  await createAndSaveNotifications()
  await sendNotifications()
}

export async function createAndSaveNotifications() {
  // TODO request based on the lastConsumedBlock
  // Fetch events from the query node
  const qnData = await request(QUERY_NODE_ENDPOINT, GetNotificationEventsDocument)

  // Generate the potential notification based on the query nodes data
  const events = qnData.events.flatMap(notificationEvents)

  // Fetch subscription and members related to the events
  const subscriptionFilter = { OR: subscriptionFiltersFromEvent(events) }
  const allMembershipIds = unique(events.flatMap(({ relatedMemberIds = [] }) => relatedMemberIds))
  const [subscriptions, members] = await Promise.all([
    prisma.subscription.findMany({ where: subscriptionFilter, include: { member: true } }),
    prisma.member.findMany({ where: { chainMemberId: { in: allMembershipIds } } }),
  ])

  // Create and save new notifications
  const notifications = createNotifications(subscriptions, members, events)
  await prisma.notification.createMany({ data: notifications })

  // TODO update the lastConsumedBlock
}

async function sendNotifications() {
  const notifications = await prisma.notification.findMany({ where: { isSent: false }, include: { member: true } })
  return await Promise.all(
    notifications.map(async (notification) => {
      const email = createEmail(notification)

      // TODO send notification

      return prisma.notification.update({ where: { id: notification.id }, data: { isSent: true } })
    })
  )
}
