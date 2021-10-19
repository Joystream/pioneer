import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated';

import { gql } from '@apollo/client';
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ProposalFieldsFragment = { __typename: 'Proposal', id: string, title: string, statusSetAtTime: any, createdAt: any, status: { __typename: 'ProposalStatusCanceledByRuntime' } | { __typename: 'ProposalStatusCancelled' } | { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' } | { __typename: 'ProposalStatusExpired' } | { __typename: 'ProposalStatusGracing' } | { __typename: 'ProposalStatusRejected' } | { __typename: 'ProposalStatusSlashed' } | { __typename: 'ProposalStatusVetoed' }, details: { __typename: 'AmendConstitutionProposalDetails' } | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'CreateBlogPostProposalDetails' } | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' } | { __typename: 'EditBlogPostProposalDetails' } | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'FundingRequestProposalDetails' } | { __typename: 'LockBlogPostProposalDetails' } | { __typename: 'RuntimeUpgradeProposalDetails' } | { __typename: 'SetCouncilBudgetIncrementProposalDetails' } | { __typename: 'SetCouncilorRewardProposalDetails' } | { __typename: 'SetInitialInvitationBalanceProposalDetails' } | { __typename: 'SetInitialInvitationCountProposalDetails' } | { __typename: 'SetMaxValidatorCountProposalDetails' } | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' } | { __typename: 'SetMembershipPriceProposalDetails' } | { __typename: 'SetReferralCutProposalDetails' } | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' } | { __typename: 'SignalProposalDetails' } | { __typename: 'SlashWorkingGroupLeadProposalDetails' } | { __typename: 'TerminateWorkingGroupLeadProposalDetails' } | { __typename: 'UnlockBlogPostProposalDetails' } | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' } | { __typename: 'VetoProposalDetails' }, creator: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } };

export type VoteFieldsFragment = { __typename: 'ProposalVotedEvent', id: string, voteKind: Types.ProposalVoteKind, votingRound: number, voter: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } };

export type VoteWithDetailsFieldsFragment = { __typename: 'ProposalVotedEvent', rationale: string, inBlock: number, createdAt: any, network: Types.Network, proposalId: string, id: string, voteKind: Types.ProposalVoteKind, votingRound: number, voter: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } };

export type ProposalWithDetailsFieldsFragment = { __typename: 'Proposal', stakingAccount?: string | null | undefined, description: string, statusSetAtBlock: number, id: string, title: string, statusSetAtTime: any, createdAt: any, votes: Array<{ __typename: 'ProposalVotedEvent', id: string, voteKind: Types.ProposalVoteKind, votingRound: number, voter: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }>, createdInEvent: { __typename: 'ProposalCreatedEvent', inBlock: number, createdAt: any, network: Types.Network }, proposalStatusUpdates: Array<{ __typename: 'ProposalStatusUpdatedEvent', inBlock: number, createdAt: any, network: Types.Network, newStatus: { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusGracing' } }>, details: { __typename: 'AmendConstitutionProposalDetails' } | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'CreateBlogPostProposalDetails' } | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails', stakeAmount: any, unstakingPeriod: number, rewardPerBlock: any, metadata?: { __typename: 'WorkingGroupOpeningMetadata', description?: string | null | undefined } | null | undefined, group?: { __typename: 'WorkingGroup', id: string, name: string } | null | undefined } | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails', amount: any, lead?: { __typename: 'Worker', createdAt: any, group: { __typename: 'WorkingGroup', id: string, name: string }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined } | { __typename: 'EditBlogPostProposalDetails' } | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'FundingRequestProposalDetails', destinationsList?: { __typename: 'FundingRequestDestinationsList', destinations: Array<{ __typename: 'FundingRequestDestination', amount: any, account: string }> } | null | undefined } | { __typename: 'LockBlogPostProposalDetails' } | { __typename: 'RuntimeUpgradeProposalDetails', newRuntimeBytecode?: { __typename: 'RuntimeWasmBytecode', id: string } | null | undefined } | { __typename: 'SetCouncilBudgetIncrementProposalDetails' } | { __typename: 'SetCouncilorRewardProposalDetails' } | { __typename: 'SetInitialInvitationBalanceProposalDetails' } | { __typename: 'SetInitialInvitationCountProposalDetails' } | { __typename: 'SetMaxValidatorCountProposalDetails' } | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' } | { __typename: 'SetMembershipPriceProposalDetails' } | { __typename: 'SetReferralCutProposalDetails' } | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' } | { __typename: 'SignalProposalDetails' } | { __typename: 'SlashWorkingGroupLeadProposalDetails', amount: any, lead?: { __typename: 'Worker', createdAt: any, group: { __typename: 'WorkingGroup', id: string, name: string }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined } | { __typename: 'TerminateWorkingGroupLeadProposalDetails' } | { __typename: 'UnlockBlogPostProposalDetails' } | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' } | { __typename: 'VetoProposalDetails' }, discussionThread: { __typename: 'ProposalDiscussionThread', id: string, posts: Array<{ __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, repliesTo?: { __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }>, mode: { __typename: 'ProposalDiscussionThreadModeClosed', whitelist?: { __typename: 'ProposalDiscussionWhitelist', members: Array<{ __typename: 'Membership', id: string }> } | null | undefined } | { __typename: 'ProposalDiscussionThreadModeOpen' } }, status: { __typename: 'ProposalStatusCanceledByRuntime' } | { __typename: 'ProposalStatusCancelled' } | { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' } | { __typename: 'ProposalStatusExpired' } | { __typename: 'ProposalStatusGracing' } | { __typename: 'ProposalStatusRejected' } | { __typename: 'ProposalStatusSlashed' } | { __typename: 'ProposalStatusVetoed' }, creator: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } };

export type DiscussionPostFieldsFragment = { __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, repliesTo?: { __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } };

export type DiscussionPostWithoutReplyFieldsFragment = { __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } };

export type ProposalPostParentsFragment = { __typename: 'ProposalDiscussionPost', discussionThreadId: string };

export type GetProposalsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ProposalWhereInput>;
}>;


