import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated'
import { ProposalFieldsFragmentDoc } from '../../../proposals/queries/__generated__/proposals.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type CouncilMemberFieldsFragment = {
  __typename: 'CouncilMember'
  id: string
  unpaidReward: string
  stake: string
  member: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    councilMembers: Array<{ __typename: 'CouncilMember' }>
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }
}

export type PastCouncilProposalsFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  voteKind: Types.ProposalVoteKind
  voterId: string
  proposal: {
    __typename: 'Proposal'
    id: string
    title: string
    statusSetAtTime: any
    createdAt: any
    councilApprovals: number
    exactExecutionBlock?: number | null
    status:
      | { __typename: 'ProposalStatusCanceledByRuntime' }
      | { __typename: 'ProposalStatusCancelled' }
      | { __typename: 'ProposalStatusDeciding' }
      | { __typename: 'ProposalStatusDormant' }
      | { __typename: 'ProposalStatusExecuted' }
      | { __typename: 'ProposalStatusExecutionFailed' }
      | { __typename: 'ProposalStatusExpired' }
      | { __typename: 'ProposalStatusGracing' }
      | { __typename: 'ProposalStatusRejected' }
      | { __typename: 'ProposalStatusSlashed' }
      | { __typename: 'ProposalStatusVetoed' }
    details:
      | { __typename: 'AmendConstitutionProposalDetails' }
      | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
      | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'FundingRequestProposalDetails' }
      | { __typename: 'RuntimeUpgradeProposalDetails' }
      | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
      | { __typename: 'SetCouncilorRewardProposalDetails' }
      | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
      | { __typename: 'SetInitialInvitationCountProposalDetails' }
      | { __typename: 'SetMaxValidatorCountProposalDetails' }
      | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
      | { __typename: 'SetMembershipPriceProposalDetails' }
      | { __typename: 'SetReferralCutProposalDetails' }
      | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
      | { __typename: 'SignalProposalDetails' }
      | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
      | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
      | { __typename: 'UpdateChannelPayoutsProposalDetails' }
      | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
      | { __typename: 'VetoProposalDetails' }
    creator: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
  }
}

export type PastCouncilWorkingGroupFieldsFragment = {
  __typename: 'WorkingGroup'
  id: string
  name: string
  budget: string
}

export type PastCouncilBudgetSetEventFieldsFragment = {
  __typename: 'BudgetSetEvent'
  newBudget: string
  groupId: string
}

export type PastCouncilRewardPaidEventFieldsFragment = {
  __typename: 'RewardPaidEvent'
  groupId: string
  amount: string
}

export type PastCouncilNewMissedRewardLevelReachedEventFieldsFragment = {
  __typename: 'NewMissedRewardLevelReachedEvent'
  groupId: string
  workerId: string
  newMissedRewardAmount: string
}

export type PastCouncilBudgetUpdatedEventFieldsFragment = {
  __typename: 'BudgetUpdatedEvent'
  groupId: string
  budgetChangeAmount: string
}

export type ElectedCouncilFieldsFragment = {
  __typename: 'ElectedCouncil'
  id: string
  electedAtBlock: number
  electedAtTime: any
  electedAtNetwork: Types.Network
  councilElections: Array<{ __typename: 'ElectionRound'; cycleId: number }>
  councilMembers: Array<{
    __typename: 'CouncilMember'
    id: string
    unpaidReward: string
    stake: string
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      councilMembers: Array<{ __typename: 'CouncilMember' }>
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
  }>
}

export type PastCouncilFieldsFragment = {
  __typename: 'ElectedCouncil'
  id: string
  endedAtBlock?: number | null
  endedAtNetwork?: Types.Network | null
  endedAtTime?: any | null
}

export type PastCouncilDetailedFieldsFragment = {
  __typename: 'ElectedCouncil'
  id: string
  endedAtBlock?: number | null
  endedAtNetwork?: Types.Network | null
  endedAtTime?: any | null
  councilMembers: Array<{ __typename: 'CouncilMember'; accumulatedReward: string; unpaidReward: string }>
}

export type ElectionCandidateFieldsFragment = {
  __typename: 'Candidate'
  id: string
  stake: string
  status: Types.CandidacyStatus
  stakingAccountId: string
  votePower: string
  member: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }
  noteMetadata: {
    __typename: 'CandidacyNoteMetadata'
    header?: string | null
    bulletPoints: Array<string>
    bannerImageUri?: string | null
    description?: string | null
  }
  votesReceived: Array<{ __typename: 'CastVote'; id: string }>
}

export type ElectionRoundFieldsFragment = {
  __typename: 'ElectionRound'
  cycleId: number
  candidates: Array<{
    __typename: 'Candidate'
    id: string
    stake: string
    status: Types.CandidacyStatus
    stakingAccountId: string
    votePower: string
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
    noteMetadata: {
      __typename: 'CandidacyNoteMetadata'
      header?: string | null
      bulletPoints: Array<string>
      bannerImageUri?: string | null
      description?: string | null
    }
    votesReceived: Array<{ __typename: 'CastVote'; id: string }>
  }>
}

export type LatestElectionRoundFieldsFragment = {
  __typename: 'ElectionRound'
  isFinished: boolean
  cycleId: number
  candidates: Array<{
    __typename: 'Candidate'
    id: string
    stake: string
    status: Types.CandidacyStatus
    stakingAccountId: string
    votePower: string
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
    noteMetadata: {
      __typename: 'CandidacyNoteMetadata'
      header?: string | null
      bulletPoints: Array<string>
      bannerImageUri?: string | null
      description?: string | null
    }
    votesReceived: Array<{ __typename: 'CastVote'; id: string }>
  }>
}

export type PastElectionRoundFieldsFragment = {
  __typename: 'ElectionRound'
  id: string
  cycleId: number
  endedAtBlock?: number | null
  endedAtTime?: any | null
  endedAtNetwork?: Types.Network | null
  candidates: Array<{ __typename: 'Candidate'; stake: string }>
  castVotes: Array<{ __typename: 'CastVote'; voteForId?: string | null; stake: string }>
}

export type PastElectionRoundDetailedFieldsFragment = {
  __typename: 'ElectionRound'
  id: string
  cycleId: number
  endedAtBlock?: number | null
  endedAtTime?: any | null
  endedAtNetwork?: Types.Network | null
  candidates: Array<{
    __typename: 'Candidate'
    stake: string
    id: string
    status: Types.CandidacyStatus
    stakingAccountId: string
    votePower: string
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
    noteMetadata: {
      __typename: 'CandidacyNoteMetadata'
      header?: string | null
      bulletPoints: Array<string>
      bannerImageUri?: string | null
      description?: string | null
    }
    votesReceived: Array<{ __typename: 'CastVote'; id: string }>
  }>
  castVotes: Array<{
    __typename: 'CastVote'
    stake: string
    stakeLocked: boolean
    voteForId?: string | null
    castBy: string
  }>
}

export type ElectionCandidateDetailedFieldsFragment = {
  __typename: 'Candidate'
  stakingAccountId: string
  rewardAccountId: string
  id: string
  stake: string
  status: Types.CandidacyStatus
  votePower: string
  electionRound: { __typename: 'ElectionRound'; cycleId: number; isFinished: boolean }
  member: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }
  noteMetadata: {
    __typename: 'CandidacyNoteMetadata'
    header?: string | null
    bulletPoints: Array<string>
    bannerImageUri?: string | null
    description?: string | null
  }
  votesReceived: Array<{ __typename: 'CastVote'; id: string }>
}

export type CastVoteFieldsFragment = {
  __typename: 'CastVote'
  id: string
  stake: string
  stakeLocked: boolean
  castBy: string
  commitment: string
  voteFor?: {
    __typename: 'Candidate'
    id: string
    stake: string
    status: Types.CandidacyStatus
    stakingAccountId: string
    votePower: string
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
    noteMetadata: {
      __typename: 'CandidacyNoteMetadata'
      header?: string | null
      bulletPoints: Array<string>
      bannerImageUri?: string | null
      description?: string | null
    }
    votesReceived: Array<{ __typename: 'CastVote'; id: string }>
  } | null
  electionRound: { __typename: 'ElectionRound'; cycleId: number; id: string }
  castEvent?: Array<{ __typename: 'VoteCastEvent'; inBlock: number; network: Types.Network; createdAt: any }> | null
}

