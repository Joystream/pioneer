import { enumType } from 'nexus'
import { NotificationType } from 'nexus-prisma'

export * from './auth'
export * from './member'
export * from './notification'
export * from './subscription'

export const NotificationTypeEnum = enumType(NotificationType)
