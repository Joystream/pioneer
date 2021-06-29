import { asMember, Member } from '@/memberships/types'
import { typenameToProposalDetails } from '@/proposals/model/proposalDetails'
import { isProposalActive, typenameToProposalStatus } from '@/proposals/model/proposalStatus'
import { ProposalFieldsFragment } from '@/proposals/queries'

export type ProposalStatus =
  | 'deciding'
  | 'gracing'
  | 'dormant'
  | 'vetoed'
  | 'executed'
  | 'executionFailed'
  | 'slashed'
  | 'rejected'
  | 'expired'
  | 'cancelled'
  | 'canceledByRuntime'

export type ProposalDetails =
  | 'signal'
  | 'runtimeUpgrade'
  | 'fundingRequest'
  | 'setMaxValidatorCount'
  | 'createWorkingGroupLeadOpening'
  | 'fillWorkingGroupLeadOpening'
  | 'updateWorkingGroupBudget'
  | 'decreaseWorkingGroupLeadStake'
  | 'slashWorkingGroupLead'
  | 'setWorkingGroupLeadReward'
  | 'terminateWorkingGroupLead'
  | 'amendConstitution'
  | 'cancelWorkingGroupLeadOpening'
  | 'setMembershipPrice'
  | 'setCouncilBudgetIncrement'
  | 'setCouncilorReward'
  | 'setInitialInvitationBalance'
  | 'setInitialInvitationCount'
  | 'setMembershipLeadInvitationQuota'
  | 'setReferralCut'
  | 'createBlogPost'
  | 'editBlogPost'
  | 'lockBlogPost'
  | 'unlockBlogPost'
  | 'veto'

export interface Proposal {
  id: string
  title: string
  status: ProposalStatus
  details: ProposalDetails
  proposer: Member
  createdAt: string
  endedAt?: string
}

export const asProposal = (fields: ProposalFieldsFragment): Proposal => {
  const proposal: Proposal = {
    id: fields.id,
    title: fields.title,
    status: typenameToProposalStatus(fields.status.__typename),
    details: typenameToProposalDetails(fields.details.__typename),
    proposer: asMember(fields.creator),
    createdAt: fields.createdAt,
  }

  if (!isProposalActive(proposal.status)) {
    proposal.endedAt = fields.statusSetAtTime
  }

  return proposal
}
