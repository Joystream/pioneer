import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { EntitySubscriptionType, GeneralSubscriptionType } from '@/notifier/model/notificationTypes'
import { toNumbers } from '@/notifier/model/utils'

import { EntitiyPotentialNotif, GeneralPotentialNotif, NotificationEvent, PotentialNotif } from './types'

type PartialNotif = Omit<GeneralPotentialNotif, 'priority'> | Omit<EntitiyPotentialNotif, 'priority'>

interface NotifsBuilder {
  generalEvent: (type: GeneralSubscriptionType) => PartialNotif | false
  membershipEvent: (type: GeneralSubscriptionType, memberIds: (number | string)[]) => PartialNotif | false
  entityEvent: (type: EntitySubscriptionType, entityId: string) => PartialNotif
}

export const buildEvents = (
  eventData: Omit<NotificationEvent, 'entityId' | 'potentialNotifications'>,
  entityId: string,
  buildEvents: (b: NotifsBuilder) => (PartialNotif | false)[]
): NotificationEvent => {
  const generalEvent: NotifsBuilder['generalEvent'] = (type) => ({ notificationType: type, isDefault: false })

  const membershipEvent: NotifsBuilder['membershipEvent'] = (type, memberIds) =>
    (!memberIds || memberIds.length > 0) && {
      notificationType: type,
      relatedMemberIds: memberIds && toNumbers(memberIds),
      isDefault: isDefaultNotification(type),
    }

  const entityEvent: NotifsBuilder['entityEvent'] = (type, relatedEntityId) => ({
    notificationType: type,
    relatedEntityId,
    isDefault: false,
  })

  const potentialNotifications: PotentialNotif[] = buildEvents({ generalEvent, membershipEvent, entityEvent }).flatMap(
    (event, index, list) => (!event ? [] : { ...event, priority: list.length - index })
  )

  return { ...eventData, entityId, potentialNotifications }
}
