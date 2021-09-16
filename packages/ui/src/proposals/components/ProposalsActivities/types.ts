import { BaseActivity, MemberDisplayFields } from '@/common/types'

export type ProposalActivity = ProposalCreatedActivity

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
