import { verbose } from 'npmlog'

import { getTypename } from '@/common/utils'
import { isDefaultSubscription } from '@/notifier/model/subscriptionKinds'

import { toNumbers } from '.'
import { BuildEvents, ImplementedQNEvent, NotificationEvent, NotifsBuilder, PotentialNotif } from './types'

export const buildEvents =
  (allMemberIds: number[], event: ImplementedQNEvent): BuildEvents =>
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

    verbose('QN event', `Received ${getTypename(event)}:`, JSON.stringify(eventData.id))

    return { ...eventData, entityId, potentialNotifications }
  }
