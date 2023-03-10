import { NotificationType } from '@prisma/client'
import { pick } from 'lodash'

const extract = <T extends NotificationType>(...keys: T[]): Pick<typeof NotificationType, T> =>
  pick(NotificationType, ...keys)

export type EntitySubscriptionType = (typeof EntitySubscriptionType)[keyof typeof EntitySubscriptionType]
export const EntitySubscriptionType = extract(
  'FORUM_WATCHED_CATEGORY_POST',
  'FORUM_WATCHED_CATEGORY_THREAD',
  'FORUM_WATCHED_CATEGORY_SUBCATEGORY',
  'FORUM_WATCHED_THREAD',

  'PROPOSAL_WATCHED_STATUS',
  'PROPOSAL_WATCHED_VOTE',
  'PROPOSAL_WATCHED_DISCUSSION'
)

export type GeneralSubscriptionType = (typeof GeneralSubscriptionType)[keyof typeof GeneralSubscriptionType]
export const GeneralSubscriptionType = extract(
  'FORUM_THREAD_ALL',
  'FORUM_THREAD_MENTION',

  'FORUM_POST_ALL',
  'FORUM_POST_MENTION',
  'FORUM_POST_REPLY',
  'FORUM_THREAD_CREATOR',
  'FORUM_THREAD_CONTIBUTOR',

  'PROPOSAL_CREATED_ALL',
  'PROPOSAL_STATUS_ALL',
  'PROPOSAL_STATUS_CREATOR',
  'PROPOSAL_VOTE_ALL',
  'PROPOSAL_VOTE_CREATOR',
  'PROPOSAL_DISCUSSION_MENTION',
  'PROPOSAL_DISCUSSION_CREATOR',
  'PROPOSAL_DISCUSSION_CONTRIBUTOR',

  'ELECTION_ANNOUNCING_STARTED',
  'ELECTION_VOTING_STARTED',
  'ELECTION_REVEALING_STARTED',
  'ELECTION_COUNCIL_ELECTED'
)