export type CouncilSpendingEventFieldsFragment = {
  __typename: 'BudgetSpendingEvent'
  amount: string
  type?: Types.EventTypeOptions | null
}

export type FundingRequestApprovedFragment = {
  __typename: 'ProposalExecutedEvent'
  proposal: {
    __typename: 'Proposal'
    details:
      | { __typename: 'AmendConstitutionProposalDetails' }
      | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
      | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
      | {
          __typename: 'FundingRequestProposalDetails'
          destinationsList?: {
            __typename: 'FundingRequestDestinationsList'
            destinations: Array<{ __typename: 'FundingRequestDestination'; amount: string; account: string }>
          } | null
        }
      | { __typename: 'RuntimeUpgradeProposalDetails' }
      | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
      | { __typename: 'SetCouncilorRewardProposalDetails' }
      | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
      | { __typename: 'SetInitialInvitationCountProposalDetails' }
      | { __typename: 'SetMaxValidatorCountProposalDetails' }
      | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
      | { __typename: 'SetMembershipPriceProposalDetails' }
      | { __typename: 'SetReferralCutProposalDetails' }
      | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
      | { __typename: 'SignalProposalDetails' }
      | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
      | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
      | { __typename: 'UpdateChannelPayoutsProposalDetails' }
      | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
      | { __typename: 'VetoProposalDetails' }
  }
}

export type GetElectedCouncilQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetElectedCouncilQuery = {
  __typename: 'Query'
  electedCouncils: Array<{
    __typename: 'ElectedCouncil'
    id: string
    electedAtBlock: number
    electedAtTime: any
    electedAtNetwork: Types.Network
    councilElections: Array<{ __typename: 'ElectionRound'; cycleId: number }>
    councilMembers: Array<{
      __typename: 'CouncilMember'
      id: string
      unpaidReward: string
      stake: string
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        councilMembers: Array<{ __typename: 'CouncilMember' }>
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
    }>
  }>
}

export type GetCouncilorVoterStakeQueryVariables = Types.Exact<{
  electionRound: Types.ElectionRoundWhereInput
}>

export type GetCouncilorVoterStakeQuery = {
  __typename: 'Query'
  candidates: Array<{
    __typename: 'Candidate'
    memberId: string
    votesReceived: Array<{ __typename: 'CastVote'; stake: string }>
  }>
}

export type GetPastCouncilsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
  orderBy?: Types.InputMaybe<Array<Types.ElectedCouncilOrderByInput> | Types.ElectedCouncilOrderByInput>
}>

export type GetPastCouncilsQuery = {
  __typename: 'Query'
  electedCouncils: Array<{
    __typename: 'ElectedCouncil'
    id: string
    endedAtBlock?: number | null
    endedAtNetwork?: Types.Network | null
    endedAtTime?: any | null
  }>
}

export type GetPastCouncilsCountQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetPastCouncilsCountQuery = {
  __typename: 'Query'
  electedCouncilsConnection: { __typename: 'ElectedCouncilConnection'; totalCount: number }
}

export type GetPastCouncilQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
  fromBlock: Types.Scalars['Int']
  toBlock: Types.Scalars['Int']
}>

export type GetPastCouncilQuery = {
  __typename: 'Query'
  electedCouncilByUniqueInput?: {
    __typename: 'ElectedCouncil'
    id: string
    endedAtBlock?: number | null
    endedAtNetwork?: Types.Network | null
    endedAtTime?: any | null
    councilMembers: Array<{ __typename: 'CouncilMember'; accumulatedReward: string; unpaidReward: string }>
  } | null
  budgetSpendingEvents: Array<{
    __typename: 'BudgetSpendingEvent'
    amount: string
    type?: Types.EventTypeOptions | null
  }>
  fundingRequestsApproved: Array<{
    __typename: 'ProposalExecutedEvent'
    proposal: {
      __typename: 'Proposal'
      details:
        | { __typename: 'AmendConstitutionProposalDetails' }
        | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
        | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
        | {
            __typename: 'FundingRequestProposalDetails'
            destinationsList?: {
              __typename: 'FundingRequestDestinationsList'
              destinations: Array<{ __typename: 'FundingRequestDestination'; amount: string; account: string }>
            } | null
          }
        | { __typename: 'RuntimeUpgradeProposalDetails' }
        | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
        | { __typename: 'SetCouncilorRewardProposalDetails' }
        | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
        | { __typename: 'SetInitialInvitationCountProposalDetails' }
        | { __typename: 'SetMaxValidatorCountProposalDetails' }
        | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
        | { __typename: 'SetMembershipPriceProposalDetails' }
        | { __typename: 'SetReferralCutProposalDetails' }
        | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
        | { __typename: 'SignalProposalDetails' }
        | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
        | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
        | { __typename: 'UpdateChannelPayoutsProposalDetails' }
        | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
        | { __typename: 'VetoProposalDetails' }
    }
  }>
}

export type GetPastCouncilMembersQueryVariables = Types.Exact<{
  councilId: Types.Scalars['ID']
  fromBlock: Types.Scalars['Int']
  toBlock: Types.Scalars['Int']
}>

export type GetPastCouncilMembersQuery = {
  __typename: 'Query'
  councilMembers: Array<{
    __typename: 'CouncilMember'
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
  }>
  proposalVotedEvents: Array<{
    __typename: 'ProposalVotedEvent'
    voteKind: Types.ProposalVoteKind
    voterId: string
    proposal: {
      __typename: 'Proposal'
      id: string
      title: string
      statusSetAtTime: any
      createdAt: any
      councilApprovals: number
      exactExecutionBlock?: number | null
      status:
        | { __typename: 'ProposalStatusCanceledByRuntime' }
        | { __typename: 'ProposalStatusCancelled' }
        | { __typename: 'ProposalStatusDeciding' }
        | { __typename: 'ProposalStatusDormant' }
        | { __typename: 'ProposalStatusExecuted' }
        | { __typename: 'ProposalStatusExecutionFailed' }
        | { __typename: 'ProposalStatusExpired' }
        | { __typename: 'ProposalStatusGracing' }
        | { __typename: 'ProposalStatusRejected' }
        | { __typename: 'ProposalStatusSlashed' }
        | { __typename: 'ProposalStatusVetoed' }
      details:
        | { __typename: 'AmendConstitutionProposalDetails' }
        | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
        | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'FundingRequestProposalDetails' }
        | { __typename: 'RuntimeUpgradeProposalDetails' }
        | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
        | { __typename: 'SetCouncilorRewardProposalDetails' }
        | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
        | { __typename: 'SetInitialInvitationCountProposalDetails' }
        | { __typename: 'SetMaxValidatorCountProposalDetails' }
        | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
        | { __typename: 'SetMembershipPriceProposalDetails' }
        | { __typename: 'SetReferralCutProposalDetails' }
        | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
        | { __typename: 'SignalProposalDetails' }
        | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
        | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
        | { __typename: 'UpdateChannelPayoutsProposalDetails' }
        | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
        | { __typename: 'VetoProposalDetails' }
      creator: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
    }
  }>
}

export type GetPastCouncilProposalsQueryVariables = Types.Exact<{
  fromBlock: Types.Scalars['Int']
  toBlock: Types.Scalars['Int']
}>

export type GetPastCouncilProposalsQuery = {
  __typename: 'Query'
  proposals: Array<{
    __typename: 'Proposal'
    id: string
    title: string
    statusSetAtTime: any
    createdAt: any
    councilApprovals: number
    exactExecutionBlock?: number | null
    status:
      | { __typename: 'ProposalStatusCanceledByRuntime' }
      | { __typename: 'ProposalStatusCancelled' }
      | { __typename: 'ProposalStatusDeciding' }
      | { __typename: 'ProposalStatusDormant' }
      | { __typename: 'ProposalStatusExecuted' }
      | { __typename: 'ProposalStatusExecutionFailed' }
      | { __typename: 'ProposalStatusExpired' }
      | { __typename: 'ProposalStatusGracing' }
      | { __typename: 'ProposalStatusRejected' }
      | { __typename: 'ProposalStatusSlashed' }
      | { __typename: 'ProposalStatusVetoed' }
    details:
      | { __typename: 'AmendConstitutionProposalDetails' }
      | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
      | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
      | { __typename: 'FundingRequestProposalDetails' }
      | { __typename: 'RuntimeUpgradeProposalDetails' }
      | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
      | { __typename: 'SetCouncilorRewardProposalDetails' }
      | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
      | { __typename: 'SetInitialInvitationCountProposalDetails' }
      | { __typename: 'SetMaxValidatorCountProposalDetails' }
      | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
      | { __typename: 'SetMembershipPriceProposalDetails' }
      | { __typename: 'SetReferralCutProposalDetails' }
      | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
      | { __typename: 'SignalProposalDetails' }
      | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
      | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
      | { __typename: 'UpdateChannelPayoutsProposalDetails' }
      | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
      | { __typename: 'VetoProposalDetails' }
    creator: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
  }>
}

