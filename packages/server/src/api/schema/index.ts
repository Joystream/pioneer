import { enumType } from 'nexus'
import { NotificationType } from 'nexus-prisma'

export * from './auth'
export * from './entitiySubscription'
export * from './generalSubscription'
export * from './member'
export * from './notification'

export const NotificationTypeEnum = enumType(NotificationType)
