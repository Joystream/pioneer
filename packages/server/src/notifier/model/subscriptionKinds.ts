import { NotificationKind } from '@prisma/client'
import { pick } from 'lodash'

const extract = <T extends NotificationKind>(...keys: T[]): Pick<typeof NotificationKind, T> =>
  pick(NotificationKind, ...keys)

export type EntitySubscriptionKind = (typeof EntitySubscriptionKind)[keyof typeof EntitySubscriptionKind]
export const EntitySubscriptionKind = extract(
  'FORUM_THREAD_ENTITY_POST',
  'FORUM_CATEGORY_ENTITY_POST',
  'FORUM_CATEGORY_ENTITY_THREAD',
  // 'FORUM_WATCHED_CATEGORY_SUBCATEGORY',

  // 'PROPOSAL_ENTITY_STATUS',
  // 'PROPOSAL_ENTITY_VOTE',
  'PROPOSAL_ENTITY_DISCUSSION'
)

export type GeneralSubscriptionKind = (typeof GeneralSubscriptionKind)[keyof typeof GeneralSubscriptionKind]
export const GeneralSubscriptionKind = extract(
  'FORUM_POST_ALL',
  'FORUM_POST_MENTION',
  'FORUM_POST_REPLY',
  'FORUM_THREAD_CREATOR',
  'FORUM_THREAD_CONTRIBUTOR',

  'FORUM_THREAD_ALL',
  'FORUM_THREAD_MENTION',

  // 'PROPOSAL_CREATED_ALL',
  // 'PROPOSAL_STATUS_ALL',
  // 'PROPOSAL_STATUS_CREATOR',
  // 'PROPOSAL_VOTE_ALL',
  // 'PROPOSAL_VOTE_CREATOR',
  'PROPOSAL_DISCUSSION_MENTION',
  'PROPOSAL_DISCUSSION_REPLY',
  'PROPOSAL_DISCUSSION_CREATOR',
  'PROPOSAL_DISCUSSION_CONTRIBUTOR',
  'PROPOSAL_DISCUSSION_ALL',

  'ELECTION_ANNOUNCING_STARTED',
  'ELECTION_VOTING_STARTED',
  'ELECTION_REVEALING_STARTED'
)

export const isDefaultSubscription = (type: GeneralSubscriptionKind): boolean => defaultSubscriptions.includes(type)

const defaultSubscriptions: GeneralSubscriptionKind[] = [
  'FORUM_POST_MENTION',
  'FORUM_POST_REPLY',
  'FORUM_THREAD_CREATOR',
  'FORUM_THREAD_CONTRIBUTOR',
  'FORUM_THREAD_MENTION',

  // 'PROPOSAL_STATUS_CREATOR',
  // 'PROPOSAL_VOTE_CREATOR',
  'PROPOSAL_DISCUSSION_MENTION',
  'PROPOSAL_DISCUSSION_REPLY',
  'PROPOSAL_DISCUSSION_CREATOR',
  'PROPOSAL_DISCUSSION_CONTRIBUTOR',

  'ELECTION_ANNOUNCING_STARTED',
  'ELECTION_VOTING_STARTED',
  'ELECTION_REVEALING_STARTED',
]
