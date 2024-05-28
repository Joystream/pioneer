import { PIONEER_URL } from '@/common/config'
import { renderPioneerEmail } from '@/common/email-templates/pioneer-email'

import { EmailFromNotificationFn } from './utils'

export const fromElectionAnnouncingStartedNotification: EmailFromNotificationFn = async ({ kind, member }) => {
  if (kind !== 'ELECTION_ANNOUNCING_STARTED') {
    return
  }

  return {
    subject: '[Pioneer] New election started',
    html: renderPioneerEmail({
      memberHandle: member.name,
      summary: 'New election started.',
      text: 'New election announcing period has just started. Follow the link below to announce your candidacy.',
      button: {
        label: 'See on Pioneer',
        href: `${PIONEER_URL}/#/election`,
      },
    }),
    to: member.email,
  }
}

export const fromElectionVotingStartedNotification: EmailFromNotificationFn = async ({ kind, member }) => {
  if (kind !== 'ELECTION_VOTING_STARTED') {
    return
  }

  return {
    subject: '[Pioneer] Election voting started',
    html: renderPioneerEmail({
      memberHandle: member.name,
      summary: 'Election voting started.',
      text: 'Election voting period has just started. Follow the link below to cast your votes.',
      button: {
        label: 'See on Pioneer',
        href: `${PIONEER_URL}/#/election`,
      },
    }),
    to: member.email,
  }
}

export const fromElectionRevealingStartedNotification: EmailFromNotificationFn = async ({ kind, member }) => {
  if (kind !== 'ELECTION_REVEALING_STARTED') {
    return
  }

  return {
    subject: '[Pioneer] Election revealing period started',
    html: renderPioneerEmail({
      memberHandle: member.name,
      summary: 'Election revealing started.',
      text: 'Election revealing period has just started. Follow the link below to reveal your votes.',
      button: {
        label: 'See on Pioneer',
        href: `${PIONEER_URL}/#/election`,
      },
    }),
    to: member.email,
  }
}
