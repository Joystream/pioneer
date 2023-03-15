import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { EntitySubscriptionKind, GeneralSubscriptionKind } from '@/notifier/model/subscriptionKinds'

import { NotificationEvent, PartialNotif, PotentialNotif } from './types'
import { toNumbers } from './utils'

interface NotifsBuilder {
  generalEvent: (kind: GeneralSubscriptionKind, members: 'ANY' | (number | string)[]) => PartialNotif | []
  entityEvent: (kind: EntitySubscriptionKind, entityId: string) => PartialNotif
}

export type BuildEvents = (
  eventData: Omit<NotificationEvent, 'entityId' | 'potentialNotifications'>,
  entityId: string,
  build: (b: NotifsBuilder) => (PartialNotif | [])[]
) => NotificationEvent
export const buildEvents =
  (allMemberIds: number[]): BuildEvents =>
  (eventData, entityId, build): NotificationEvent => {
    const generalEvent: NotifsBuilder['generalEvent'] = (kind, members) => {
      if (members.length === 0) return []

      const isDefault = isDefaultNotification(kind)
      const relatedMembers =
        members === 'ANY' ? 'ANY' : { ids: toNumbers(members).filter((id) => allMemberIds.includes(id)) }

      return { kind, relatedMembers, isDefault }
    }

    const entityEvent: NotifsBuilder['entityEvent'] = (kind, relatedEntityId) => ({ kind, relatedEntityId })

    const potentialNotifications = build({ generalEvent, entityEvent })
      .flat()
      .map<PotentialNotif>((event, index, list) => ({ ...event, priority: list.length - index }))

    return { ...eventData, entityId, potentialNotifications }
  }
