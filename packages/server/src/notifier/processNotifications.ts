import { Member, Notification } from '@prisma/client'
import { error, info, warn } from 'npmlog'

import { EMAIL_MAX_RETRY_COUNT } from '@/common/config'
import { prisma } from '@/common/prisma'
import { createEmailProvider, EmailProvider, errorMessage } from '@/common/utils'

import { createEmailNotifier } from './model/email'

export const processNotifications = async (): Promise<void> => {
  const notifications = await prisma.notification.findMany({
    where: { emailStatus: 'PENDING' },
    include: { member: true },
  })
  await sendNotifications(notifications, createEmailProvider())
}

type NotificationWithMember = Notification & { member: Member }

const sendNotifications = async (
  notifications: NotificationWithMember[],
  emailProvider: EmailProvider
): Promise<void> => {
  const notifyViaEmail = createEmailNotifier(emailProvider)
  info('Email notifications', 'Attempt to email', notifications.length, 'notifications')

  await Promise.all(
    notifications.map(async (notification) => {
      const { id, retryCount } = notification

      try {
        await notifyViaEmail(notification)
        return await prisma.notification.update({ where: { id }, data: { emailStatus: 'SENT' } })
      } catch (errData) {
        if (retryCount >= EMAIL_MAX_RETRY_COUNT) {
          error(
            'Email notification failure',
            `Failed to email ${notification.id} with ${EMAIL_MAX_RETRY_COUNT} retries. Error:`,
            errorMessage(errData)
          )
          return await prisma.notification.update({ where: { id }, data: { emailStatus: 'FAILED' } })
        } else {
          warn(
            'Email notification failure',
            `Failed to email ${notification.id}. Will retry. Error:`,
            errorMessage(errData)
          )
          return await prisma.notification.update({ where: { id }, data: { retryCount: retryCount + 1 } })
        }
      }
    })
  )
}