export type GetPastCouncilWorkingGroupsQueryVariables = Types.Exact<{
  fromBlock: Types.Scalars['Int']
  toBlock: Types.Scalars['Int']
}>

export type GetPastCouncilWorkingGroupsQuery = {
  __typename: 'Query'
  workingGroups: Array<{ __typename: 'WorkingGroup'; id: string; name: string; budget: string }>
  rewardPaidEvents: Array<{ __typename: 'RewardPaidEvent'; groupId: string; amount: string }>
  newMissedRewardLevelReachedEvents: Array<{
    __typename: 'NewMissedRewardLevelReachedEvent'
    groupId: string
    workerId: string
    newMissedRewardAmount: string
  }>
  budgetUpdatedEvents: Array<{ __typename: 'BudgetUpdatedEvent'; groupId: string; budgetChangeAmount: string }>
}

export type GetCurrentElectionQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCurrentElectionQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    cycleId: number
    candidates: Array<{
      __typename: 'Candidate'
      id: string
      stake: string
      status: Types.CandidacyStatus
      stakingAccountId: string
      votePower: string
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
      noteMetadata: {
        __typename: 'CandidacyNoteMetadata'
        header?: string | null
        bulletPoints: Array<string>
        bannerImageUri?: string | null
        description?: string | null
      }
      votesReceived: Array<{ __typename: 'CastVote'; id: string }>
    }>
  }>
}

export type GetLatestElectionQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetLatestElectionQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    isFinished: boolean
    cycleId: number
    candidates: Array<{
      __typename: 'Candidate'
      id: string
      stake: string
      status: Types.CandidacyStatus
      stakingAccountId: string
      votePower: string
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
      noteMetadata: {
        __typename: 'CandidacyNoteMetadata'
        header?: string | null
        bulletPoints: Array<string>
        bannerImageUri?: string | null
        description?: string | null
      }
      votesReceived: Array<{ __typename: 'CastVote'; id: string }>
    }>
  }>
}

export type GetPastElectionsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
  orderBy?: Types.InputMaybe<Array<Types.ElectionRoundOrderByInput> | Types.ElectionRoundOrderByInput>
}>

export type GetPastElectionsQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    id: string
    cycleId: number
    endedAtBlock?: number | null
    endedAtTime?: any | null
    endedAtNetwork?: Types.Network | null
    candidates: Array<{ __typename: 'Candidate'; stake: string }>
    castVotes: Array<{ __typename: 'CastVote'; voteForId?: string | null; stake: string }>
  }>
}

export type GetPastElectionsCountQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetPastElectionsCountQuery = {
  __typename: 'Query'
  electionRoundsConnection: { __typename: 'ElectionRoundConnection'; totalCount: number }
}

export type GetPastElectionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPastElectionQuery = {
  __typename: 'Query'
  electionRoundByUniqueInput?: {
    __typename: 'ElectionRound'
    id: string
    cycleId: number
    endedAtBlock?: number | null
    endedAtTime?: any | null
    endedAtNetwork?: Types.Network | null
    candidates: Array<{
      __typename: 'Candidate'
      stake: string
      id: string
      status: Types.CandidacyStatus
      stakingAccountId: string
      votePower: string
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
      noteMetadata: {
        __typename: 'CandidacyNoteMetadata'
        header?: string | null
        bulletPoints: Array<string>
        bannerImageUri?: string | null
        description?: string | null
      }
      votesReceived: Array<{ __typename: 'CastVote'; id: string }>
    }>
    castVotes: Array<{
      __typename: 'CastVote'
      stake: string
      stakeLocked: boolean
      voteForId?: string | null
      castBy: string
    }>
  } | null
}

export type GetCandidateQueryVariables = Types.Exact<{
  where: Types.CandidateWhereUniqueInput
}>

export type GetCandidateQuery = {
  __typename: 'Query'
  candidateByUniqueInput?: {
    __typename: 'Candidate'
    stakingAccountId: string
    rewardAccountId: string
    id: string
    stake: string
    status: Types.CandidacyStatus
    votePower: string
    electionRound: { __typename: 'ElectionRound'; cycleId: number; isFinished: boolean }
    member: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }
    noteMetadata: {
      __typename: 'CandidacyNoteMetadata'
      header?: string | null
      bulletPoints: Array<string>
      bannerImageUri?: string | null
      description?: string | null
    }
    votesReceived: Array<{ __typename: 'CastVote'; id: string }>
  } | null
}

export type GetElectionCandidatesIdsQueryVariables = Types.Exact<{
  electionCycleId: Types.Scalars['Int']
}>

export type GetElectionCandidatesIdsQuery = {
  __typename: 'Query'
  candidates: Array<{ __typename: 'Candidate'; id: string }>
}

export type GetCurrentCandidateIdByMemberQueryVariables = Types.Exact<{
  memberId: Types.Scalars['ID']
}>

export type GetCurrentCandidateIdByMemberQuery = {
  __typename: 'Query'
  candidates: Array<{ __typename: 'Candidate'; id: string }>
}

export type GetCandidateStatsQueryVariables = Types.Exact<{
  memberId?: Types.InputMaybe<Types.Scalars['ID']>
}>

export type GetCandidateStatsQuery = {
  __typename: 'Query'
  withdrawn: { __typename: 'CandidateConnection'; totalCount: number }
  successful: { __typename: 'CandidateConnection'; totalCount: number }
  failed: { __typename: 'CandidateConnection'; totalCount: number }
}

export type GetCouncilVotesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CastVoteWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.CastVoteOrderByInput> | Types.CastVoteOrderByInput>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetCouncilVotesQuery = {
  __typename: 'Query'
  castVotes: Array<{
    __typename: 'CastVote'
    id: string
    stake: string
    stakeLocked: boolean
    castBy: string
    commitment: string
    voteFor?: {
      __typename: 'Candidate'
      id: string
      stake: string
      status: Types.CandidacyStatus
      stakingAccountId: string
      votePower: string
      member: {
        __typename: 'Membership'
        id: string
        rootAccount: string
        controllerAccount: string
        boundAccounts: Array<string>
        handle: string
        isVerified: boolean
        isFoundingMember: boolean
        isCouncilMember: boolean
        inviteCount: number
        createdAt: any
        metadata: {
          __typename: 'MemberMetadata'
          name?: string | null
          about?: string | null
          avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
        }
        roles: Array<{
          __typename: 'Worker'
          id: string
          createdAt: any
          isLead: boolean
          group: { __typename: 'WorkingGroup'; name: string }
        }>
        stakingaccountaddedeventmember?: Array<{
          __typename: 'StakingAccountAddedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
          account: string
        }> | null
      }
      noteMetadata: {
        __typename: 'CandidacyNoteMetadata'
        header?: string | null
        bulletPoints: Array<string>
        bannerImageUri?: string | null
        description?: string | null
      }
      votesReceived: Array<{ __typename: 'CastVote'; id: string }>
    } | null
    electionRound: { __typename: 'ElectionRound'; cycleId: number; id: string }
    castEvent?: Array<{ __typename: 'VoteCastEvent'; inBlock: number; network: Types.Network; createdAt: any }> | null
  }>
}

export type GetCouncilVotesCommitmentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CastVoteWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.CastVoteOrderByInput> | Types.CastVoteOrderByInput>
}>

export type GetCouncilVotesCommitmentsQuery = {
  __typename: 'Query'
  castVotes: Array<{ __typename: 'CastVote'; commitment: string }>
}

export type GetCouncilVotesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CastVoteWhereInput>
}>

