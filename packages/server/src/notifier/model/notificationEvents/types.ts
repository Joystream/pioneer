import { GetNotificationEventsQuery } from '@/common/queries'
import { DocWithFragments } from '@/common/utils/types'
// import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { EntitySubscriptionType, GeneralSubscriptionType } from '@/notifier/model/notificationTypes'

export type ImplementedQNEvent = DocWithFragments<Required<GetNotificationEventsQuery['events'][0]>>
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
