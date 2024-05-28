import { pick } from 'lodash'
import { verbose, error } from 'npmlog'

import { Email, EmailProvider } from '@/common/utils/email'

import {
  fromElectionAnnouncingStartedNotification,
  fromElectionRevealingStartedNotification,
  fromElectionVotingStartedNotification,
} from './election'
import { fromPostAddedNotification, fromThreadCreatedNotification } from './forum'
import { fromProposalPostCreatedNotification } from './proposal'
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

    const emailHandlers = [
      fromPostAddedNotification,
      fromThreadCreatedNotification,
      fromProposalPostCreatedNotification,
      fromElectionAnnouncingStartedNotification,
      fromElectionVotingStartedNotification,
      fromElectionRevealingStartedNotification,
    ]
    const emailPromises = emailHandlers.map((handler) => handler(notification))
    const emailResults = await Promise.all(emailPromises)

    let email: Email | undefined
    for (const result of emailResults) {
      if (result) {
        if (email) {
          error('Email notification', 'Multiple emails generated for notification', notification)
        } else {
          email = result
        }
      }
    }

    if (!email) throw Error(`No email template found for notification ${notification.kind}`)

    await emailProvider.sendEmail(email)
  }
