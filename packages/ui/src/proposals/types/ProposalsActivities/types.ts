import { BaseActivity, MemberDisplayFields } from '@/common/types'
import {
  ProposalCancelledEventFieldsFragment,
  ProposalCreatedEventFieldsFragment,
  ProposalDecisionMadeEventFieldsFragment,
  ProposalDiscussionModeChangedEventFieldsFragment,
  ProposalDiscussionPostCreatedEventFieldsFragment,
  ProposalDiscussionPostDeletedEventFieldsFragment,
  ProposalDiscussionPostUpdatedEventFieldsFragment,
  ProposalExecutedEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
  ProposalVotedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

export type ProposalActivity =
  | ProposalCreatedActivity
  | ProposalStatusUpdatedActivity
  | ProposalDecisionMadeActivity
  | ProposalCancelledActivity
  | ProposalDiscussionModeChangedActivity
  | ProposalExecutedActivity
  | ProposalVotedActivity
  | ProposalDiscussionPostDeletedActivity
  | ProposalDiscussionPostEditedActivity
  | ProposalDiscussionPostCreatedActivity

export type ProposalEventFieldsFragment =
  | ProposalCreatedEventFieldsFragment
  | ProposalStatusUpdatedEventFieldsFragment
  | ProposalDecisionMadeEventFieldsFragment
  | ProposalDiscussionModeChangedEventFieldsFragment
  | ProposalCancelledEventFieldsFragment
  | ProposalExecutedEventFieldsFragment
  | ProposalVotedEventFieldsFragment
  | ProposalDiscussionPostCreatedEventFieldsFragment
  | ProposalDiscussionPostDeletedEventFieldsFragment
  | ProposalDiscussionPostUpdatedEventFieldsFragment

interface ProposalObjectActivity extends BaseActivity {
  proposal: {
    id: string
    title: string
  }
}

export interface ProposalCreatedActivity extends ProposalObjectActivity {
  eventType: 'ProposalCreatedEvent'
  creator: MemberDisplayFields
}

export interface ProposalStatusUpdatedActivity extends ProposalObjectActivity {
  eventType: 'ProposalStatusUpdatedEvent'
  newStatus: string
}

export interface ProposalDecisionMadeActivity extends ProposalObjectActivity {
  eventType: 'ProposalDecisionMadeEvent'
}

export interface ProposalCancelledActivity extends ProposalObjectActivity {
  eventType: 'ProposalCancelledEvent'
  creator: MemberDisplayFields
}

export interface ProposalDiscussionModeChangedActivity extends ProposalObjectActivity {
  eventType: 'ProposalDiscussionThreadModeChangedEvent'
  newMode: 'closed' | 'open'
}

export interface ProposalExecutedActivity extends ProposalObjectActivity {
  eventType: 'ProposalExecutedEvent'
  executedSuccessfully: boolean
}

export interface ProposalVotedActivity extends ProposalObjectActivity {
  eventType: 'ProposalVotedEvent'
  voter: MemberDisplayFields
}

interface ProposalDiscussionPostActivity extends ProposalObjectActivity {
  postId: string
  author: MemberDisplayFields
}

export interface ProposalDiscussionPostDeletedActivity extends ProposalDiscussionPostActivity {
  eventType: 'ProposalDiscussionPostDeletedEvent'
}

export interface ProposalDiscussionPostCreatedActivity extends ProposalDiscussionPostActivity {
  eventType: 'ProposalDiscussionPostCreatedEvent'
}

export interface ProposalDiscussionPostEditedActivity extends ProposalDiscussionPostActivity {
  eventType: 'ProposalDiscussionPostUpdatedEvent'
}
