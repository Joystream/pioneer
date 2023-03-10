import { NotificationType } from '@prisma/client'

import { GetNotificationEventsQuery } from '@/common/queries'
import { DocWithFragments } from '@/common/utils/types'
import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { toNumbers } from '@/notifier/model/utils'

import { fromPostAddedEvent } from './forum'

type AnyQNEvent = GetNotificationEventsQuery['events'][0]
type ImplementedQNEvent = DocWithFragments<Required<GetNotificationEventsQuery['events'][0]>>
export type QNEvent<T extends ImplementedQNEvent['__typename']> = { __typename: T } & ImplementedQNEvent

export interface PotentialNotification {
  notificationType: NotificationType
  isDefault: boolean
  priority: number
  relatedEntityId?: string
  relatedMemberIds?: number[]
}
export interface NotificationEvent {
  id: string
  inBlock: number
  entityId: string
  potentialNotifications: PotentialNotification[]
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

type PartialNotif = Omit<PotentialNotification, 'priority'>
interface NotifsBuilder {
  generalEvent: (notificationType: NotificationType, isDefault?: boolean) => PartialNotif
  entityEvent: (notificationType: NotificationType, relatedEntityId: string) => PartialNotif
  memberEvent: (
    notificationType: NotificationType,
    relatedMemberIds: (number | string)[],
    isDefault?: boolean
  ) => PartialNotif | false
}
export type EventData = Omit<NotificationEvent, 'entityId' | 'potentialNotifications'>
type BuildPotentialNotifs = (b: NotifsBuilder) => (PartialNotif | false)[]

export type BuildEvent = (
  eventData: EventData,
  entityId: string,
  buildEvents: BuildPotentialNotifs
) => NotificationEvent
const buildEvent: BuildEvent = (eventData, entityId, buildEvents) => {
  const generalEvent: NotifsBuilder['generalEvent'] = (
    notificationType,
    isDefault = isDefaultNotification(notificationType)
  ) => ({ notificationType, isDefault })

  const entityEvent: NotifsBuilder['entityEvent'] = (notificationType, relatedEntityId) => ({
    ...generalEvent(notificationType, false),
    relatedEntityId,
  })

  const memberEvent: NotifsBuilder['memberEvent'] = (notificationType, relatedMemberIds) =>
    relatedMemberIds.length > 0 && {
      ...generalEvent(notificationType),
      relatedMemberIds: toNumbers(relatedMemberIds),
    }

  const potentialNotifications: PotentialNotification[] = buildEvents({
    generalEvent,
    entityEvent,
    memberEvent,
  }).flatMap((event, index, list) => (!event ? [] : { ...event, priority: list.length - index }))

  return { ...eventData, entityId, potentialNotifications }
}
