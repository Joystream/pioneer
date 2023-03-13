import { NotificationType, Prisma } from '@prisma/client'
import { uniq } from 'lodash'

import { Subset } from '@/common/utils/types'

import { isEntityPotentialNotif, PotentialNotif } from './notificationEvents'

type Filter = Subset<
  Prisma.SubscriptionWhereInput,
  { notificationType: NotificationType; entityId?: { in: string[] }; memberId?: { in: number[] } }
>
type FilterByNotifType = { [k in NotificationType]: Filter }

export const subscriptionFiltersFromEvent = (potentialNotifs: PotentialNotif[]): Prisma.SubscriptionWhereInput[] => {
  const filtersByNotificationType = potentialNotifs.reduce<FilterByNotifType>((filterByNotifType, potentialNotif) => {
    const type = potentialNotif.notificationType
    const filter = filterByNotifType[type]
    const toFilter = (obj: Omit<Filter, 'notificationType'>): Filter => ({ ...obj, notificationType: type })

    if (isEntityPotentialNotif(potentialNotif)) {
      const prev = filter?.entityId?.in ?? []
      const entityId: Filter['entityId'] = { in: uniq([...prev, potentialNotif.relatedEntityId]) }
      return { ...filterByNotifType, [type]: toFilter({ entityId }) }
    } else if (potentialNotif.relatedMembers !== 'ANY') {
      const prev = filter?.memberId?.in ?? []
      const memberId = { in: uniq([...prev, ...potentialNotif.relatedMembers.ids]) }
      return { ...filterByNotifType, [type]: toFilter({ memberId }) }
    } else {
      return filter ? filterByNotifType : { ...filterByNotifType, [type]: toFilter({}) }
    }
  }, {} as FilterByNotifType)

  return Object.values(filtersByNotificationType)
}