export type GetCouncilVotesCountQuery = {
  __typename: 'Query'
  castVotesConnection: { __typename: 'CastVoteConnection'; totalCount: number }
}

export type GetPastVotesResultsQueryVariables = Types.Exact<{
  myAccounts?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>
}>

export type GetPastVotesResultsQuery = {
  __typename: 'Query'
  electionRounds: Array<{
    __typename: 'ElectionRound'
    id: string
    electedCouncil: {
      __typename: 'ElectedCouncil'
      councilMembers: Array<{ __typename: 'CouncilMember'; member: { __typename: 'Membership'; id: string } }>
    }
  }>
  castVotes: Array<{
    __typename: 'CastVote'
    voteFor?: { __typename: 'Candidate'; id: string } | null
    electionRound: { __typename: 'ElectionRound'; id: string }
  }>
}

export type GetCouncilBlockRangeQueryVariables = Types.Exact<{
  where: Types.ElectedCouncilWhereUniqueInput
}>

export type GetCouncilBlockRangeQuery = {
  __typename: 'Query'
  electedCouncilByUniqueInput?: {
    __typename: 'ElectedCouncil'
    electedAtBlock: number
    endedAtBlock?: number | null
  } | null
}

export type GetPastCouncilStatsQueryVariables = Types.Exact<{
  startBlock: Types.Scalars['Int']
  endBlock: Types.Scalars['Int']
}>

export type GetPastCouncilStatsQuery = {
  __typename: 'Query'
  proposalsApproved: { __typename: 'ProposalExecutedEventConnection'; totalCount: number }
  fundingRequestsApproved: Array<{
    __typename: 'ProposalExecutedEvent'
    proposal: {
      __typename: 'Proposal'
      details:
        | { __typename: 'AmendConstitutionProposalDetails' }
        | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
        | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
        | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
        | {
            __typename: 'FundingRequestProposalDetails'
            destinationsList?: {
              __typename: 'FundingRequestDestinationsList'
              destinations: Array<{ __typename: 'FundingRequestDestination'; amount: string; account: string }>
            } | null
          }
        | { __typename: 'RuntimeUpgradeProposalDetails' }
        | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
        | { __typename: 'SetCouncilorRewardProposalDetails' }
        | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
        | { __typename: 'SetInitialInvitationCountProposalDetails' }
        | { __typename: 'SetMaxValidatorCountProposalDetails' }
        | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
        | { __typename: 'SetMembershipPriceProposalDetails' }
        | { __typename: 'SetReferralCutProposalDetails' }
        | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
        | { __typename: 'SignalProposalDetails' }
        | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
        | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
        | { __typename: 'UpdateChannelPayoutsProposalDetails' }
        | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
        | { __typename: 'VetoProposalDetails' }
    }
  }>
  proposalsRejected: { __typename: 'ProposalDecisionMadeEventConnection'; totalCount: number }
  proposalsSlashed: { __typename: 'ProposalDecisionMadeEventConnection'; totalCount: number }
  budgetSpendingEvents: Array<{
    __typename: 'BudgetSpendingEvent'
    amount: string
    type?: Types.EventTypeOptions | null
  }>
}

export type GetCouncilorElectionEventQueryVariables = Types.Exact<{
  lockAccount?: Types.InputMaybe<Types.Scalars['String']>
}>

export type GetCouncilorElectionEventQuery = {
  __typename: 'Query'
  councilMembers: Array<{
    __typename: 'CouncilMember'
    electedInCouncil: {
      __typename: 'ElectedCouncil'
      id: string
      electedAtBlock: number
      electedAtTime: any
      electedAtNetwork: Types.Network
    }
  }>
}

export const PastCouncilProposalsFieldsFragmentDoc = gql`
  fragment PastCouncilProposalsFields on ProposalVotedEvent {
    voteKind
    voterId
    proposal {
      ...ProposalFields
    }
  }
  ${ProposalFieldsFragmentDoc}
`
export const PastCouncilWorkingGroupFieldsFragmentDoc = gql`
  fragment PastCouncilWorkingGroupFields on WorkingGroup {
    id
    name
    budget
  }
`
export const PastCouncilBudgetSetEventFieldsFragmentDoc = gql`
  fragment PastCouncilBudgetSetEventFields on BudgetSetEvent {
    newBudget
    groupId
  }
`
export const PastCouncilRewardPaidEventFieldsFragmentDoc = gql`
  fragment PastCouncilRewardPaidEventFields on RewardPaidEvent {
    groupId
    amount
  }
`
export const PastCouncilNewMissedRewardLevelReachedEventFieldsFragmentDoc = gql`
  fragment PastCouncilNewMissedRewardLevelReachedEventFields on NewMissedRewardLevelReachedEvent {
    groupId
    workerId
    newMissedRewardAmount
  }
`
export const PastCouncilBudgetUpdatedEventFieldsFragmentDoc = gql`
  fragment PastCouncilBudgetUpdatedEventFields on BudgetUpdatedEvent {
    groupId
    budgetChangeAmount
  }
`
export const CouncilMemberFieldsFragmentDoc = gql`
  fragment CouncilMemberFields on CouncilMember {
    id
    member {
      ...MemberFields
      councilMembers {
        __typename
      }
    }
    unpaidReward
    stake
  }
  ${MemberFieldsFragmentDoc}
`
export const ElectedCouncilFieldsFragmentDoc = gql`
  fragment ElectedCouncilFields on ElectedCouncil {
    id
    electedAtBlock
    electedAtTime
    electedAtNetwork
    councilElections {
      cycleId
    }
    councilMembers {
      ...CouncilMemberFields
    }
  }
  ${CouncilMemberFieldsFragmentDoc}
`
export const PastCouncilFieldsFragmentDoc = gql`
  fragment PastCouncilFields on ElectedCouncil {
    id
    endedAtBlock
    endedAtNetwork
    endedAtTime
  }
`
export const PastCouncilDetailedFieldsFragmentDoc = gql`
  fragment PastCouncilDetailedFields on ElectedCouncil {
    ...PastCouncilFields
    councilMembers {
      accumulatedReward
      unpaidReward
    }
  }
  ${PastCouncilFieldsFragmentDoc}
`
export const ElectionCandidateFieldsFragmentDoc = gql`
  fragment ElectionCandidateFields on Candidate {
    id
    member {
      ...MemberFields
    }
    stake
    noteMetadata {
      header
      bulletPoints
      bannerImageUri
      description
    }
    status
    stakingAccountId
    votePower
    votesReceived {
      id
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const ElectionRoundFieldsFragmentDoc = gql`
  fragment ElectionRoundFields on ElectionRound {
    cycleId
    candidates {
      ...ElectionCandidateFields
    }
  }
  ${ElectionCandidateFieldsFragmentDoc}
`
export const LatestElectionRoundFieldsFragmentDoc = gql`
  fragment LatestElectionRoundFields on ElectionRound {
    ...ElectionRoundFields
    isFinished
  }
  ${ElectionRoundFieldsFragmentDoc}
`
export const PastElectionRoundFieldsFragmentDoc = gql`
  fragment PastElectionRoundFields on ElectionRound {
    id
    cycleId
    endedAtBlock
    endedAtTime
    endedAtNetwork
    candidates {
      stake
    }
    castVotes {
      voteForId
      stake
    }
  }
`
export const PastElectionRoundDetailedFieldsFragmentDoc = gql`
  fragment PastElectionRoundDetailedFields on ElectionRound {
    ...PastElectionRoundFields
    candidates {
      ...ElectionCandidateFields
    }
    castVotes {
      stake
      stakeLocked
      voteForId
      castBy
    }
  }
  ${PastElectionRoundFieldsFragmentDoc}
  ${ElectionCandidateFieldsFragmentDoc}
`
export const ElectionCandidateDetailedFieldsFragmentDoc = gql`
  fragment ElectionCandidateDetailedFields on Candidate {
    ...ElectionCandidateFields
    stakingAccountId
    rewardAccountId
    electionRound {
      cycleId
      isFinished
    }
  }
  ${ElectionCandidateFieldsFragmentDoc}
