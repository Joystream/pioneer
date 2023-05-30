import { Prisma } from '@prisma/client'

import { Email, EmailBody } from '@/common/utils/email'

export type Notification = Prisma.NotificationGetPayload<{ include: { member: true } }>
type NotificationWithEmailAddress = Notification & { member: { email: string } }

type PartialEmail = Pick<Email, 'subject'> & EmailBody
export type EmailFromNotification = (notification: NotificationWithEmailAddress) => Promise<Email> | undefined

export const buildEmail =
  <T>(to: string, getData: () => Promise<T>) =>
  async (fromData: (data: T) => PartialEmail): Promise<Email> => ({ ...fromData(await getData()), to })

export const hasEmailAddress = (notification: Notification): notification is NotificationWithEmailAddress =>
  !!notification.member.email
