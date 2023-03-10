import { NotificationType, Prisma } from '@prisma/client'
import { uniq } from 'lodash'

import { PotentialNotif } from './notificationEvents'

interface SubscriptionFilter {
  notificationType: NotificationType
  entityIds?: { hasSome: string[] }
  memberId?: { in: number[] }
}

type FilterByNotifType = { [k in NotificationType]: SubscriptionFilter }

export const subscriptionFiltersFromEvent = (potentialNotifs: PotentialNotif[]): Prisma.SubscriptionWhereInput[] => {
  const filtersByNotificationType = potentialNotifs.reduce<FilterByNotifType>((filterByNotifType, potentialNotif) => {
    const type = potentialNotif.notificationType
    const filter = filterByNotifType[type]
    const toFilter = (obj: Omit<SubscriptionFilter, 'notificationType'>) => ({ ...obj, notificationType: type })

    if ('relatedEntityId' in potentialNotif) {
      const prev = filter?.entityIds?.hasSome ?? []
      const entityIds = { hasSome: uniq([...prev, potentialNotif.relatedEntityId]) }
      return { ...filterByNotifType, [type]: toFilter({ entityIds }) }
    } else if (potentialNotif.relatedMemberIds) {
      const prev = filter?.memberId?.in ?? []
      const memberId = { in: uniq([...prev, ...potentialNotif.relatedMemberIds]) }
      return { ...filterByNotifType, [type]: toFilter({ memberId }) }
    } else {
      return filter ? filterByNotifType : { ...filterByNotifType, [type]: toFilter({}) }
    }
  }, {} as FilterByNotifType)

  return Object.values(filtersByNotificationType)
}