`
export const CastVoteFieldsFragmentDoc = gql`
  fragment CastVoteFields on CastVote {
    id
    stake
    stakeLocked
    castBy
    commitment
    voteFor {
      ...ElectionCandidateFields
    }
    electionRound {
      cycleId
      id
    }
    castEvent: votecasteventcastVote {
      inBlock
      network
      createdAt
    }
  }
  ${ElectionCandidateFieldsFragmentDoc}
`
export const CouncilSpendingEventFieldsFragmentDoc = gql`
  fragment CouncilSpendingEventFields on BudgetSpendingEvent {
    amount
    type
  }
`
export const FundingRequestApprovedFragmentDoc = gql`
  fragment FundingRequestApproved on ProposalExecutedEvent {
    proposal {
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
      }
    }
  }
`
export const GetElectedCouncilDocument = gql`
  query GetElectedCouncil {
    electedCouncils(where: { endedAtBlock_eq: null }, orderBy: [createdAt_DESC], limit: 1) {
      ...ElectedCouncilFields
    }
  }
  ${ElectedCouncilFieldsFragmentDoc}
`

/**
 * __useGetElectedCouncilQuery__
 *
 * To run a query within a React component, call `useGetElectedCouncilQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectedCouncilQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectedCouncilQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetElectedCouncilQuery(
  baseOptions?: Apollo.QueryHookOptions<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>(GetElectedCouncilDocument, options)
}
export function useGetElectedCouncilLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>(
    GetElectedCouncilDocument,
    options
  )
}
export type GetElectedCouncilQueryHookResult = ReturnType<typeof useGetElectedCouncilQuery>
export type GetElectedCouncilLazyQueryHookResult = ReturnType<typeof useGetElectedCouncilLazyQuery>
export type GetElectedCouncilQueryResult = Apollo.QueryResult<GetElectedCouncilQuery, GetElectedCouncilQueryVariables>
export const GetCouncilorVoterStakeDocument = gql`
  query GetCouncilorVoterStake($electionRound: ElectionRoundWhereInput!) {
    candidates(where: { electionRound: $electionRound, status_eq: ELECTED }) {
      memberId
      votesReceived {
        stake
      }
    }
  }
`

/**
 * __useGetCouncilorVoterStakeQuery__
 *
 * To run a query within a React component, call `useGetCouncilorVoterStakeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilorVoterStakeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilorVoterStakeQuery({
 *   variables: {
 *      electionRound: // value for 'electionRound'
 *   },
 * });
 */
export function useGetCouncilorVoterStakeQuery(
  baseOptions: Apollo.QueryHookOptions<GetCouncilorVoterStakeQuery, GetCouncilorVoterStakeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilorVoterStakeQuery, GetCouncilorVoterStakeQueryVariables>(
    GetCouncilorVoterStakeDocument,
    options
  )
}
export function useGetCouncilorVoterStakeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilorVoterStakeQuery, GetCouncilorVoterStakeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilorVoterStakeQuery, GetCouncilorVoterStakeQueryVariables>(
    GetCouncilorVoterStakeDocument,
    options
  )
}
export type GetCouncilorVoterStakeQueryHookResult = ReturnType<typeof useGetCouncilorVoterStakeQuery>
export type GetCouncilorVoterStakeLazyQueryHookResult = ReturnType<typeof useGetCouncilorVoterStakeLazyQuery>
export type GetCouncilorVoterStakeQueryResult = Apollo.QueryResult<
  GetCouncilorVoterStakeQuery,
  GetCouncilorVoterStakeQueryVariables
>
export const GetPastCouncilsDocument = gql`
  query GetPastCouncils($offset: Int, $limit: Int, $orderBy: [ElectedCouncilOrderByInput!]) {
    electedCouncils(where: { isResigned_eq: true }, offset: $offset, limit: $limit, orderBy: $orderBy) {
      ...PastCouncilFields
    }
  }
  ${PastCouncilFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilsQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPastCouncilsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>(GetPastCouncilsDocument, options)
}
export function useGetPastCouncilsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>(GetPastCouncilsDocument, options)
}
export type GetPastCouncilsQueryHookResult = ReturnType<typeof useGetPastCouncilsQuery>
export type GetPastCouncilsLazyQueryHookResult = ReturnType<typeof useGetPastCouncilsLazyQuery>
export type GetPastCouncilsQueryResult = Apollo.QueryResult<GetPastCouncilsQuery, GetPastCouncilsQueryVariables>
export const GetPastCouncilsCountDocument = gql`
  query GetPastCouncilsCount {
    electedCouncilsConnection(where: { isResigned_eq: true }) {
      totalCount
    }
  }
`

/**
 * __useGetPastCouncilsCountQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPastCouncilsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>(
    GetPastCouncilsCountDocument,
    options
  )
}
export function useGetPastCouncilsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilsCountQuery, GetPastCouncilsCountQueryVariables>(
    GetPastCouncilsCountDocument,
    options
  )
}
export type GetPastCouncilsCountQueryHookResult = ReturnType<typeof useGetPastCouncilsCountQuery>
export type GetPastCouncilsCountLazyQueryHookResult = ReturnType<typeof useGetPastCouncilsCountLazyQuery>
export type GetPastCouncilsCountQueryResult = Apollo.QueryResult<
  GetPastCouncilsCountQuery,
  GetPastCouncilsCountQueryVariables
>
export const GetPastCouncilDocument = gql`
  query GetPastCouncil($id: ID!, $fromBlock: Int!, $toBlock: Int!) {
    electedCouncilByUniqueInput(where: { id: $id }) {
      ...PastCouncilDetailedFields
    }
    budgetSpendingEvents(where: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock }) {
      ...CouncilSpendingEventFields
    }
    fundingRequestsApproved: proposalExecutedEvents(
      where: {
        inBlock_gt: $fromBlock
        inBlock_lt: $toBlock
        proposal: { details_json: { isTypeOf_eq: "FundingRequestProposalDetails" } }
      }
    ) {
      ...FundingRequestApproved
    }
  }
  ${PastCouncilDetailedFieldsFragmentDoc}
  ${CouncilSpendingEventFieldsFragmentDoc}
  ${FundingRequestApprovedFragmentDoc}
`

/**
 * __useGetPastCouncilQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilQuery({
 *   variables: {
 *      id: // value for 'id'
 *      fromBlock: // value for 'fromBlock'
 *      toBlock: // value for 'toBlock'
 *   },
 * });
 */
export function useGetPastCouncilQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastCouncilQuery, GetPastCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilQuery, GetPastCouncilQueryVariables>(GetPastCouncilDocument, options)
}
export function useGetPastCouncilLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilQuery, GetPastCouncilQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilQuery, GetPastCouncilQueryVariables>(GetPastCouncilDocument, options)
}
export type GetPastCouncilQueryHookResult = ReturnType<typeof useGetPastCouncilQuery>
export type GetPastCouncilLazyQueryHookResult = ReturnType<typeof useGetPastCouncilLazyQuery>
export type GetPastCouncilQueryResult = Apollo.QueryResult<GetPastCouncilQuery, GetPastCouncilQueryVariables>
export const GetPastCouncilMembersDocument = gql`
  query GetPastCouncilMembers($councilId: ID!, $fromBlock: Int!, $toBlock: Int!) {
    councilMembers(where: { electedInCouncil: { id_eq: $councilId } }) {
      member {
        ...MemberFields
      }
    }
    proposalVotedEvents(where: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock }, orderBy: [createdAt_DESC]) {
      ...PastCouncilProposalsFields
    }
  }
  ${MemberFieldsFragmentDoc}
  ${PastCouncilProposalsFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilMembersQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilMembersQuery({
 *   variables: {
 *      councilId: // value for 'councilId'
 *      fromBlock: // value for 'fromBlock'
 *      toBlock: // value for 'toBlock'
 *   },
 * });
 */
export function useGetPastCouncilMembersQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastCouncilMembersQuery, GetPastCouncilMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilMembersQuery, GetPastCouncilMembersQueryVariables>(
    GetPastCouncilMembersDocument,
    options
  )
}
export function useGetPastCouncilMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilMembersQuery, GetPastCouncilMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilMembersQuery, GetPastCouncilMembersQueryVariables>(
    GetPastCouncilMembersDocument,
    options
  )
}
export type GetPastCouncilMembersQueryHookResult = ReturnType<typeof useGetPastCouncilMembersQuery>
export type GetPastCouncilMembersLazyQueryHookResult = ReturnType<typeof useGetPastCouncilMembersLazyQuery>
export type GetPastCouncilMembersQueryResult = Apollo.QueryResult<
  GetPastCouncilMembersQuery,
  GetPastCouncilMembersQueryVariables
