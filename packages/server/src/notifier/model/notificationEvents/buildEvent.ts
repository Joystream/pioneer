import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { EntitySubscriptionType, GeneralSubscriptionType } from '@/notifier/model/subscriptionTypes'
import { toNumbers } from '@/notifier/model/utils'

import { NotificationEvent, PartialNotif, PotentialNotif } from './types'

interface NotifsBuilder {
  generalEvent: (type: GeneralSubscriptionType, members: 'ANY' | (number | string)[]) => PartialNotif | []
  entityEvent: (type: EntitySubscriptionType, entityId: string) => PartialNotif
}

export type BuildEvents = (
  eventData: Omit<NotificationEvent, 'entityId' | 'potentialNotifications'>,
  entityId: string,
  build: (b: NotifsBuilder) => (PartialNotif | [])[]
) => NotificationEvent
export const buildEvents =
  (allMemberIds: number[]): BuildEvents =>
  (eventData, entityId, build): NotificationEvent => {
    const generalEvent: NotifsBuilder['generalEvent'] = (type, members) => {
      if (members.length === 0) return []

      const isDefault = isDefaultNotification(type)
      const relatedMembers =
        members === 'ANY' ? 'ANY' : { ids: toNumbers(members).filter((id) => allMemberIds.includes(id)) }

      return { notificationType: type, relatedMembers, isDefault }
    }

    const entityEvent: NotifsBuilder['entityEvent'] = (type, relatedEntityId) => ({
      notificationType: type,
      relatedEntityId,
    })

    const potentialNotifications = build({ generalEvent, entityEvent })
      .flat()
      .map<PotentialNotif>((event, index, list) => ({ ...event, priority: list.length - index }))

    return { ...eventData, entityId, potentialNotifications }
  }
