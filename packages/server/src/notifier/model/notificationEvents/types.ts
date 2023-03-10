import { GetNotificationEventsQuery } from '@/common/queries'
import { DocWithFragments } from '@/common/utils/types'
import { EntitySubscriptionType, GeneralSubscriptionType } from '@/notifier/model/subscriptionTypes'

export type ImplementedQNEvent = DocWithFragments<Required<GetNotificationEventsQuery['events'][0]>>
export type QNEvent<T extends ImplementedQNEvent['__typename']> = { __typename: T } & ImplementedQNEvent

type GeneralEventParams = {
  notificationType: GeneralSubscriptionType
  relatedMembers: 'ANY' | { ids: number[] }
  isDefault: boolean
}
type EntityEventParams = { notificationType: EntitySubscriptionType; relatedEntityId: string }
export type GeneralPotentialNotif = { priority: number } & GeneralEventParams
export type EntitiyPotentialNotif = { priority: number } & EntityEventParams

export type PotentialNotif = GeneralPotentialNotif | EntitiyPotentialNotif

export type PartialNotif = Omit<GeneralPotentialNotif, 'priority'> | Omit<EntitiyPotentialNotif, 'priority'>

export interface NotificationEvent {
  id: string
  inBlock: number
  entityId: string
  potentialNotifications: PotentialNotif[]
}