>
export const GetPastCouncilProposalsDocument = gql`
  query GetPastCouncilProposals($fromBlock: Int!, $toBlock: Int!) {
    proposals(
      where: { createdInEvent: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock } }
      orderBy: [createdAt_DESC]
    ) {
      ...ProposalFields
    }
  }
  ${ProposalFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilProposalsQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilProposalsQuery({
 *   variables: {
 *      fromBlock: // value for 'fromBlock'
 *      toBlock: // value for 'toBlock'
 *   },
 * });
 */
export function useGetPastCouncilProposalsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastCouncilProposalsQuery, GetPastCouncilProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilProposalsQuery, GetPastCouncilProposalsQueryVariables>(
    GetPastCouncilProposalsDocument,
    options
  )
}
export function useGetPastCouncilProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilProposalsQuery, GetPastCouncilProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilProposalsQuery, GetPastCouncilProposalsQueryVariables>(
    GetPastCouncilProposalsDocument,
    options
  )
}
export type GetPastCouncilProposalsQueryHookResult = ReturnType<typeof useGetPastCouncilProposalsQuery>
export type GetPastCouncilProposalsLazyQueryHookResult = ReturnType<typeof useGetPastCouncilProposalsLazyQuery>
export type GetPastCouncilProposalsQueryResult = Apollo.QueryResult<
  GetPastCouncilProposalsQuery,
  GetPastCouncilProposalsQueryVariables
>
export const GetPastCouncilWorkingGroupsDocument = gql`
  query GetPastCouncilWorkingGroups($fromBlock: Int!, $toBlock: Int!) {
    workingGroups {
      ...PastCouncilWorkingGroupFields
    }
    rewardPaidEvents(where: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock }) {
      ...PastCouncilRewardPaidEventFields
    }
    newMissedRewardLevelReachedEvents(where: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock }) {
      ...PastCouncilNewMissedRewardLevelReachedEventFields
    }
    budgetUpdatedEvents(where: { inBlock_gte: $fromBlock, inBlock_lte: $toBlock }) {
      ...PastCouncilBudgetUpdatedEventFields
    }
  }
  ${PastCouncilWorkingGroupFieldsFragmentDoc}
  ${PastCouncilRewardPaidEventFieldsFragmentDoc}
  ${PastCouncilNewMissedRewardLevelReachedEventFieldsFragmentDoc}
  ${PastCouncilBudgetUpdatedEventFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilWorkingGroupsQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilWorkingGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilWorkingGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilWorkingGroupsQuery({
 *   variables: {
 *      fromBlock: // value for 'fromBlock'
 *      toBlock: // value for 'toBlock'
 *   },
 * });
 */
export function useGetPastCouncilWorkingGroupsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastCouncilWorkingGroupsQuery, GetPastCouncilWorkingGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilWorkingGroupsQuery, GetPastCouncilWorkingGroupsQueryVariables>(
    GetPastCouncilWorkingGroupsDocument,
    options
  )
}
export function useGetPastCouncilWorkingGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilWorkingGroupsQuery, GetPastCouncilWorkingGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilWorkingGroupsQuery, GetPastCouncilWorkingGroupsQueryVariables>(
    GetPastCouncilWorkingGroupsDocument,
    options
  )
}
export type GetPastCouncilWorkingGroupsQueryHookResult = ReturnType<typeof useGetPastCouncilWorkingGroupsQuery>
export type GetPastCouncilWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetPastCouncilWorkingGroupsLazyQuery>
export type GetPastCouncilWorkingGroupsQueryResult = Apollo.QueryResult<
  GetPastCouncilWorkingGroupsQuery,
  GetPastCouncilWorkingGroupsQueryVariables
>
export const GetCurrentElectionDocument = gql`
  query GetCurrentElection {
    electionRounds(where: { isFinished_eq: false }, orderBy: [cycleId_DESC], limit: 1) {
      ...ElectionRoundFields
    }
  }
  ${ElectionRoundFieldsFragmentDoc}
`

/**
 * __useGetCurrentElectionQuery__
 *
 * To run a query within a React component, call `useGetCurrentElectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentElectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentElectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentElectionQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>(GetCurrentElectionDocument, options)
}
export function useGetCurrentElectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>(
    GetCurrentElectionDocument,
    options
  )
}
export type GetCurrentElectionQueryHookResult = ReturnType<typeof useGetCurrentElectionQuery>
export type GetCurrentElectionLazyQueryHookResult = ReturnType<typeof useGetCurrentElectionLazyQuery>
export type GetCurrentElectionQueryResult = Apollo.QueryResult<
  GetCurrentElectionQuery,
  GetCurrentElectionQueryVariables
>
export const GetLatestElectionDocument = gql`
  query GetLatestElection {
    electionRounds(orderBy: [cycleId_DESC], limit: 1) {
      ...LatestElectionRoundFields
    }
  }
  ${LatestElectionRoundFieldsFragmentDoc}
`

/**
 * __useGetLatestElectionQuery__
 *
 * To run a query within a React component, call `useGetLatestElectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestElectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestElectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestElectionQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLatestElectionQuery, GetLatestElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLatestElectionQuery, GetLatestElectionQueryVariables>(GetLatestElectionDocument, options)
}
export function useGetLatestElectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLatestElectionQuery, GetLatestElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLatestElectionQuery, GetLatestElectionQueryVariables>(
    GetLatestElectionDocument,
    options
  )
}
export type GetLatestElectionQueryHookResult = ReturnType<typeof useGetLatestElectionQuery>
export type GetLatestElectionLazyQueryHookResult = ReturnType<typeof useGetLatestElectionLazyQuery>
export type GetLatestElectionQueryResult = Apollo.QueryResult<GetLatestElectionQuery, GetLatestElectionQueryVariables>
export const GetPastElectionsDocument = gql`
  query GetPastElections($offset: Int, $limit: Int, $orderBy: [ElectionRoundOrderByInput!]) {
    electionRounds(where: { isFinished_eq: true }, offset: $offset, limit: $limit, orderBy: $orderBy) {
      ...PastElectionRoundFields
    }
  }
  ${PastElectionRoundFieldsFragmentDoc}
`

/**
 * __useGetPastElectionsQuery__
 *
 * To run a query within a React component, call `useGetPastElectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastElectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastElectionsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPastElectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastElectionsQuery, GetPastElectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastElectionsQuery, GetPastElectionsQueryVariables>(GetPastElectionsDocument, options)
}
export function useGetPastElectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastElectionsQuery, GetPastElectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastElectionsQuery, GetPastElectionsQueryVariables>(GetPastElectionsDocument, options)
}
export type GetPastElectionsQueryHookResult = ReturnType<typeof useGetPastElectionsQuery>
export type GetPastElectionsLazyQueryHookResult = ReturnType<typeof useGetPastElectionsLazyQuery>
export type GetPastElectionsQueryResult = Apollo.QueryResult<GetPastElectionsQuery, GetPastElectionsQueryVariables>
export const GetPastElectionsCountDocument = gql`
  query GetPastElectionsCount {
    electionRoundsConnection(where: { isFinished_eq: true }) {
      totalCount
    }
  }
`

/**
 * __useGetPastElectionsCountQuery__
 *
 * To run a query within a React component, call `useGetPastElectionsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastElectionsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastElectionsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPastElectionsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>(
    GetPastElectionsCountDocument,
    options
  )
}
export function useGetPastElectionsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastElectionsCountQuery, GetPastElectionsCountQueryVariables>(
    GetPastElectionsCountDocument,
    options
  )
}
export type GetPastElectionsCountQueryHookResult = ReturnType<typeof useGetPastElectionsCountQuery>
export type GetPastElectionsCountLazyQueryHookResult = ReturnType<typeof useGetPastElectionsCountLazyQuery>
export type GetPastElectionsCountQueryResult = Apollo.QueryResult<
  GetPastElectionsCountQuery,
  GetPastElectionsCountQueryVariables
>
export const GetPastElectionDocument = gql`
  query GetPastElection($id: ID!) {
    electionRoundByUniqueInput(where: { id: $id }) {
      ...PastElectionRoundDetailedFields
    }
  }
  ${PastElectionRoundDetailedFieldsFragmentDoc}
`

/**
 * __useGetPastElectionQuery__
 *
 * To run a query within a React component, call `useGetPastElectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastElectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastElectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPastElectionQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastElectionQuery, GetPastElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastElectionQuery, GetPastElectionQueryVariables>(GetPastElectionDocument, options)
}
export function useGetPastElectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastElectionQuery, GetPastElectionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastElectionQuery, GetPastElectionQueryVariables>(GetPastElectionDocument, options)
}
export type GetPastElectionQueryHookResult = ReturnType<typeof useGetPastElectionQuery>
export type GetPastElectionLazyQueryHookResult = ReturnType<typeof useGetPastElectionLazyQuery>
export type GetPastElectionQueryResult = Apollo.QueryResult<GetPastElectionQuery, GetPastElectionQueryVariables>
export const GetCandidateDocument = gql`
  query GetCandidate($where: CandidateWhereUniqueInput!) {
    candidateByUniqueInput(where: $where) {
      ...ElectionCandidateDetailedFields
    }
  }
  ${ElectionCandidateDetailedFieldsFragmentDoc}
`

/**
 * __useGetCandidateQuery__
 *
 * To run a query within a React component, call `useGetCandidateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCandidateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCandidateQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCandidateQuery(
  baseOptions: Apollo.QueryHookOptions<GetCandidateQuery, GetCandidateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCandidateQuery, GetCandidateQueryVariables>(GetCandidateDocument, options)
}
export function useGetCandidateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCandidateQuery, GetCandidateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCandidateQuery, GetCandidateQueryVariables>(GetCandidateDocument, options)
}
export type GetCandidateQueryHookResult = ReturnType<typeof useGetCandidateQuery>
export type GetCandidateLazyQueryHookResult = ReturnType<typeof useGetCandidateLazyQuery>
export type GetCandidateQueryResult = Apollo.QueryResult<GetCandidateQuery, GetCandidateQueryVariables>
export const GetElectionCandidatesIdsDocument = gql`
  query GetElectionCandidatesIds($electionCycleId: Int!) {
    candidates(where: { electionRound: { cycleId_eq: $electionCycleId } }) {
      id
    }
  }
`

/**
 * __useGetElectionCandidatesIdsQuery__
 *
 * To run a query within a React component, call `useGetElectionCandidatesIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectionCandidatesIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectionCandidatesIdsQuery({
 *   variables: {
 *      electionCycleId: // value for 'electionCycleId'
 *   },
 * });
 */
