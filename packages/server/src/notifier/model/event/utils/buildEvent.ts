import { isDefaultSubscription } from '@/notifier/model/subscriptionKinds'

import { toNumbers } from '.'
import { BuildEvents, NotificationEvent, NotifsBuilder, PotentialNotif } from './types'

export const buildEvents =
  (allMemberIds: number[]): BuildEvents =>
  (eventData, entityId, build): NotificationEvent => {
    const generalEvent: NotifsBuilder['generalEvent'] = (kind, members) => {
      if (members.length === 0) return []

      const isDefault = isDefaultSubscription(kind)
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
