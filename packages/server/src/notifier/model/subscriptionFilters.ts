import { NotificationKind, Prisma } from '@prisma/client'
import { uniq } from 'lodash'

import { Subset } from '@/common/utils/types'
import { PotentialNotif } from '@/notifier/types'

import { isEntityPotentialNotif } from './event'

type Filter = Subset<
  Prisma.SubscriptionWhereInput,
  { kind: NotificationKind; entityId?: { in: string[] }; memberId?: { in: number[] } }
>
type FilterByNotifKind = { [k in NotificationKind]: Filter }

export const filterSubscriptions = (potentialNotifs: PotentialNotif[]): Prisma.SubscriptionWhereInput[] => {
  const filtersByNotificationKind = potentialNotifs.reduce<FilterByNotifKind>((filterByNotifKind, potentialNotif) => {
    const kind = potentialNotif.kind
    const filter = filterByNotifKind[kind]
    const toFilter = (obj: Omit<Filter, 'kind'>): Filter => ({ ...obj, kind })

    if (isEntityPotentialNotif(potentialNotif)) {
      const prev = filter?.entityId?.in ?? []
      const entityId: Filter['entityId'] = { in: uniq([...prev, potentialNotif.relatedEntityId]) }
      return { ...filterByNotifKind, [kind]: toFilter({ entityId }) }
    } else if (potentialNotif.relatedMembers !== 'ANY') {
      const prev = filter?.memberId?.in ?? []
      const memberId = { in: uniq([...prev, ...potentialNotif.relatedMembers.ids]) }
      return { ...filterByNotifKind, [kind]: toFilter({ memberId }) }
    } else {
      return filter ? filterByNotifKind : { ...filterByNotifKind, [kind]: toFilter({}) }
    }
  }, {} as FilterByNotifKind)

  return Object.values(filtersByNotificationKind)
}