export function useGetElectionCandidatesIdsQuery(
  baseOptions: Apollo.QueryHookOptions<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>(
    GetElectionCandidatesIdsDocument,
    options
  )
}
export function useGetElectionCandidatesIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectionCandidatesIdsQuery, GetElectionCandidatesIdsQueryVariables>(
    GetElectionCandidatesIdsDocument,
    options
  )
}
export type GetElectionCandidatesIdsQueryHookResult = ReturnType<typeof useGetElectionCandidatesIdsQuery>
export type GetElectionCandidatesIdsLazyQueryHookResult = ReturnType<typeof useGetElectionCandidatesIdsLazyQuery>
export type GetElectionCandidatesIdsQueryResult = Apollo.QueryResult<
  GetElectionCandidatesIdsQuery,
  GetElectionCandidatesIdsQueryVariables
>
export const GetCurrentCandidateIdByMemberDocument = gql`
  query GetCurrentCandidateIdByMember($memberId: ID!) {
    candidates(where: { member: { id_eq: $memberId } }, limit: 1) {
      id
    }
  }
`

/**
 * __useGetCurrentCandidateIdByMemberQuery__
 *
 * To run a query within a React component, call `useGetCurrentCandidateIdByMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentCandidateIdByMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentCandidateIdByMemberQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetCurrentCandidateIdByMemberQuery(
  baseOptions: Apollo.QueryHookOptions<GetCurrentCandidateIdByMemberQuery, GetCurrentCandidateIdByMemberQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentCandidateIdByMemberQuery, GetCurrentCandidateIdByMemberQueryVariables>(
    GetCurrentCandidateIdByMemberDocument,
    options
  )
}
export function useGetCurrentCandidateIdByMemberLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentCandidateIdByMemberQuery,
    GetCurrentCandidateIdByMemberQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentCandidateIdByMemberQuery, GetCurrentCandidateIdByMemberQueryVariables>(
    GetCurrentCandidateIdByMemberDocument,
    options
  )
}
export type GetCurrentCandidateIdByMemberQueryHookResult = ReturnType<typeof useGetCurrentCandidateIdByMemberQuery>
export type GetCurrentCandidateIdByMemberLazyQueryHookResult = ReturnType<
  typeof useGetCurrentCandidateIdByMemberLazyQuery
>
export type GetCurrentCandidateIdByMemberQueryResult = Apollo.QueryResult<
  GetCurrentCandidateIdByMemberQuery,
  GetCurrentCandidateIdByMemberQueryVariables
>
export const GetCandidateStatsDocument = gql`
  query GetCandidateStats($memberId: ID) {
    withdrawn: candidatesConnection(where: { member: { id_eq: $memberId }, status_eq: WITHDRAWN }) {
      totalCount
    }
    successful: candidatesConnection(where: { member: { id_eq: $memberId }, status_eq: ELECTED }) {
      totalCount
    }
    failed: candidatesConnection(where: { member: { id_eq: $memberId }, status_eq: FAILED }) {
      totalCount
    }
  }
`

/**
 * __useGetCandidateStatsQuery__
 *
 * To run a query within a React component, call `useGetCandidateStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCandidateStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCandidateStatsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetCandidateStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>(GetCandidateStatsDocument, options)
}
export function useGetCandidateStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>(
    GetCandidateStatsDocument,
    options
  )
}
export type GetCandidateStatsQueryHookResult = ReturnType<typeof useGetCandidateStatsQuery>
export type GetCandidateStatsLazyQueryHookResult = ReturnType<typeof useGetCandidateStatsLazyQuery>
export type GetCandidateStatsQueryResult = Apollo.QueryResult<GetCandidateStatsQuery, GetCandidateStatsQueryVariables>
export const GetCouncilVotesDocument = gql`
  query GetCouncilVotes($where: CastVoteWhereInput, $orderBy: [CastVoteOrderByInput!], $limit: Int, $offset: Int) {
    castVotes(where: $where, orderBy: $orderBy, limit: $limit, offset: $offset) {
      ...CastVoteFields
    }
  }
  ${CastVoteFieldsFragmentDoc}
`

/**
 * __useGetCouncilVotesQuery__
 *
 * To run a query within a React component, call `useGetCouncilVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilVotesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetCouncilVotesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>(GetCouncilVotesDocument, options)
}
export function useGetCouncilVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>(GetCouncilVotesDocument, options)
}
export type GetCouncilVotesQueryHookResult = ReturnType<typeof useGetCouncilVotesQuery>
export type GetCouncilVotesLazyQueryHookResult = ReturnType<typeof useGetCouncilVotesLazyQuery>
export type GetCouncilVotesQueryResult = Apollo.QueryResult<GetCouncilVotesQuery, GetCouncilVotesQueryVariables>
export const GetCouncilVotesCommitmentsDocument = gql`
  query GetCouncilVotesCommitments($where: CastVoteWhereInput, $orderBy: [CastVoteOrderByInput!]) {
    castVotes(where: $where, orderBy: $orderBy) {
      commitment
    }
  }
`

/**
 * __useGetCouncilVotesCommitmentsQuery__
 *
 * To run a query within a React component, call `useGetCouncilVotesCommitmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilVotesCommitmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilVotesCommitmentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCouncilVotesCommitmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>(
    GetCouncilVotesCommitmentsDocument,
    options
  )
}
export function useGetCouncilVotesCommitmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilVotesCommitmentsQuery, GetCouncilVotesCommitmentsQueryVariables>(
    GetCouncilVotesCommitmentsDocument,
    options
  )
}
export type GetCouncilVotesCommitmentsQueryHookResult = ReturnType<typeof useGetCouncilVotesCommitmentsQuery>
export type GetCouncilVotesCommitmentsLazyQueryHookResult = ReturnType<typeof useGetCouncilVotesCommitmentsLazyQuery>
export type GetCouncilVotesCommitmentsQueryResult = Apollo.QueryResult<
  GetCouncilVotesCommitmentsQuery,
  GetCouncilVotesCommitmentsQueryVariables
>
export const GetCouncilVotesCountDocument = gql`
  query GetCouncilVotesCount($where: CastVoteWhereInput) {
    castVotesConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetCouncilVotesCountQuery__
 *
 * To run a query within a React component, call `useGetCouncilVotesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilVotesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilVotesCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCouncilVotesCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>(
    GetCouncilVotesCountDocument,
    options
  )
}
export function useGetCouncilVotesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilVotesCountQuery, GetCouncilVotesCountQueryVariables>(
    GetCouncilVotesCountDocument,
    options
  )
}
export type GetCouncilVotesCountQueryHookResult = ReturnType<typeof useGetCouncilVotesCountQuery>
export type GetCouncilVotesCountLazyQueryHookResult = ReturnType<typeof useGetCouncilVotesCountLazyQuery>
export type GetCouncilVotesCountQueryResult = Apollo.QueryResult<
  GetCouncilVotesCountQuery,
  GetCouncilVotesCountQueryVariables
>
export const GetPastVotesResultsDocument = gql`
  query GetPastVotesResults($myAccounts: [String!]) {
    electionRounds(where: { isFinished_eq: true, castVotes_some: { castBy_in: $myAccounts } }) {
      id
      electedCouncil {
        councilMembers {
          member {
            id
          }
        }
      }
    }
    castVotes(where: { castBy_in: $myAccounts }) {
      voteFor {
        id
      }
      electionRound {
        id
      }
    }
  }
`

/**
 * __useGetPastVotesResultsQuery__
 *
 * To run a query within a React component, call `useGetPastVotesResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastVotesResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastVotesResultsQuery({
 *   variables: {
 *      myAccounts: // value for 'myAccounts'
 *   },
 * });
 */
