import { NotificationKind } from '@prisma/client'

import { createEmailProvider } from '@/common/utils'

import { createEmailNotifier } from '../model/email'

const sendEmail = async () => {
  const emailAddress = process.argv[2]
  if (!emailAddress) {
    process.stderr.write('Usage: mockEmail email [notificationKind]')
    return
  }
  const emailProvider = createEmailProvider()
  const emailKind = (process.argv[3] as NotificationKind) || 'FORUM_POST_MENTION'

  const commonNotificationFields = {
    id: 1,
    entityId: '1',
    eventId: '1',
    member: {
      id: 1,
      name: 'test',
      email: emailAddress,
      unverifiedEmail: null,
      receiveEmails: true,
    },
    memberId: 1,
    isRead: false,
    retryCount: 0,
    emailStatus: 'PENDING' as const,
  }

  const notification = {
    ...commonNotificationFields,
    kind: emailKind,
  }
  const notifyViaEmail = createEmailNotifier(emailProvider)
  await notifyViaEmail(notification)
}

sendEmail()
