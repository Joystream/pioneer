import { enumType } from 'nexus'
import { NotificationKind } from 'nexus-prisma'

export * from './auth'
export * from './entitiySubscription'
export * from './generalSubscription'
export * from './member'
export * from './notification'

export const NotificationKindEnum = enumType(NotificationKind)
