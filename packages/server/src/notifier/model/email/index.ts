import { pick } from 'lodash'
import { verbose } from 'npmlog'

import { EmailProvider } from '@/common/utils/email'

import { fromPostAddedNotification, fromThreadCreatedNotification } from './forum'
import { Notification, hasEmailAddress } from './utils'

export const createEmailNotifier =
  (emailProvider: EmailProvider) =>
  async (notification: Notification): Promise<void> => {
    if (!hasEmailAddress(notification)) throw Error(`No email address defined for member ${notification.memberId}`)

    verbose(
      'Email notification',
      `Attempt to email member ${notification.memberId} at ${notification.member.email} about notification:`,
      pick(notification, 'id', 'eventId', 'kind', 'entityId')
    )

    // The functions should be chained here eg.
    // fromPostAddedNotification(notification) ?? fromProposalPostCreated(notification) ?? ...
    const email = await (fromPostAddedNotification(notification) ?? fromThreadCreatedNotification(notification))

    if (!email) throw Error(`No email template found for notification ${notification.kind}`)

    await emailProvider.sendEmail(email)
  }