export type GetProposalsQuery = { __typename: 'Query', proposals: Array<{ __typename: 'Proposal', id: string, title: string, statusSetAtTime: any, createdAt: any, status: { __typename: 'ProposalStatusCanceledByRuntime' } | { __typename: 'ProposalStatusCancelled' } | { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' } | { __typename: 'ProposalStatusExpired' } | { __typename: 'ProposalStatusGracing' } | { __typename: 'ProposalStatusRejected' } | { __typename: 'ProposalStatusSlashed' } | { __typename: 'ProposalStatusVetoed' }, details: { __typename: 'AmendConstitutionProposalDetails' } | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'CreateBlogPostProposalDetails' } | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' } | { __typename: 'EditBlogPostProposalDetails' } | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'FundingRequestProposalDetails' } | { __typename: 'LockBlogPostProposalDetails' } | { __typename: 'RuntimeUpgradeProposalDetails' } | { __typename: 'SetCouncilBudgetIncrementProposalDetails' } | { __typename: 'SetCouncilorRewardProposalDetails' } | { __typename: 'SetInitialInvitationBalanceProposalDetails' } | { __typename: 'SetInitialInvitationCountProposalDetails' } | { __typename: 'SetMaxValidatorCountProposalDetails' } | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' } | { __typename: 'SetMembershipPriceProposalDetails' } | { __typename: 'SetReferralCutProposalDetails' } | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' } | { __typename: 'SignalProposalDetails' } | { __typename: 'SlashWorkingGroupLeadProposalDetails' } | { __typename: 'TerminateWorkingGroupLeadProposalDetails' } | { __typename: 'UnlockBlogPostProposalDetails' } | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' } | { __typename: 'VetoProposalDetails' }, creator: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }> };

export type GetProposalQueryVariables = Types.Exact<{
  where: Types.ProposalWhereUniqueInput;
}>;


