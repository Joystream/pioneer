import { Prisma } from '@prisma/client'

import { EntitySubscriptionKind, GeneralSubscriptionKind } from './model/subscriptionKinds'

export type ProgressDocument = {
  block: number
  eventIds: string[]
}

export type NotificationEvent = {
  id: string
  inBlock: number
  entityId: string
  potentialNotifications: PotentialNotif[]
}

export type GeneralPotentialNotif = {
  kind: GeneralSubscriptionKind
  relatedMembers: 'ANY' | { ids: number[] }
  isDefault: boolean
  priority: number
}
export type EntityPotentialNotif = {
  kind: EntitySubscriptionKind
  relatedEntityId: string
  priority: number
}
export type PotentialNotif = GeneralPotentialNotif | EntityPotentialNotif

export type Notification = Prisma.NotificationCreateManyInput
