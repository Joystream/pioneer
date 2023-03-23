import { Email } from '@/common/utils/email'

import { fromPostAddedNotification, fromThreadCreatedNotification } from './forum'
import { Notification, hasEmailAddress } from './utils'

export const notifyByEmail =
  (send: (email: Email) => Promise<void>) =>
  async (notification: Notification): Promise<void> => {
    if (!hasEmailAddress(notification)) throw Error(`No email address defined for member ${notification.memberId}`)

    // The functions should be chained here eg.
    // fromPostAddedNotification(notification) ?? fromProposalPostCreated(notification) ?? ...
    const email = await (fromPostAddedNotification(notification) ?? fromThreadCreatedNotification(notification))

    if (!email) throw Error(`No email template found for notification ${notification.kind}`)

    await send(email)
  }