export function useGetPastVotesResultsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>(
    GetPastVotesResultsDocument,
    options
  )
}
export function useGetPastVotesResultsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastVotesResultsQuery, GetPastVotesResultsQueryVariables>(
    GetPastVotesResultsDocument,
    options
  )
}
export type GetPastVotesResultsQueryHookResult = ReturnType<typeof useGetPastVotesResultsQuery>
export type GetPastVotesResultsLazyQueryHookResult = ReturnType<typeof useGetPastVotesResultsLazyQuery>
export type GetPastVotesResultsQueryResult = Apollo.QueryResult<
  GetPastVotesResultsQuery,
  GetPastVotesResultsQueryVariables
>
export const GetCouncilBlockRangeDocument = gql`
  query GetCouncilBlockRange($where: ElectedCouncilWhereUniqueInput!) {
    electedCouncilByUniqueInput(where: $where) {
      electedAtBlock
      endedAtBlock
    }
  }
`

/**
 * __useGetCouncilBlockRangeQuery__
 *
 * To run a query within a React component, call `useGetCouncilBlockRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilBlockRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilBlockRangeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCouncilBlockRangeQuery(
  baseOptions: Apollo.QueryHookOptions<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>(
    GetCouncilBlockRangeDocument,
    options
  )
}
export function useGetCouncilBlockRangeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilBlockRangeQuery, GetCouncilBlockRangeQueryVariables>(
    GetCouncilBlockRangeDocument,
    options
  )
}
export type GetCouncilBlockRangeQueryHookResult = ReturnType<typeof useGetCouncilBlockRangeQuery>
export type GetCouncilBlockRangeLazyQueryHookResult = ReturnType<typeof useGetCouncilBlockRangeLazyQuery>
export type GetCouncilBlockRangeQueryResult = Apollo.QueryResult<
  GetCouncilBlockRangeQuery,
  GetCouncilBlockRangeQueryVariables
>
export const GetPastCouncilStatsDocument = gql`
  query GetPastCouncilStats($startBlock: Int!, $endBlock: Int!) {
    proposalsApproved: proposalExecutedEventsConnection(where: { inBlock_gt: $startBlock, inBlock_lt: $endBlock }) {
      totalCount
    }
    fundingRequestsApproved: proposalExecutedEvents(
      where: {
        inBlock_gt: $startBlock
        inBlock_lt: $endBlock
        proposal: { details_json: { isTypeOf_eq: "FundingRequestProposalDetails" } }
      }
    ) {
      ...FundingRequestApproved
    }
    proposalsRejected: proposalDecisionMadeEventsConnection(
      where: {
        inBlock_gt: $startBlock
        inBlock_lt: $endBlock
        decisionStatus_json: { isTypeOf_eq: "ProposalStatusRejected" }
      }
    ) {
      totalCount
    }
    proposalsSlashed: proposalDecisionMadeEventsConnection(
      where: {
        inBlock_gt: $startBlock
        inBlock_lt: $endBlock
        decisionStatus_json: { isTypeOf_eq: "ProposalStatusSlashed" }
      }
    ) {
      totalCount
    }
    budgetSpendingEvents(where: { inBlock_gte: $startBlock, inBlock_lte: $endBlock }) {
      ...CouncilSpendingEventFields
    }
  }
  ${FundingRequestApprovedFragmentDoc}
  ${CouncilSpendingEventFieldsFragmentDoc}
`

/**
 * __useGetPastCouncilStatsQuery__
 *
 * To run a query within a React component, call `useGetPastCouncilStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCouncilStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCouncilStatsQuery({
 *   variables: {
 *      startBlock: // value for 'startBlock'
 *      endBlock: // value for 'endBlock'
 *   },
 * });
 */
export function useGetPastCouncilStatsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPastCouncilStatsQuery, GetPastCouncilStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPastCouncilStatsQuery, GetPastCouncilStatsQueryVariables>(
    GetPastCouncilStatsDocument,
    options
  )
}
export function useGetPastCouncilStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPastCouncilStatsQuery, GetPastCouncilStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPastCouncilStatsQuery, GetPastCouncilStatsQueryVariables>(
    GetPastCouncilStatsDocument,
    options
  )
}
export type GetPastCouncilStatsQueryHookResult = ReturnType<typeof useGetPastCouncilStatsQuery>
export type GetPastCouncilStatsLazyQueryHookResult = ReturnType<typeof useGetPastCouncilStatsLazyQuery>
export type GetPastCouncilStatsQueryResult = Apollo.QueryResult<
  GetPastCouncilStatsQuery,
  GetPastCouncilStatsQueryVariables
>
export const GetCouncilorElectionEventDocument = gql`
  query GetCouncilorElectionEvent($lockAccount: String) {
    councilMembers(where: { stakingAccountId_eq: $lockAccount }, orderBy: [createdAt_DESC], limit: 1) {
      electedInCouncil {
        id
        electedAtBlock
        electedAtTime
        electedAtNetwork
      }
    }
  }
`

/**
 * __useGetCouncilorElectionEventQuery__
 *
 * To run a query within a React component, call `useGetCouncilorElectionEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouncilorElectionEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouncilorElectionEventQuery({
 *   variables: {
 *      lockAccount: // value for 'lockAccount'
 *   },
 * });
 */
export function useGetCouncilorElectionEventQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCouncilorElectionEventQuery, GetCouncilorElectionEventQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilorElectionEventQuery, GetCouncilorElectionEventQueryVariables>(
    GetCouncilorElectionEventDocument,
    options
  )
}
export function useGetCouncilorElectionEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilorElectionEventQuery, GetCouncilorElectionEventQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilorElectionEventQuery, GetCouncilorElectionEventQueryVariables>(
    GetCouncilorElectionEventDocument,
    options
  )
}
export type GetCouncilorElectionEventQueryHookResult = ReturnType<typeof useGetCouncilorElectionEventQuery>
export type GetCouncilorElectionEventLazyQueryHookResult = ReturnType<typeof useGetCouncilorElectionEventLazyQuery>
export type GetCouncilorElectionEventQueryResult = Apollo.QueryResult<
  GetCouncilorElectionEventQuery,
  GetCouncilorElectionEventQueryVariables
>
