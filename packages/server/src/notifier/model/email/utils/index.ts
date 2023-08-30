import { Prisma } from '@prisma/client'

import { Email, EmailWithoutRecipient } from '@/common/utils/email'

export type Notification = Prisma.NotificationGetPayload<{ include: { member: true } }>
type NotificationWithEmailAddress = Notification & { member: { email: string } }

export type EmailFromNotification = (notification: NotificationWithEmailAddress) => Promise<Email> | undefined

export const buildEmail =
  <T>(to: string, getData: () => Promise<T>) =>
  async (fromData: (data: T) => EmailWithoutRecipient): Promise<Email> => ({ ...fromData(await getData()), to })

export const hasEmailAddress = (notification: Notification): notification is NotificationWithEmailAddress =>
  !!notification.member.email
