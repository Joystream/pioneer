import { BaseActivity, MemberDisplayFields } from '@/common/types'
import {
  ProposalCreatedEventFieldsFragment,
  ProposalDecisionMadeEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

export type ProposalActivity = ProposalCreatedActivity | ProposalStatusUpdatedActivity | ProposalDecisionMadeActivity

export type ProposalEventFieldsFragment =
  | ProposalCreatedEventFieldsFragment
  | ProposalStatusUpdatedEventFieldsFragment
  | ProposalDecisionMadeEventFieldsFragment

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
