import { Prisma } from '@prisma/client'

import { Email } from '@/common/utils/email'

export type Notification = Prisma.NotificationGetPayload<{ include: { member: true } }>
type NotificationWithEmailAddress = Notification & { member: { email: string } }

export type EmailFromNotificationFn = (notification: NotificationWithEmailAddress) => Promise<Email | void>

export const hasEmailAddress = (notification: Notification): notification is NotificationWithEmailAddress =>
  !!notification.member.email
