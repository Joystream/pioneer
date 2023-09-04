import { pick } from 'lodash'
import { error, info, warn } from 'npmlog'

import { prisma } from '@/common/prisma'
import { EmailProvider, createEmailProvider, errorMessage } from '@/common/utils'

import { createEmailNotifier } from './model/email'

export const sendNotifications = async (): Promise<any[]> => {
  let emailProvider: EmailProvider
  try {
    emailProvider = createEmailProvider()
  } catch (err) {
    warn('Email notifications', 'Failed to configure email provider with error:', errorMessage(err))
    return []
  }

  const notifications = await prisma.notification.findMany({ where: { isSent: false }, include: { member: true } })
  const notifyViaEmail = createEmailNotifier(emailProvider)

  info('Email notifications', 'Attempt to email', notifications.length, 'notifications')

  return Promise.all(
    notifications.map(async (notification) => {
      try {
        await notifyViaEmail(notification)
        return await prisma.notification.update({ where: pick(notification, 'id'), data: { isSent: true } })
      } catch (errData) {
        error('Email notification failure', `Failed to email ${notification.id} with error:`, errorMessage(errData))
      }
      // TODO: update a fail counter instead so it can be retried N time later
      await prisma.notification.update({ where: pick(notification, 'id'), data: { isSent: true } })
    })
  )
}
