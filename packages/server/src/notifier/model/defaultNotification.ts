import { GeneralSubscriptionKind } from './subscriptionKinds'

export const isDefaultNotification = (type: GeneralSubscriptionKind): boolean => defaultNotifications.includes(type)

const defaultNotifications: GeneralSubscriptionKind[] = [
  'FORUM_THREAD_MENTION',
  'FORUM_POST_MENTION',
  'FORUM_POST_REPLY',
  'FORUM_THREAD_CREATOR',
  'FORUM_THREAD_CONTIBUTOR',
  'PROPOSAL_STATUS_CREATOR',
  'PROPOSAL_VOTE_CREATOR',
  'PROPOSAL_DISCUSSION_MENTION',
  'PROPOSAL_DISCUSSION_CREATOR',
  'PROPOSAL_DISCUSSION_CONTRIBUTOR',
  'ELECTION_ANNOUNCING_STARTED',
  'ELECTION_VOTING_STARTED',
  'ELECTION_REVEALING_STARTED',
  'ELECTION_COUNCIL_ELECTED',
]
