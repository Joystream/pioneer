import { NotificationType } from '@prisma/client'

import { GetNotificationEventsQuery } from '../../../common/queries'

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

export const buildEvent =
  (eventId: string, entityId: string) =>
  (
    notificationType: NotificationType,
    isDefault: boolean,
    priority: number,
    params: Pick<NotificationEvent, 'relatedEntityId' | 'relatedMemberIds'> = {}
  ): NotificationEvent[] =>
    params.relatedMemberIds?.length === 0
      ? []
      : [{ notificationType, isDefault, priority, entityId, eventId, ...params }]
