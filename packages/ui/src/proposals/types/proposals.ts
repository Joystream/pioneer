import { ProposalDetails } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import { asMember, Member } from '@/memberships/types'
import { typenameToProposalDetails } from '@/proposals/model/proposalDetails'
import { isProposalActive, typenameToProposalStatus } from '@/proposals/model/proposalStatus'
import {
  GetLatestProposalByMemberIdQuery,
  ProposalDiscussionPostMentionFieldsFragment,
  ProposalFieldsFragment,
  ProposalMentionFieldsFragment,
  VoteWithDetailsFieldsFragment,
} from '@/proposals/queries'
import { asProposalVote, ProposalVote } from '@/proposals/types/ProposalWithDetails'

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

type CurrentProposalStatus = Extract<ProposalStatus, 'deciding' | 'gracing' | 'dormant'>
const currentProposalStatusArray: CurrentProposalStatus[] = ['deciding', 'dormant', 'gracing']

export const isActiveProposalStatus = (status: ProposalStatus): status is CurrentProposalStatus =>
  currentProposalStatusArray.includes(status as CurrentProposalStatus)

type ProposalDetailType<T> = T extends `${infer U}ProposalDetails` ? Uncapitalize<U> : never
export type ProposalType =
  | ProposalDetailType<ProposalDetails['__typename']> &
      (
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
        | 'updateChannelPayouts'
      )

export type DisabledProposal = 'createBlogPost' | 'editBlogPost' | 'lockBlogPost' | 'unlockBlogPost'

export interface Proposal {
  id: string
  title: string
  status: ProposalStatus
  type: ProposalType
  proposer: Member
  createdAt: string
  endedAt?: string
  councilApprovals: number
  exactExecutionBlock?: number
}

export const asProposal = (fields: ProposalFieldsFragment): Proposal => {
  const proposal: Proposal = {
    id: fields.id,
    title: fields.title,
    status: typenameToProposalStatus(fields.status.__typename),
    type: typenameToProposalDetails(fields.details.__typename),
    proposer: asMember(fields.creator),
    createdAt: fields.createdAt,
    councilApprovals: fields.councilApprovals,
    exactExecutionBlock: fields.exactExecutionBlock ?? undefined,
  }

  if (!isProposalActive(proposal.status)) {
    proposal.endedAt = fields.statusSetAtTime
  }

  return proposal
}

export interface ProposalVoteWithDetails extends ProposalVote {
  block: Block
  rationale: string
  proposalId: string
}

export const asVoteWithDetails = (voteFields: VoteWithDetailsFieldsFragment): ProposalVoteWithDetails => ({
  ...asProposalVote(voteFields),
  rationale: voteFields.rationale,
  block: asBlock({
    createdAt: voteFields.createdAt,
    inBlock: voteFields.inBlock,
    network: voteFields.network,
  }),
  proposalId: voteFields.proposalId,
})

export type ProposalMention = Pick<Proposal, 'id' | 'title' | 'status' | 'type'> & {
  description: string
  exactExecutionBlock?: number
  statusSetAtBlock: Block
}

export const asProposalMention = (fields: ProposalMentionFieldsFragment): ProposalMention => ({
  id: fields.id,
  title: fields.title,
  status: typenameToProposalStatus(fields.status.__typename),
  type: typenameToProposalDetails(fields.details.__typename),
  description: fields.description,
  statusSetAtBlock: asBlock({
    inBlock: fields.statusSetAtBlock,
    createdAt: fields.statusSetAtTime,
    network: fields.createdInEvent.network,
  }),
  exactExecutionBlock: fields.exactExecutionBlock ?? undefined,
})

export interface ProposalDiscussionPostMention {
  id: string
  text: string
  author: Member
  createdAt: string
}

export const asProposalDiscussionPostMention = (
  fields: ProposalDiscussionPostMentionFieldsFragment
): ProposalDiscussionPostMention => ({
  id: fields.id,
  text: fields.text,
  author: asMember(fields.author),
  createdAt: fields.createdAt,
})

export type LatestProposal = Pick<Proposal, 'id' | 'status' | 'type'> & {
  createdInEvent: Block
  statusSetAtBlock: Block
  exactExecutionBlock?: number
}

export const asLatestProposal = (fields: GetLatestProposalByMemberIdQuery['proposals'][0]): LatestProposal => ({
  id: fields.id,
  status: typenameToProposalStatus(fields.status.__typename),
  type: typenameToProposalDetails(fields.details.__typename),
  createdInEvent: asBlock({
    inBlock: fields.createdInEvent.inBlock,
    createdAt: fields.createdInEvent.createdAt,
    network: fields.createdInEvent.network,
  }),
  statusSetAtBlock: asBlock({
    inBlock: fields.statusSetAtBlock,
    createdAt: fields.statusSetAtTime,
    network: fields.createdInEvent.network,
  }),
  exactExecutionBlock: fields.exactExecutionBlock ?? undefined,
})
