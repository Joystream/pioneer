import { GetNotificationEventsQuery } from '@/common/queries'
import { DocWithFragments } from '@/common/utils/types'
import { EntitySubscriptionKind, GeneralSubscriptionKind } from '@/notifier/model/subscriptionKinds'
import { EntityPotentialNotif, GeneralPotentialNotif, NotificationEvent } from '@/notifier/types'

export type ImplementedQNEvent = DocWithFragments<Required<GetNotificationEventsQuery['events'][0]>>
type QNEvent<T extends ImplementedQNEvent['__typename']> = { __typename: T } & ImplementedQNEvent

type PartialNotif = Omit<GeneralPotentialNotif, 'priority'> | Omit<EntityPotentialNotif, 'priority'>

export interface NotifsBuilder {
  generalEvent: (kind: GeneralSubscriptionKind, members: 'ANY' | (number | string)[]) => PartialNotif | []
  entityEvent: (kind: EntitySubscriptionKind, entityId: string) => PartialNotif
}

export type BuildEvents = (
  eventData: Omit<NotificationEvent, 'entityId' | 'potentialNotifications'>,
  entityId: string,
  excludeMembers: (number | string)[],
  build: (b: NotifsBuilder) => (PartialNotif | [])[]
) => NotificationEvent

export type NotifEventFromQNEvent<T extends ImplementedQNEvent['__typename'], Args extends any[] = []> = (
  event: QNEvent<T>,
  buildEvents: BuildEvents,
  ...args: Args
) => Promise<NotificationEvent>
