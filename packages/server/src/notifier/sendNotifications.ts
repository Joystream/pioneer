import { pick } from 'lodash'
import { error, info } from 'npmlog'

import { prisma } from '@/common/prisma'
import { configEmailProvider } from '@/common/utils/email'

import { notifyByEmail } from './model/email'

export const sendNotifications = async (): Promise<any[]> => {
  const notifications = await prisma.notification.findMany({ where: { isSent: false }, include: { member: true } })
  const sendEmail = notifyByEmail(configEmailProvider())

  info('Email notifications', 'Attempt to email', notifications.length, 'notifications')

  return Promise.all(
    notifications.map(async (notification) => {
      try {
        await sendEmail(notification)
        return await prisma.notification.update({ where: pick(notification, 'id'), data: { isSent: true } })
      } catch (errData) {
        error(
          'Email notification failure',
          `Failed to email ${notification.id} with error:`,
          (errData as Error).message ?? 'Unknown error!'
        )
      }
      // TODO: update a fail counter instead so it can be retried N time later
      await prisma.notification.update({ where: pick(notification, 'id'), data: { isSent: true } })
    })
  )
}
