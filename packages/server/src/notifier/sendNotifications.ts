// import { pick } from 'lodash'
import { error, info, warn } from 'npmlog'

import { prisma } from '@/common/prisma'
import { configEmailProvider, errorMessage, NO_EMAIL_PROVIDER } from '@/common/utils'

import { notifyByEmail } from './model/email'
enum EmailStatus {
  SENT = 'sent',
  FAILED_TO_SEND = 'failed_to_send',
  PENDING_RETRY = 'pending_retry',
}

const MAX_RETRY_COUNT = 3

export const sendNotifications = async (): Promise<any[]> => {
  if (NO_EMAIL_PROVIDER) {
    warn('Abort email notifications', 'No email provider was defined')
    return []
  }

  const notifications = await prisma.notification.findMany({
    where: { emailStatus: EmailStatus.PENDING_RETRY },
    include: { member: true },
  })
  const sendEmail = notifyByEmail(configEmailProvider())

  info('Email notifications', 'Attempt to email', notifications.length, 'notifications')

  return Promise.all(
    notifications.map(async (notification) => {
      const { id, retryCount } = notification
      try {
        await sendEmail(notification)
        await prisma.notification.update({
          where: { id },
          data: { emailStatus: EmailStatus.SENT, isSent: true, retryCount: 0 },
        })
        return
      } catch (errData) {
        error('Email notification failure', `Failed to email ${id} with error:`, errorMessage(errData))
        if (retryCount < MAX_RETRY_COUNT) {
          await prisma.notification.update({
            where: { id },
            data: { emailStatus: EmailStatus.PENDING_RETRY, retryCount: retryCount + 1 },
          })
          return
        }
        await prisma.notification.update({
          where: { id },
          data: { emailStatus: EmailStatus.FAILED_TO_SEND, retryCount: 0 },
        })
      }
    })
  )
}
