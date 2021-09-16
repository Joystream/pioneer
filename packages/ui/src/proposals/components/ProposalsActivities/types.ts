import { BaseActivity, MemberDisplayFields } from '@/common/types'
import {
  ProposalCreatedEventFieldsFragment,
  ProposalStatusUpdatedEventFieldsFragment,
} from '@/proposals/queries/__generated__/proposalsEvents.generated'

export type ProposalActivity = ProposalCreatedActivity | ProposalStatusUpdatedActivity

export type ProposalEventFieldsFragment = ProposalCreatedEventFieldsFragment | ProposalStatusUpdatedEventFieldsFragment

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
