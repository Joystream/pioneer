import { enumType } from 'nexus'
import { NotificationKind } from 'nexus-prisma'

export * from './entitiySubscription'
export * from './generalSubscription'
export * from './notification'

export const NotificationKindEnum = enumType(NotificationKind)