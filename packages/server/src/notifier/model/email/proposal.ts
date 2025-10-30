import { match } from 'ts-pattern'

import { PIONEER_URL } from '@/common/config'
import { renderPioneerEmail } from '@/common/email-templates/pioneer-email'

import { EmailFromNotificationFn } from './utils'
import { getProposalPost } from './utils/proposal'

export const fromProposalPostCreatedNotification: EmailFromNotificationFn = async ({ id, kind, entityId, member }) => {
  if (
    kind !== 'PROPOSAL_DISCUSSION_MENTION' &&
    kind !== 'PROPOSAL_DISCUSSION_REPLY' &&
    kind !== 'PROPOSAL_DISCUSSION_CREATOR' &&
    kind !== 'PROPOSAL_DISCUSSION_CONTRIBUTOR' &&
    kind !== 'PROPOSAL_DISCUSSION_ALL' &&
    kind !== 'PROPOSAL_ENTITY_DISCUSSION'
  ) {
    return
  }

  if (!entityId) {
    throw Error(`Missing proposal discussion post id in notification ${kind}, with id: ${id}`)
  }

  const { author, proposal, proposalId } = await getProposalPost(entityId)

  const emailSubject = `[Pioneer] proposal: ${proposal}`

  const emailSummary: string = match(kind)
    .with('PROPOSAL_DISCUSSION_MENTION', () => `${author} mentioned you regarding the proposal ${proposal}.`)
    .with('PROPOSAL_DISCUSSION_REPLY', () => `${author} replied to your post regarding the proposal ${proposal}.`)
    .with(
      'PROPOSAL_DISCUSSION_CREATOR',
      'PROPOSAL_DISCUSSION_CONTRIBUTOR',
      'PROPOSAL_DISCUSSION_ALL',
      'PROPOSAL_ENTITY_DISCUSSION',
      () => `${author} posted regarding the proposal ${proposal}.`
    )
    .exhaustive()

  const emailText: string = match(kind)
    .with('PROPOSAL_DISCUSSION_MENTION', () => `${author} mentioned you regarding the proposal ${proposal}.`)
    .with('PROPOSAL_DISCUSSION_REPLY', () => `${author} replied to your post regarding the proposal ${proposal}.`)
    .with(
      'PROPOSAL_DISCUSSION_CREATOR',
      'PROPOSAL_DISCUSSION_CONTRIBUTOR',
      'PROPOSAL_DISCUSSION_ALL',
      'PROPOSAL_ENTITY_DISCUSSION',
      () => `${author} posted regarding the proposal ${proposal}.`
    )
    .exhaustive()

  const emailHtml = renderPioneerEmail({
    memberHandle: member.name,
    summary: emailSummary,
    text: emailText,
    button: {
      label: 'See on Pioneer',
      href: `${PIONEER_URL}/#/proposals/preview/${proposalId}?post=${entityId}`,
    },
  })

  return {
    subject: emailSubject,
    html: emailHtml,
    to: member.email,
  }
}
