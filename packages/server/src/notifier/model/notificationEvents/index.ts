import { NotificationType } from '@prisma/client'

import { GetNotificationEventsQuery } from '@/common/queries'

import { fromPostAddedEvent } from './forum'

type AnyQNEvent = GetNotificationEventsQuery['events'][0]
export type QNEvent<T extends AnyQNEvent['__typename']> = { __typename: T } & AnyQNEvent

export interface NotificationEvent {
  notificationType: NotificationType
  isDefault: boolean
  priority: number
  entityId: string
  eventId: string
  relatedEntityId?: string
  relatedMemberIds?: string[]
}

export const notificationEvents = (event: AnyQNEvent): NotificationEvent[] => {
  switch (event.__typename) {
    case 'PostAddedEvent':
      return fromPostAddedEvent(event as QNEvent<'PostAddedEvent'>)

    default:
      /* eslint-disable-next-line no-console */
      console.error('Unsupported query node event:', event.__typename)
      return []
  }
}

type PartialEvent = Omit<NotificationEvent, 'priority'>
interface EventBuilder {
  generalEvent: (notificationType: NotificationType, isDefault?: boolean) => PartialEvent
  entityEvent: (notificationType: NotificationType, relatedEntityId: string) => PartialEvent
  memberEvent: (
    notificationType: NotificationType,
    relatedMemberIds: string[],
    isDefault?: boolean
  ) => PartialEvent | false
}
type BuildEvents = (b: EventBuilder) => (PartialEvent | false)[]
export const buildEvents = (eventId: string, entityId: string, buildEvents: BuildEvents): NotificationEvent[] => {
  const generalEvent: EventBuilder['generalEvent'] = (notificationType, isDefault = false) => ({
    notificationType,
    eventId,
    entityId,
    isDefault,
  })

  const entityEvent: EventBuilder['entityEvent'] = (notificationType, relatedEntityId) => ({
    ...generalEvent(notificationType, false),
    relatedEntityId,
  })

  const memberEvent: EventBuilder['memberEvent'] = (notificationType, relatedMemberIds, isDefault = true) =>
    relatedMemberIds.length > 0 && {
      ...generalEvent(notificationType, isDefault),
      relatedMemberIds,
    }

  return buildEvents({ generalEvent, entityEvent, memberEvent }).flatMap((event, index, list) =>
    !event ? [] : { ...event, priority: list.length - index }
  )
}
