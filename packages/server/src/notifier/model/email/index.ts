import { Prisma } from '@prisma/client'

import { Email, configEmailProvider } from '@/common/utils/email'

import { emailFromForumPostNotification } from './forum'

type Notification = Prisma.NotificationGetPayload<{ include: { member: true } }>
type NotificationWithEmailAddress = Notification & { member: { email: string } }

interface EmailResult {
  id: number
  isSent: boolean
}
export const notifyByEmail = (): ((notification: Notification) => Promise<EmailResult>) => {
  const send = configEmailProvider()

  return async (notification) => {
    try {
      const email = await createEmail(notification)
      if (email) {
        await send(email)
        return { id: notification.id, isSent: true }
      }
    } catch (error) {
      process.stderr.write((error as Error).message ?? 'Unknown error!')
    }

    return { id: notification.id, isSent: false }
  }
}

type ToEmail = (subject: string, body: { text: string } | { html: string }) => Email
export type BuildEmail = (notification: NotificationWithEmailAddress, toEmail: ToEmail) => Promise<Email>

const createEmail = async (notification: Notification): Promise<Email | undefined> => {
  if (hasEmailAddress(notification)) {
    const to = notification.member.email
    const toEmail: ToEmail = (subject, body) => ({ ...body, to, subject })

    switch (notification.notificationType) {
      case 'FORUM_THREAD_CONTIBUTOR':
      case 'FORUM_THREAD_CREATOR':
      case 'FORUM_POST_MENTION':
      case 'FORUM_POST_REPLY':
      case 'FORUM_WATCHED_THREAD':
      case 'FORUM_POST_ALL':
        return emailFromForumPostNotification(notification, toEmail)
    }
  }
}

const hasEmailAddress = (notification: Notification): notification is NotificationWithEmailAddress =>
  !!notification.member.email
