import { pick } from 'lodash'

import { prisma } from '@/common/prisma'
import { configEmailProvider } from '@/common/utils/email'

import { notifyByEmail } from './model/email'

export const sendNotifications = async (): Promise<any[]> => {
  const notifications = await prisma.notification.findMany({ where: { isSent: false }, include: { member: true } })
  const sendEmail = notifyByEmail(configEmailProvider())

  return Promise.all(
    notifications.map(async (notification) => {
      try {
        await sendEmail(notification)
        return await prisma.notification.update({ where: pick(notification, 'id'), data: { isSent: true } })
      } catch (error) {
        process.stderr.write((error as Error).message ?? 'Unknown error!')
      }
      // TODO: update a fail counter instead so it can be retried N time later
      await prisma.notification.update({ where: pick(notification, 'id'), data: { isSent: true } })
    })
  )
}
