import { difference, intersection } from 'lodash'
import { verbose } from 'npmlog'

import { getTypename } from '@/common/utils'
import { isDefaultSubscription } from '@/notifier/model/subscriptionKinds'
import { NotificationEvent, PotentialNotif } from '@/notifier/types'

import { BuildEvents, ImplementedQNEvent, NotifsBuilder } from './types'

export const buildEvents =
  (allMemberIds: number[], event: ImplementedQNEvent): BuildEvents =>
  (eventData, entityId, excludeMembers, build): NotificationEvent => {
    const generalEvent: NotifsBuilder['generalEvent'] = (kind, _members) => {
      const relatedMembers = getRelatedMembers(allMemberIds, _members, excludeMembers)
      if (!relatedMembers) return []
      return { kind, relatedMembers, isDefault: isDefaultSubscription(kind) }
    }

    const entityEvent: NotifsBuilder['entityEvent'] = (kind, relatedEntityId) => ({ kind, relatedEntityId })

    const potentialNotifications = build({ generalEvent, entityEvent })
      .flat()
      .map<PotentialNotif>((event, index, list) => ({ ...event, priority: list.length - index }))

    verbose('QN event', `Received ${getTypename(event)}:`, JSON.stringify(eventData.id))

    return { ...eventData, entityId, potentialNotifications }
  }

const getRelatedMembers = (
  allMemberIds: number[],
  members: 'ANY' | (number | string)[],
  excludeMemberIds: (number | string)[]
): 'ANY' | { ids: number[] } | undefined => {
  if (members === 'ANY') return 'ANY'

  const ids = intersection(difference(members.map(Number), excludeMemberIds.map(Number)), allMemberIds)
  return ids.length > 0 ? { ids } : undefined
}
