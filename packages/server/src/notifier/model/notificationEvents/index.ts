import { GetNotificationEventsQuery } from '@/common/queries'
import { DocWithFragments } from '@/common/utils/types'
import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { EntitySubscriptionType, GeneralSubscriptionType } from '@/notifier/model/notificationTypes'
import { toNumbers } from '@/notifier/model/utils'

import { fromPostAddedEvent } from './forum'

type AnyQNEvent = GetNotificationEventsQuery['events'][0]
type ImplementedQNEvent = DocWithFragments<Required<GetNotificationEventsQuery['events'][0]>>
export type QNEvent<T extends ImplementedQNEvent['__typename']> = { __typename: T } & ImplementedQNEvent

type GeneralEventParams = { notificationType: GeneralSubscriptionType; relatedMemberIds?: number[] }
type EntityEventParams = { notificationType: EntitySubscriptionType; relatedEntityId: string }
export type GeneralPotentialNotif = { isDefault: boolean; priority: number } & GeneralEventParams
export type EntitiyPotentialNotif = { isDefault: false; priority: number } & EntityEventParams

export type PotentialNotif = GeneralPotentialNotif | EntitiyPotentialNotif

export interface NotificationEvent {
  id: string
  inBlock: number
  entityId: string
  potentialNotifications: PotentialNotif[]
}

export const toNotificationEvents = (anyEvent: AnyQNEvent): NotificationEvent => {
  // NOTE: The conversion to ImplementedQNEvent assumes that the QN will only return
  // events with fragments defined in the codegen document.
  // As a result any event fragment not implemented here will result in a type error.
  const event = anyEvent as ImplementedQNEvent

  switch (event.__typename) {
    case 'PostAddedEvent':
      return fromPostAddedEvent(event, buildEvent)
  }
}

type PartialNotif = Omit<GeneralPotentialNotif, 'priority'> | Omit<EntitiyPotentialNotif, 'priority'>
interface NotifsBuilder {
  generalEvent: (type: GeneralSubscriptionType, memberIds?: (number | string)[]) => PartialNotif | false
  entityEvent: (type: EntitySubscriptionType, entityId: string) => PartialNotif
}
export type EventData = Omit<NotificationEvent, 'entityId' | 'potentialNotifications'>
type BuildPotentialNotifs = (b: NotifsBuilder) => (PartialNotif | false)[]

export type BuildEvent = (
  eventData: EventData,
  entityId: string,
  buildEvents: BuildPotentialNotifs
) => NotificationEvent
const buildEvent: BuildEvent = (eventData, entityId, buildEvents) => {
  const generalEvent: NotifsBuilder['generalEvent'] = (type, memberIds) =>
    (!memberIds || memberIds.length > 0) && {
      notificationType: type,
      isDefault: isDefaultNotification(type),
      relatedMemberIds: memberIds && toNumbers(memberIds),
    }

  const entityEvent: NotifsBuilder['entityEvent'] = (notificationType, relatedEntityId) => ({
    notificationType,
    relatedEntityId,
    isDefault: false,
  })

  const potentialNotifications: PotentialNotif[] = buildEvents({ generalEvent, entityEvent }).flatMap(
    (event, index, list) => (!event ? [] : { ...event, priority: list.length - index })
  )

  return { ...eventData, entityId, potentialNotifications }
}
