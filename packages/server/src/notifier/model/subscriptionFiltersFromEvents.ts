import { NotificationType, Prisma } from '@prisma/client'

import { NotificationEvent } from './notificationEvents'

interface SubscriptionFilter {
  notificationType: NotificationType
  entityIds?: { hasSome: string[] }
  member?: { chainMemberId: { in: string[] } }
}

type FilterByNotifType = { [k in NotificationType]: SubscriptionFilter }

export const subscriptionFiltersFromEvent = (events: NotificationEvent[]): Prisma.SubscriptionWhereInput[] => {
  const filtersByNotificationType = events.reduce<FilterByNotifType>(
    (filterByNotifType, { notificationType, relatedEntityId, relatedMemberIds }) => {
      const currentFilter: { entityIds: string[]; memberIds: string[] } = {
        entityIds: filterByNotifType[notificationType]?.entityIds?.hasSome ?? [],
        memberIds: filterByNotifType[notificationType]?.member?.chainMemberId.in ?? [],
      }
      const mergedFilter = {
        notificationType,
        entityIds: relatedEntityId && { hasSome: [...currentFilter.entityIds, relatedEntityId] },
        member: relatedMemberIds && { chainMemberId: { in: [...currentFilter.memberIds, ...relatedMemberIds] } },
      }
      return { ...filterByNotifType, [notificationType]: mergedFilter }
    },
    {} as FilterByNotifType
  )

  return Object.values(filtersByNotificationType)
}
