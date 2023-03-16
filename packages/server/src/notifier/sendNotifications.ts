import { prisma } from '@/common/prisma'

import { notifyByEmail } from './model/email'

export const sendNotifications = async () => {
  const notifications = await prisma.notification.findMany({ where: { isSent: false }, include: { member: true } })

  const sendEmail = notifyByEmail()
  return Promise.all(
    notifications.map(async (notification) => {
      const { id, isSent } = await sendEmail(notification)
      if (isSent) {
        await prisma.notification.update({ where: { id }, data: { isSent: true } })
      } else {
        // TODO: update a fail counter instead so it can be retried N time later
        await prisma.notification.update({ where: { id }, data: { isSent: true } })
      }
    })
  )
}
