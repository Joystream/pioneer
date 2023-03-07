import { NotificationType, Prisma } from '@prisma/client'

import { NotificationEvent } from './notificationEvents'

interface SubscriptionFilter {
  notificationType: NotificationType
  entityIds?: { hasSome: string[] }
  memberId?: { in: number[] }
}

type FilterByNotifType = { [k in NotificationType]: SubscriptionFilter }

export const subscriptionFiltersFromEvent = (events: NotificationEvent[]): Prisma.SubscriptionWhereInput[] => {
  const filtersByNotificationType = events.reduce<FilterByNotifType>(
    (filterByNotifType, { notificationType, relatedEntityId, relatedMemberIds }) => {
      const currentFilter: { entityIds: string[]; memberId: number[] } = {
        entityIds: filterByNotifType[notificationType]?.entityIds?.hasSome ?? [],
        memberId: filterByNotifType[notificationType]?.memberId?.in ?? [],
      }
      const mergedFilter = {
        notificationType,
        entityIds: relatedEntityId && { hasSome: [...currentFilter.entityIds, relatedEntityId] },
        memberId: relatedMemberIds && { in: [...currentFilter.memberId, ...relatedMemberIds] },
      }
      return { ...filterByNotifType, [notificationType]: mergedFilter }
    },
    {} as FilterByNotifType
  )

  return Object.values(filtersByNotificationType)
}
