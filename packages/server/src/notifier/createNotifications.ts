import { Prisma, Subscription } from '@prisma/client'
import { request } from 'graphql-request'
import { clone, groupBy, isEqual, isObject, mapValues } from 'lodash'
import { info, verbose, warn } from 'npmlog'

import { QUERY_NODE_ENDPOINT, STARTING_BLOCK } from '@/common/config'
import { prisma } from '@/common/prisma'
import { GetCurrentRolesDocument, GetNotificationEventsDocument } from '@/common/queries'
import { count, getTypename } from '@/common/utils'

import { toNotificationEvents } from './model/event'
import { notificationsFromEvent } from './model/notifications'
import { filterSubscriptions } from './model/subscriptionFilters'
import { Notification, NotificationEvent, PotentialNotif, ProgressDocument } from './types'

export const createNotifications = async (): Promise<void> => {
  // Check the last block that where processed
  const { value: initialProgress } = (await prisma.store.findUnique({ where: PROGRESS_KEY })) ?? {}
  const progress: ProgressDocument =
    isProgressDocument(initialProgress) && initialProgress.block > STARTING_BLOCK
      ? clone(initialProgress)
      : defaultProgress

  const allMembers = (await prisma.member.findMany()).map(({ id, receiveEmails }) => ({ id, receiveEmails }))

  const qnRoles = await request(QUERY_NODE_ENDPOINT, GetCurrentRolesDocument)

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    // Save the current process
    if (!isEqual(progress, initialProgress)) {
      info('Save progress', `Processed up to block ${progress.block} events`, progress.eventIds)
      const update = { value: progress as Record<string, any> as Prisma.JsonObject }
      await prisma.store.upsert({ where: PROGRESS_KEY, update, create: { ...PROGRESS_KEY, ...update } })
    }

    // Fetch events from the query nodes and break if non are found
    const qnVariables = { from: progress.block, exclude: progress.eventIds }
    const qnEvents = await request(QUERY_NODE_ENDPOINT, GetNotificationEventsDocument, qnVariables)
    info(
      'QN events',
      `Received ${qnEvents.events.length} new events`,
      mapValues(groupBy(qnEvents.events, getTypename), count),
      `from block ${progress.block} onward excluding`,
      progress.eventIds
    )

    if (qnEvents.events.length === 0) break

    // Generate the potential notification based on the query nodes data
    const events: NotificationEvent[] = await Promise.all(
      qnEvents.events.map(
        toNotificationEvents(
          allMembers.map(({ id }) => id),
          qnRoles
        )
      )
    )

    // Update the progress
    progress.block = Math.max(progress.block, ...events.map((event) => event.inBlock))
    progress.eventIds = events.flatMap((event) => (event.inBlock === progress.block ? event.id : []))

    const potentialNotifs: PotentialNotif[] = events.flatMap((event) => event.potentialNotifications)
    if (potentialNotifs.length === 0) continue

    // Fetch subscription related to the events
    const subscriptionFilter = { OR: filterSubscriptions(potentialNotifs) }
    const subscriptions: Subscription[] = await prisma.subscription.findMany({ where: subscriptionFilter })

    // Create and save new notifications
    const notifications: Notification[] = events.flatMap(notificationsFromEvent(subscriptions, allMembers))
    info('New notifications', 'Saving', notifications.length, 'new notifications')
    verbose(
      'New notifications',
      'Saving:',
      notifications.map(({ kind, eventId, memberId }) => `${eventId}, member ${memberId}: ${kind}`)
    )
    const created = await prisma.notification.createMany({ data: notifications, skipDuplicates: true })

    if (created.count < notifications.length) {
      warn('Notification duplicates', `${notifications.length - created.count} duplicates where skipped`)
    }
  }
}

const isProgressDocument = (consumed: any): consumed is ProgressDocument => isObject(consumed)
const defaultProgress: ProgressDocument = { block: STARTING_BLOCK, eventIds: [] }
const PROGRESS_KEY = { key: 'Progress' }