export type GetProposalQuery = { __typename: 'Query', proposal?: { __typename: 'Proposal', stakingAccount?: string | null | undefined, description: string, statusSetAtBlock: number, id: string, title: string, statusSetAtTime: any, createdAt: any, votes: Array<{ __typename: 'ProposalVotedEvent', id: string, voteKind: Types.ProposalVoteKind, votingRound: number, voter: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }>, createdInEvent: { __typename: 'ProposalCreatedEvent', inBlock: number, createdAt: any, network: Types.Network }, proposalStatusUpdates: Array<{ __typename: 'ProposalStatusUpdatedEvent', inBlock: number, createdAt: any, network: Types.Network, newStatus: { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusGracing' } }>, details: { __typename: 'AmendConstitutionProposalDetails' } | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'CreateBlogPostProposalDetails' } | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails', stakeAmount: any, unstakingPeriod: number, rewardPerBlock: any, metadata?: { __typename: 'WorkingGroupOpeningMetadata', description?: string | null | undefined } | null | undefined, group?: { __typename: 'WorkingGroup', id: string, name: string } | null | undefined } | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails', amount: any, lead?: { __typename: 'Worker', createdAt: any, group: { __typename: 'WorkingGroup', id: string, name: string }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined } | { __typename: 'EditBlogPostProposalDetails' } | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'FundingRequestProposalDetails', destinationsList?: { __typename: 'FundingRequestDestinationsList', destinations: Array<{ __typename: 'FundingRequestDestination', amount: any, account: string }> } | null | undefined } | { __typename: 'LockBlogPostProposalDetails' } | { __typename: 'RuntimeUpgradeProposalDetails', newRuntimeBytecode?: { __typename: 'RuntimeWasmBytecode', id: string } | null | undefined } | { __typename: 'SetCouncilBudgetIncrementProposalDetails' } | { __typename: 'SetCouncilorRewardProposalDetails' } | { __typename: 'SetInitialInvitationBalanceProposalDetails' } | { __typename: 'SetInitialInvitationCountProposalDetails' } | { __typename: 'SetMaxValidatorCountProposalDetails' } | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' } | { __typename: 'SetMembershipPriceProposalDetails' } | { __typename: 'SetReferralCutProposalDetails' } | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' } | { __typename: 'SignalProposalDetails' } | { __typename: 'SlashWorkingGroupLeadProposalDetails', amount: any, lead?: { __typename: 'Worker', createdAt: any, group: { __typename: 'WorkingGroup', id: string, name: string }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined } | { __typename: 'TerminateWorkingGroupLeadProposalDetails' } | { __typename: 'UnlockBlogPostProposalDetails' } | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' } | { __typename: 'VetoProposalDetails' }, discussionThread: { __typename: 'ProposalDiscussionThread', id: string, posts: Array<{ __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, repliesTo?: { __typename: 'ProposalDiscussionPost', id: string, createdAt: any, updatedAt?: any | null | undefined, text: string, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined, createdInEvent: { __typename: 'ProposalDiscussionPostCreatedEvent', createdAt: any, inBlock: number, network: Types.Network }, author: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }>, mode: { __typename: 'ProposalDiscussionThreadModeClosed', whitelist?: { __typename: 'ProposalDiscussionWhitelist', members: Array<{ __typename: 'Membership', id: string }> } | null | undefined } | { __typename: 'ProposalDiscussionThreadModeOpen' } }, status: { __typename: 'ProposalStatusCanceledByRuntime' } | { __typename: 'ProposalStatusCancelled' } | { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' } | { __typename: 'ProposalStatusExpired' } | { __typename: 'ProposalStatusGracing' } | { __typename: 'ProposalStatusRejected' } | { __typename: 'ProposalStatusSlashed' } | { __typename: 'ProposalStatusVetoed' }, creator: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined };

export type GetVoteWithDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetVoteWithDetailsQuery = { __typename: 'Query', proposalVotedEventByUniqueInput?: { __typename: 'ProposalVotedEvent', rationale: string, inBlock: number, createdAt: any, network: Types.Network, proposalId: string, id: string, voteKind: Types.ProposalVoteKind, votingRound: number, voter: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } } | null | undefined };

export type GetRuntimeWasmBytecodeQueryVariables = Types.Exact<{
  where: Types.RuntimeWasmBytecodeWhereUniqueInput;
}>;


export type GetRuntimeWasmBytecodeQuery = { __typename: 'Query', runtime?: { __typename: 'RuntimeWasmBytecode', id: string, bytecode: any } | null | undefined };

export type GetProposalPostParentQueryVariables = Types.Exact<{
  where: Types.ProposalDiscussionPostWhereUniqueInput;
}>;


export type GetProposalPostParentQuery = { __typename: 'Query', proposalDiscussionPostByUniqueInput?: { __typename: 'ProposalDiscussionPost', discussionThreadId: string } | null | undefined };

export const VoteFieldsFragmentDoc = gql`
    fragment VoteFields on ProposalVotedEvent {
  id
  voteKind
  voter {
    ...MemberFields
  }
  votingRound
}
    ${MemberFieldsFragmentDoc}`;
export const VoteWithDetailsFieldsFragmentDoc = gql`
    fragment VoteWithDetailsFields on ProposalVotedEvent {
  ...VoteFields
  rationale
  inBlock
  createdAt
  network
  proposalId
}
    ${VoteFieldsFragmentDoc}`;
export const ProposalFieldsFragmentDoc = gql`
    fragment ProposalFields on Proposal {
  id
  title
  status {
    __typename
  }
  statusSetAtTime
  details {
    __typename
  }
  creator {
    ...MemberFields
  }
  createdAt
}
    ${MemberFieldsFragmentDoc}`;
export const DiscussionPostWithoutReplyFieldsFragmentDoc = gql`
    fragment DiscussionPostWithoutReplyFields on ProposalDiscussionPost {
  id
  createdAt
  createdInEvent {
    createdAt
    inBlock
    network
  }
  updatedAt
  author {
    ...MemberFields
  }
  text
}
    ${MemberFieldsFragmentDoc}`;
export const DiscussionPostFieldsFragmentDoc = gql`
    fragment DiscussionPostFields on ProposalDiscussionPost {
  ...DiscussionPostWithoutReplyFields
  repliesTo {
    ...DiscussionPostWithoutReplyFields
  }
}
    ${DiscussionPostWithoutReplyFieldsFragmentDoc}`;
export const ProposalWithDetailsFieldsFragmentDoc = gql`
    fragment ProposalWithDetailsFields on Proposal {
  ...ProposalFields
  stakingAccount
  description
  statusSetAtBlock
  votes {
    ...VoteFields
  }
  createdInEvent {
    inBlock
    createdAt
    network
  }
  proposalStatusUpdates {
    inBlock
    createdAt
    network
    newStatus {
      __typename
    }
  }
  details {
    __typename
    ... on FundingRequestProposalDetails {
      destinationsList {
        destinations {
          amount
          account
        }
      }
    }
    ... on CreateWorkingGroupLeadOpeningProposalDetails {
      metadata {
        description
      }
      stakeAmount
      unstakingPeriod
      rewardPerBlock
      group {
        id
        name
      }
    }
    ... on DecreaseWorkingGroupLeadStakeProposalDetails {
      lead {
        createdAt
        group {
          id
          name
        }
        membership {
          ...MemberFields
        }
      }
      amount
    }
    ... on SlashWorkingGroupLeadProposalDetails {
      lead {
        createdAt
        group {
          id
          name
        }
        membership {
          ...MemberFields
        }
      }
      amount
    }
    ... on RuntimeUpgradeProposalDetails {
      newRuntimeBytecode {
        id
      }
    }
  }
  discussionThread {
    id
    posts {
      ...DiscussionPostFields
    }
    mode {
      __typename
      ... on ProposalDiscussionThreadModeClosed {
        whitelist {
          members {
            id
          }
        }
      }
    }
  }
}
    ${ProposalFieldsFragmentDoc}
${VoteFieldsFragmentDoc}
${MemberFieldsFragmentDoc}
${DiscussionPostFieldsFragmentDoc}`;
export const ProposalPostParentsFragmentDoc = gql`
    fragment ProposalPostParents on ProposalDiscussionPost {
  discussionThreadId
}
    `;
export const GetProposalsDocument = gql`
    query getProposals($where: ProposalWhereInput) {
  proposals(where: $where) {
    ...ProposalFields
  }
}
    ${ProposalFieldsFragmentDoc}`;

/**
 * __useGetProposalsQuery__
 *
 * To run a query within a React component, call `useGetProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProposalsQuery(baseOptions?: Apollo.QueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
      }
export function useGetProposalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
        }
export type GetProposalsQueryHookResult = ReturnType<typeof useGetProposalsQuery>;
export type GetProposalsLazyQueryHookResult = ReturnType<typeof useGetProposalsLazyQuery>;
export type GetProposalsQueryResult = Apollo.QueryResult<GetProposalsQuery, GetProposalsQueryVariables>;
export const GetProposalDocument = gql`
    query getProposal($where: ProposalWhereUniqueInput!) {
  proposal: proposalByUniqueInput(where: $where) {
    ...ProposalWithDetailsFields
  }
}
    ${ProposalWithDetailsFieldsFragmentDoc}`;

/**
 * __useGetProposalQuery__
 *
 * To run a query within a React component, call `useGetProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProposalQuery(baseOptions: Apollo.QueryHookOptions<GetProposalQuery, GetProposalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options);
      }
export function useGetProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalQuery, GetProposalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options);
        }
export type GetProposalQueryHookResult = ReturnType<typeof useGetProposalQuery>;
export type GetProposalLazyQueryHookResult = ReturnType<typeof useGetProposalLazyQuery>;
export type GetProposalQueryResult = Apollo.QueryResult<GetProposalQuery, GetProposalQueryVariables>;
export const GetVoteWithDetailsDocument = gql`
    query GetVoteWithDetails($id: ID!) {
  proposalVotedEventByUniqueInput(where: {id: $id}) {
    ...VoteWithDetailsFields
  }
}
    ${VoteWithDetailsFieldsFragmentDoc}`;

/**
 * __useGetVoteWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetVoteWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteWithDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVoteWithDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>(GetVoteWithDetailsDocument, options);
      }
export function useGetVoteWithDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>(GetVoteWithDetailsDocument, options);
        }
export type GetVoteWithDetailsQueryHookResult = ReturnType<typeof useGetVoteWithDetailsQuery>;
export type GetVoteWithDetailsLazyQueryHookResult = ReturnType<typeof useGetVoteWithDetailsLazyQuery>;
export type GetVoteWithDetailsQueryResult = Apollo.QueryResult<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>;
export const GetRuntimeWasmBytecodeDocument = gql`
    query GetRuntimeWasmBytecode($where: RuntimeWasmBytecodeWhereUniqueInput!) {
  runtime: runtimeWasmBytecodeByUniqueInput(where: $where) {
    id
    bytecode
  }
}
    `;

/**
 * __useGetRuntimeWasmBytecodeQuery__
 *
 * To run a query within a React component, call `useGetRuntimeWasmBytecodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRuntimeWasmBytecodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRuntimeWasmBytecodeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRuntimeWasmBytecodeQuery(baseOptions: Apollo.QueryHookOptions<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>(GetRuntimeWasmBytecodeDocument, options);
      }
export function useGetRuntimeWasmBytecodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>(GetRuntimeWasmBytecodeDocument, options);
        }
export type GetRuntimeWasmBytecodeQueryHookResult = ReturnType<typeof useGetRuntimeWasmBytecodeQuery>;
export type GetRuntimeWasmBytecodeLazyQueryHookResult = ReturnType<typeof useGetRuntimeWasmBytecodeLazyQuery>;
export type GetRuntimeWasmBytecodeQueryResult = Apollo.QueryResult<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>;
export const GetProposalPostParentDocument = gql`
    query GetProposalPostParent($where: ProposalDiscussionPostWhereUniqueInput!) {
  proposalDiscussionPostByUniqueInput(where: $where) {
    ...ProposalPostParents
  }
}
    ${ProposalPostParentsFragmentDoc}`;

/**
 * __useGetProposalPostParentQuery__
 *
 * To run a query within a React component, call `useGetProposalPostParentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalPostParentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalPostParentQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProposalPostParentQuery(baseOptions: Apollo.QueryHookOptions<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>(GetProposalPostParentDocument, options);
      }
export function useGetProposalPostParentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>(GetProposalPostParentDocument, options);
        }
export type GetProposalPostParentQueryHookResult = ReturnType<typeof useGetProposalPostParentQuery>;
export type GetProposalPostParentLazyQueryHookResult = ReturnType<typeof useGetProposalPostParentLazyQuery>;
export type GetProposalPostParentQueryResult = Apollo.QueryResult<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>;