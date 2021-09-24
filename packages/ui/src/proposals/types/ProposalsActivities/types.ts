import { BaseActivity, MemberDisplayFields } from '@/common/types'
import {
  ProposalCancelledEventFieldsFragment,
  ProposalCreatedEventFieldsFragment,
  ProposalDecisionMadeEventFieldsFragment,
  ProposalDiscussionModeChangedEventFieldsFragment,
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

export type ProposalEventFieldsFragment =
  | ProposalCreatedEventFieldsFragment
  | ProposalStatusUpdatedEventFieldsFragment
  | ProposalDecisionMadeEventFieldsFragment
  | ProposalDiscussionModeChangedEventFieldsFragment
  | ProposalCancelledEventFieldsFragment
  | ProposalExecutedEventFieldsFragment
  | ProposalVotedEventFieldsFragment

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
