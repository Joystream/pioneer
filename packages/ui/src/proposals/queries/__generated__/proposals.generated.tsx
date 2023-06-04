import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type WorkerProposalDetailsFragment = {
  __typename: 'Worker'
  group: { __typename: 'WorkingGroup'; id: string; name: string }
  membership: {
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

export type ProposalFieldsFragment = {
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

export type VoteFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  id: string
  voteKind: Types.ProposalVoteKind
  votingRound: number
  voter: {
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

export type VoteWithDetailsFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  rationale: string
  inBlock: number
  createdAt: any
  network: Types.Network
  proposalId: string
  id: string
  voteKind: Types.ProposalVoteKind
  votingRound: number
  voter: {
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

export type ProposalWithDetailsFieldsFragment = {
  __typename: 'Proposal'
  stakingAccount?: string | null
  description: string
  statusSetAtBlock: number
  id: string
  title: string
  statusSetAtTime: any
  createdAt: any
  councilApprovals: number
  exactExecutionBlock?: number | null
  votes: Array<{
    __typename: 'ProposalVotedEvent'
    id: string
    voteKind: Types.ProposalVoteKind
    votingRound: number
    voter: {
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
  createdInEvent: { __typename: 'ProposalCreatedEvent'; inBlock: number; createdAt: any; network: Types.Network }
  proposalStatusUpdates: Array<{
    __typename: 'ProposalStatusUpdatedEvent'
    inBlock: number
    createdAt: any
    network: Types.Network
    newStatus:
      | { __typename: 'ProposalStatusDeciding' }
      | { __typename: 'ProposalStatusDormant' }
      | { __typename: 'ProposalStatusGracing' }
  }>
  details:
    | { __typename: 'AmendConstitutionProposalDetails' }
    | {
        __typename: 'CancelWorkingGroupLeadOpeningProposalDetails'
        opening?: {
          __typename: 'WorkingGroupOpening'
          id: string
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          metadata: { __typename: 'WorkingGroupOpeningMetadata'; description?: string | null }
        } | null
      }
    | {
        __typename: 'CreateWorkingGroupLeadOpeningProposalDetails'
        stakeAmount: string
        unstakingPeriod: number
        rewardPerBlock: string
        metadata?: { __typename: 'WorkingGroupOpeningMetadata'; description?: string | null } | null
        group?: { __typename: 'WorkingGroup'; id: string; name: string } | null
      }
    | {
        __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails'
        amount: string
        lead?: {
          __typename: 'Worker'
          createdAt: any
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          membership: {
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
        } | null
      }
    | {
        __typename: 'FillWorkingGroupLeadOpeningProposalDetails'
        opening?: {
          __typename: 'WorkingGroupOpening'
          id: string
          group: { __typename: 'WorkingGroup'; id: string; name: string }
        } | null
        application?: {
          __typename: 'WorkingGroupApplication'
          applicant: {
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
        } | null
      }
    | {
        __typename: 'FundingRequestProposalDetails'
        destinationsList?: {
          __typename: 'FundingRequestDestinationsList'
          destinations: Array<{ __typename: 'FundingRequestDestination'; amount: string; account: string }>
        } | null
      }
    | {
        __typename: 'RuntimeUpgradeProposalDetails'
        newRuntimeBytecode?: { __typename: 'RuntimeWasmBytecode'; id: string } | null
      }
    | { __typename: 'SetCouncilBudgetIncrementProposalDetails'; newAmount: string }
    | { __typename: 'SetCouncilorRewardProposalDetails'; newRewardPerBlock: string }
    | { __typename: 'SetInitialInvitationBalanceProposalDetails'; newInitialInvitationBalance: string }
    | { __typename: 'SetInitialInvitationCountProposalDetails'; newInitialInvitationsCount: number }
    | { __typename: 'SetMaxValidatorCountProposalDetails'; newMaxValidatorCount: number }
    | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails'; newLeadInvitationQuota: number }
    | { __typename: 'SetMembershipPriceProposalDetails'; newPrice: string }
    | { __typename: 'SetReferralCutProposalDetails'; newReferralCut: number }
    | {
        __typename: 'SetWorkingGroupLeadRewardProposalDetails'
        newRewardPerBlock: string
        lead?: {
          __typename: 'Worker'
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          membership: {
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
        } | null
      }
    | { __typename: 'SignalProposalDetails'; text: string }
    | {
        __typename: 'SlashWorkingGroupLeadProposalDetails'
        amount: string
        lead?: {
          __typename: 'Worker'
          createdAt: any
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          membership: {
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
        } | null
      }
    | {
        __typename: 'TerminateWorkingGroupLeadProposalDetails'
        slashingAmount?: string | null
        lead?: {
          __typename: 'Worker'
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          membership: {
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
        } | null
      }
    | {
        __typename: 'UpdateChannelPayoutsProposalDetails'
        channelCashoutsEnabled?: boolean | null
        minCashoutAllowed?: string | null
        maxCashoutAllowed?: string | null
        payloadHash?: string | null
      }
    | {
        __typename: 'UpdateWorkingGroupBudgetProposalDetails'
        amount: string
        group?: { __typename: 'WorkingGroup'; id: string; name: string } | null
      }
    | { __typename: 'VetoProposalDetails'; proposal?: { __typename: 'Proposal'; id: string; title: string } | null }
  discussionThread: {
    __typename: 'ProposalDiscussionThread'
    id: string
    posts: Array<{
      __typename: 'ProposalDiscussionPost'
      id: string
      createdAt: any
      updatedAt?: any | null
      text: string
      repliesTo?: {
        __typename: 'ProposalDiscussionPost'
        id: string
        createdAt: any
        updatedAt?: any | null
        text: string
        createdInEvent: {
          __typename: 'ProposalDiscussionPostCreatedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        }
        author: {
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
        status:
          | { __typename: 'ProposalDiscussionPostStatusActive' }
          | { __typename: 'ProposalDiscussionPostStatusLocked' }
          | { __typename: 'ProposalDiscussionPostStatusRemoved' }
        discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
      } | null
      createdInEvent: {
        __typename: 'ProposalDiscussionPostCreatedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
      }
      author: {
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
      status:
        | { __typename: 'ProposalDiscussionPostStatusActive' }
        | { __typename: 'ProposalDiscussionPostStatusLocked' }
        | { __typename: 'ProposalDiscussionPostStatusRemoved' }
      discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
    }>
    mode:
      | {
          __typename: 'ProposalDiscussionThreadModeClosed'
          whitelist?: {
            __typename: 'ProposalDiscussionWhitelist'
            members: Array<{ __typename: 'Membership'; id: string }>
          } | null
        }
      | { __typename: 'ProposalDiscussionThreadModeOpen' }
  }
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

export type DiscussionPostFieldsFragment = {
  __typename: 'ProposalDiscussionPost'
  id: string
  createdAt: any
  updatedAt?: any | null
  text: string
  repliesTo?: {
    __typename: 'ProposalDiscussionPost'
    id: string
    createdAt: any
    updatedAt?: any | null
    text: string
    createdInEvent: {
      __typename: 'ProposalDiscussionPostCreatedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
    }
    author: {
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
    status:
      | { __typename: 'ProposalDiscussionPostStatusActive' }
      | { __typename: 'ProposalDiscussionPostStatusLocked' }
      | { __typename: 'ProposalDiscussionPostStatusRemoved' }
    discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
  } | null
  createdInEvent: {
    __typename: 'ProposalDiscussionPostCreatedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
  }
  author: {
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
  status:
    | { __typename: 'ProposalDiscussionPostStatusActive' }
    | { __typename: 'ProposalDiscussionPostStatusLocked' }
    | { __typename: 'ProposalDiscussionPostStatusRemoved' }
  discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
}

export type DiscussionPostWithoutReplyFieldsFragment = {
  __typename: 'ProposalDiscussionPost'
  id: string
  createdAt: any
  updatedAt?: any | null
  text: string
  createdInEvent: {
    __typename: 'ProposalDiscussionPostCreatedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
  }
  author: {
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
  status:
    | { __typename: 'ProposalDiscussionPostStatusActive' }
    | { __typename: 'ProposalDiscussionPostStatusLocked' }
    | { __typename: 'ProposalDiscussionPostStatusRemoved' }
  discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
}

export type ProposalPostParentsFragment = { __typename: 'ProposalDiscussionPost'; discussionThreadId: string }

export type ProposalMentionFieldsFragment = {
  __typename: 'Proposal'
  id: string
  title: string
  description: string
  exactExecutionBlock?: number | null
  statusSetAtBlock: number
  statusSetAtTime: any
  createdAt: any
  createdInEvent: { __typename: 'ProposalCreatedEvent'; network: Types.Network }
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
}

export type ProposalDiscussionPostMentionFieldsFragment = {
  __typename: 'ProposalDiscussionPost'
  id: string
  text: string
  createdAt: any
  author: {
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

export type GetProposalsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.ProposalOrderByInput> | Types.ProposalOrderByInput>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetProposalsQuery = {
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

export type GetProposalsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalWhereInput>
}>

export type GetProposalsCountQuery = {
  __typename: 'Query'
  proposalsConnection: { __typename: 'ProposalConnection'; totalCount: number }
}

export type GetProposalQueryVariables = Types.Exact<{
  where: Types.ProposalWhereUniqueInput
}>

export type GetProposalQuery = {
  __typename: 'Query'
  proposal?: {
    __typename: 'Proposal'
    stakingAccount?: string | null
    description: string
    statusSetAtBlock: number
    id: string
    title: string
    statusSetAtTime: any
    createdAt: any
    councilApprovals: number
    exactExecutionBlock?: number | null
    votes: Array<{
      __typename: 'ProposalVotedEvent'
      id: string
      voteKind: Types.ProposalVoteKind
      votingRound: number
      voter: {
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
    createdInEvent: { __typename: 'ProposalCreatedEvent'; inBlock: number; createdAt: any; network: Types.Network }
    proposalStatusUpdates: Array<{
      __typename: 'ProposalStatusUpdatedEvent'
      inBlock: number
      createdAt: any
      network: Types.Network
      newStatus:
        | { __typename: 'ProposalStatusDeciding' }
        | { __typename: 'ProposalStatusDormant' }
        | { __typename: 'ProposalStatusGracing' }
    }>
    details:
      | { __typename: 'AmendConstitutionProposalDetails' }
      | {
          __typename: 'CancelWorkingGroupLeadOpeningProposalDetails'
          opening?: {
            __typename: 'WorkingGroupOpening'
            id: string
            group: { __typename: 'WorkingGroup'; id: string; name: string }
            metadata: { __typename: 'WorkingGroupOpeningMetadata'; description?: string | null }
          } | null
        }
      | {
          __typename: 'CreateWorkingGroupLeadOpeningProposalDetails'
          stakeAmount: string
          unstakingPeriod: number
          rewardPerBlock: string
          metadata?: { __typename: 'WorkingGroupOpeningMetadata'; description?: string | null } | null
          group?: { __typename: 'WorkingGroup'; id: string; name: string } | null
        }
      | {
          __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails'
          amount: string
          lead?: {
            __typename: 'Worker'
            createdAt: any
            group: { __typename: 'WorkingGroup'; id: string; name: string }
            membership: {
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
          } | null
        }
      | {
          __typename: 'FillWorkingGroupLeadOpeningProposalDetails'
          opening?: {
            __typename: 'WorkingGroupOpening'
            id: string
            group: { __typename: 'WorkingGroup'; id: string; name: string }
          } | null
          application?: {
            __typename: 'WorkingGroupApplication'
            applicant: {
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
          } | null
        }
      | {
          __typename: 'FundingRequestProposalDetails'
          destinationsList?: {
            __typename: 'FundingRequestDestinationsList'
            destinations: Array<{ __typename: 'FundingRequestDestination'; amount: string; account: string }>
          } | null
        }
      | {
          __typename: 'RuntimeUpgradeProposalDetails'
          newRuntimeBytecode?: { __typename: 'RuntimeWasmBytecode'; id: string } | null
        }
      | { __typename: 'SetCouncilBudgetIncrementProposalDetails'; newAmount: string }
      | { __typename: 'SetCouncilorRewardProposalDetails'; newRewardPerBlock: string }
      | { __typename: 'SetInitialInvitationBalanceProposalDetails'; newInitialInvitationBalance: string }
      | { __typename: 'SetInitialInvitationCountProposalDetails'; newInitialInvitationsCount: number }
      | { __typename: 'SetMaxValidatorCountProposalDetails'; newMaxValidatorCount: number }
      | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails'; newLeadInvitationQuota: number }
      | { __typename: 'SetMembershipPriceProposalDetails'; newPrice: string }
      | { __typename: 'SetReferralCutProposalDetails'; newReferralCut: number }
      | {
          __typename: 'SetWorkingGroupLeadRewardProposalDetails'
          newRewardPerBlock: string
          lead?: {
            __typename: 'Worker'
            group: { __typename: 'WorkingGroup'; id: string; name: string }
            membership: {
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
          } | null
        }
      | { __typename: 'SignalProposalDetails'; text: string }
      | {
          __typename: 'SlashWorkingGroupLeadProposalDetails'
          amount: string
          lead?: {
            __typename: 'Worker'
            createdAt: any
            group: { __typename: 'WorkingGroup'; id: string; name: string }
            membership: {
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
          } | null
        }
      | {
          __typename: 'TerminateWorkingGroupLeadProposalDetails'
          slashingAmount?: string | null
          lead?: {
            __typename: 'Worker'
            group: { __typename: 'WorkingGroup'; id: string; name: string }
            membership: {
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
          } | null
        }
      | {
          __typename: 'UpdateChannelPayoutsProposalDetails'
          channelCashoutsEnabled?: boolean | null
          minCashoutAllowed?: string | null
          maxCashoutAllowed?: string | null
          payloadHash?: string | null
        }
      | {
          __typename: 'UpdateWorkingGroupBudgetProposalDetails'
          amount: string
          group?: { __typename: 'WorkingGroup'; id: string; name: string } | null
        }
      | { __typename: 'VetoProposalDetails'; proposal?: { __typename: 'Proposal'; id: string; title: string } | null }
    discussionThread: {
      __typename: 'ProposalDiscussionThread'
      id: string
      posts: Array<{
        __typename: 'ProposalDiscussionPost'
        id: string
        createdAt: any
        updatedAt?: any | null
        text: string
        repliesTo?: {
          __typename: 'ProposalDiscussionPost'
          id: string
          createdAt: any
          updatedAt?: any | null
          text: string
          createdInEvent: {
            __typename: 'ProposalDiscussionPostCreatedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          }
          author: {
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
          status:
            | { __typename: 'ProposalDiscussionPostStatusActive' }
            | { __typename: 'ProposalDiscussionPostStatusLocked' }
            | { __typename: 'ProposalDiscussionPostStatusRemoved' }
          discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
        } | null
        createdInEvent: {
          __typename: 'ProposalDiscussionPostCreatedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        }
        author: {
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
        status:
          | { __typename: 'ProposalDiscussionPostStatusActive' }
          | { __typename: 'ProposalDiscussionPostStatusLocked' }
          | { __typename: 'ProposalDiscussionPostStatusRemoved' }
        discussionThread: { __typename: 'ProposalDiscussionThread'; id: string }
      }>
      mode:
        | {
            __typename: 'ProposalDiscussionThreadModeClosed'
            whitelist?: {
              __typename: 'ProposalDiscussionWhitelist'
              members: Array<{ __typename: 'Membership'; id: string }>
            } | null
          }
        | { __typename: 'ProposalDiscussionThreadModeOpen' }
    }
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
  } | null
}

export type SimpleSearchProposalsQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type SimpleSearchProposalsQuery = {
  __typename: 'Query'
  proposals: Array<{ __typename: 'Proposal'; id: string; title: string }>
}

export type SimpleSearchProposalDiscussionQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type SimpleSearchProposalDiscussionQuery = {
  __typename: 'Query'
  proposalDiscussionPosts: Array<{
    __typename: 'ProposalDiscussionPost'
    id: string
    text: string
    discussionThreadId: string
  }>
}

export type GetVoteWithDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetVoteWithDetailsQuery = {
  __typename: 'Query'
  proposalVotedEventByUniqueInput?: {
    __typename: 'ProposalVotedEvent'
    rationale: string
    inBlock: number
    createdAt: any
    network: Types.Network
    proposalId: string
    id: string
    voteKind: Types.ProposalVoteKind
    votingRound: number
    voter: {
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
  } | null
}

export type GetRuntimeWasmBytecodeQueryVariables = Types.Exact<{
  where: Types.RuntimeWasmBytecodeWhereUniqueInput
}>

export type GetRuntimeWasmBytecodeQuery = {
  __typename: 'Query'
  runtime?: { __typename: 'RuntimeWasmBytecode'; id: string; bytecode: any } | null
}

export type GetProposalPostParentQueryVariables = Types.Exact<{
  where: Types.ProposalDiscussionPostWhereUniqueInput
}>

export type GetProposalPostParentQuery = {
  __typename: 'Query'
  proposalDiscussionPostByUniqueInput?: { __typename: 'ProposalDiscussionPost'; discussionThreadId: string } | null
}

export type GetProposalVotesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalVotedEventWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.ProposalVotedEventOrderByInput> | Types.ProposalVotedEventOrderByInput>
}>

export type GetProposalVotesQuery = {
  __typename: 'Query'
  proposalVotedEvents: Array<{
    __typename: 'ProposalVotedEvent'
    id: string
    voteKind: Types.ProposalVoteKind
    votingRound: number
    voter: {
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

export type GetProposalMentionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetProposalMentionQuery = {
  __typename: 'Query'
  proposal?: {
    __typename: 'Proposal'
    id: string
    title: string
    description: string
    exactExecutionBlock?: number | null
    statusSetAtBlock: number
    statusSetAtTime: any
    createdAt: any
    createdInEvent: { __typename: 'ProposalCreatedEvent'; network: Types.Network }
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
  } | null
}

export type GetProposalDiscussionPostMentionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetProposalDiscussionPostMentionQuery = {
  __typename: 'Query'
  proposalPost?: {
    __typename: 'ProposalDiscussionPost'
    id: string
    text: string
    createdAt: any
    author: {
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
  } | null
}

export type GetLatestProposalByMemberIdQueryVariables = Types.Exact<{
  lockAccount?: Types.InputMaybe<Types.Scalars['String']>
}>

export type GetLatestProposalByMemberIdQuery = {
  __typename: 'Query'
  proposals: Array<{
    __typename: 'Proposal'
    id: string
    exactExecutionBlock?: number | null
    statusSetAtBlock: number
    statusSetAtTime: any
    createdAt: any
    createdInEvent: { __typename: 'ProposalCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
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
  }>
}

export type GetPayloadDataObjectIdQueryVariables = Types.Exact<{
  inBlock?: Types.InputMaybe<Types.Scalars['Int']>
  payloadHash?: Types.InputMaybe<Types.Scalars['String']>
}>

export type GetPayloadDataObjectIdQuery = {
  __typename: 'Query'
  channelPayoutsUpdatedEvents: Array<{ __typename: 'ChannelPayoutsUpdatedEvent'; payloadDataObjectId: string }>
}

export const VoteFieldsFragmentDoc = gql`
  fragment VoteFields on ProposalVotedEvent {
    id
    voteKind
    voter {
      ...MemberFields
    }
    votingRound
  }
  ${MemberFieldsFragmentDoc}
`
export const VoteWithDetailsFieldsFragmentDoc = gql`
  fragment VoteWithDetailsFields on ProposalVotedEvent {
    ...VoteFields
    rationale
    inBlock
    createdAt
    network
    proposalId
  }
  ${VoteFieldsFragmentDoc}
`
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
    councilApprovals
    exactExecutionBlock
  }
  ${MemberFieldsFragmentDoc}
`
export const WorkerProposalDetailsFragmentDoc = gql`
  fragment WorkerProposalDetails on Worker {
    group {
      id
      name
    }
    membership {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
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
    status {
      __typename
    }
    discussionThread {
      id
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const DiscussionPostFieldsFragmentDoc = gql`
  fragment DiscussionPostFields on ProposalDiscussionPost {
    ...DiscussionPostWithoutReplyFields
    repliesTo {
      ...DiscussionPostWithoutReplyFields
    }
  }
  ${DiscussionPostWithoutReplyFieldsFragmentDoc}
`
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
          ...WorkerProposalDetails
        }
        amount
      }
      ... on SlashWorkingGroupLeadProposalDetails {
        lead {
          createdAt
          ...WorkerProposalDetails
        }
        amount
      }
      ... on RuntimeUpgradeProposalDetails {
        newRuntimeBytecode {
          id
        }
      }
      ... on UpdateWorkingGroupBudgetProposalDetails {
        group {
          id
          name
        }
        amount
      }
      ... on SetMaxValidatorCountProposalDetails {
        newMaxValidatorCount
      }
      ... on FillWorkingGroupLeadOpeningProposalDetails {
        opening {
          id
          group {
            id
            name
          }
        }
        application {
          applicant {
            ...MemberFields
          }
        }
      }
      ... on CancelWorkingGroupLeadOpeningProposalDetails {
        opening {
          id
          group {
            id
            name
          }
          metadata {
            description
          }
        }
      }
      ... on SetWorkingGroupLeadRewardProposalDetails {
        lead {
          ...WorkerProposalDetails
        }
        newRewardPerBlock
      }
      ... on TerminateWorkingGroupLeadProposalDetails {
        lead {
          ...WorkerProposalDetails
        }
        slashingAmount
      }
      ... on SetMembershipPriceProposalDetails {
        newPrice
      }
      ... on SetCouncilBudgetIncrementProposalDetails {
        newAmount
      }
      ... on SetMembershipLeadInvitationQuotaProposalDetails {
        newLeadInvitationQuota
      }
      ... on SignalProposalDetails {
        text
      }
      ... on SetReferralCutProposalDetails {
        newReferralCut
      }
      ... on SetInitialInvitationBalanceProposalDetails {
        newInitialInvitationBalance
      }
      ... on SetInitialInvitationCountProposalDetails {
        newInitialInvitationsCount
      }
      ... on SetCouncilorRewardProposalDetails {
        newRewardPerBlock
      }
      ... on VetoProposalDetails {
        proposal {
          id
          title
        }
      }
      ... on UpdateChannelPayoutsProposalDetails {
        channelCashoutsEnabled
        minCashoutAllowed
        maxCashoutAllowed
        payloadHash
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
  ${WorkerProposalDetailsFragmentDoc}
  ${MemberFieldsFragmentDoc}
  ${DiscussionPostFieldsFragmentDoc}
`
export const ProposalPostParentsFragmentDoc = gql`
  fragment ProposalPostParents on ProposalDiscussionPost {
    discussionThreadId
  }
`
export const ProposalMentionFieldsFragmentDoc = gql`
  fragment ProposalMentionFields on Proposal {
    id
    title
    description
    exactExecutionBlock
    statusSetAtBlock
    statusSetAtTime
    createdAt
    createdInEvent {
      network
    }
    details {
      __typename
    }
    status {
      __typename
    }
  }
`
export const ProposalDiscussionPostMentionFieldsFragmentDoc = gql`
  fragment ProposalDiscussionPostMentionFields on ProposalDiscussionPost {
    id
    text
    createdAt
    author {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const GetProposalsDocument = gql`
  query getProposals($where: ProposalWhereInput, $orderBy: [ProposalOrderByInput!], $limit: Int, $offset: Int) {
    proposals(where: $where, orderBy: $orderBy, limit: $limit, offset: $offset) {
      ...ProposalFields
    }
  }
  ${ProposalFieldsFragmentDoc}
`

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
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetProposalsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options)
}
export function useGetProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options)
}
export type GetProposalsQueryHookResult = ReturnType<typeof useGetProposalsQuery>
export type GetProposalsLazyQueryHookResult = ReturnType<typeof useGetProposalsLazyQuery>
export type GetProposalsQueryResult = Apollo.QueryResult<GetProposalsQuery, GetProposalsQueryVariables>
export const GetProposalsCountDocument = gql`
  query getProposalsCount($where: ProposalWhereInput) {
    proposalsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetProposalsCountQuery__
 *
 * To run a query within a React component, call `useGetProposalsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProposalsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProposalsCountQuery, GetProposalsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalsCountQuery, GetProposalsCountQueryVariables>(GetProposalsCountDocument, options)
}
export function useGetProposalsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsCountQuery, GetProposalsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalsCountQuery, GetProposalsCountQueryVariables>(
    GetProposalsCountDocument,
    options
  )
}
export type GetProposalsCountQueryHookResult = ReturnType<typeof useGetProposalsCountQuery>
export type GetProposalsCountLazyQueryHookResult = ReturnType<typeof useGetProposalsCountLazyQuery>
export type GetProposalsCountQueryResult = Apollo.QueryResult<GetProposalsCountQuery, GetProposalsCountQueryVariables>
export const GetProposalDocument = gql`
  query getProposal($where: ProposalWhereUniqueInput!) {
    proposal: proposalByUniqueInput(where: $where) {
      ...ProposalWithDetailsFields
    }
  }
  ${ProposalWithDetailsFieldsFragmentDoc}
`

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options)
}
export function useGetProposalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalQuery, GetProposalQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options)
}
export type GetProposalQueryHookResult = ReturnType<typeof useGetProposalQuery>
export type GetProposalLazyQueryHookResult = ReturnType<typeof useGetProposalLazyQuery>
export type GetProposalQueryResult = Apollo.QueryResult<GetProposalQuery, GetProposalQueryVariables>
export const SimpleSearchProposalsDocument = gql`
  query SimpleSearchProposals($text: String!, $limit: Int) {
    proposals(where: { title_contains: $text }, limit: $limit) {
      id
      title
    }
  }
`

/**
 * __useSimpleSearchProposalsQuery__
 *
 * To run a query within a React component, call `useSimpleSearchProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleSearchProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleSearchProposalsQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSimpleSearchProposalsQuery(
  baseOptions: Apollo.QueryHookOptions<SimpleSearchProposalsQuery, SimpleSearchProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SimpleSearchProposalsQuery, SimpleSearchProposalsQueryVariables>(
    SimpleSearchProposalsDocument,
    options
  )
}
export function useSimpleSearchProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleSearchProposalsQuery, SimpleSearchProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SimpleSearchProposalsQuery, SimpleSearchProposalsQueryVariables>(
    SimpleSearchProposalsDocument,
    options
  )
}
export type SimpleSearchProposalsQueryHookResult = ReturnType<typeof useSimpleSearchProposalsQuery>
export type SimpleSearchProposalsLazyQueryHookResult = ReturnType<typeof useSimpleSearchProposalsLazyQuery>
export type SimpleSearchProposalsQueryResult = Apollo.QueryResult<
  SimpleSearchProposalsQuery,
  SimpleSearchProposalsQueryVariables
>
export const SimpleSearchProposalDiscussionDocument = gql`
  query SimpleSearchProposalDiscussion($text: String!, $limit: Int) {
    proposalDiscussionPosts(where: { text_contains: $text }, limit: $limit) {
      id
      text
      discussionThreadId
    }
  }
`

/**
 * __useSimpleSearchProposalDiscussionQuery__
 *
 * To run a query within a React component, call `useSimpleSearchProposalDiscussionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleSearchProposalDiscussionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleSearchProposalDiscussionQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSimpleSearchProposalDiscussionQuery(
  baseOptions: Apollo.QueryHookOptions<
    SimpleSearchProposalDiscussionQuery,
    SimpleSearchProposalDiscussionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SimpleSearchProposalDiscussionQuery, SimpleSearchProposalDiscussionQueryVariables>(
    SimpleSearchProposalDiscussionDocument,
    options
  )
}
export function useSimpleSearchProposalDiscussionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SimpleSearchProposalDiscussionQuery,
    SimpleSearchProposalDiscussionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SimpleSearchProposalDiscussionQuery, SimpleSearchProposalDiscussionQueryVariables>(
    SimpleSearchProposalDiscussionDocument,
    options
  )
}
export type SimpleSearchProposalDiscussionQueryHookResult = ReturnType<typeof useSimpleSearchProposalDiscussionQuery>
export type SimpleSearchProposalDiscussionLazyQueryHookResult = ReturnType<
  typeof useSimpleSearchProposalDiscussionLazyQuery
>
export type SimpleSearchProposalDiscussionQueryResult = Apollo.QueryResult<
  SimpleSearchProposalDiscussionQuery,
  SimpleSearchProposalDiscussionQueryVariables
>
export const GetVoteWithDetailsDocument = gql`
  query GetVoteWithDetails($id: ID!) {
    proposalVotedEventByUniqueInput(where: { id: $id }) {
      ...VoteWithDetailsFields
    }
  }
  ${VoteWithDetailsFieldsFragmentDoc}
`

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
export function useGetVoteWithDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>(GetVoteWithDetailsDocument, options)
}
export function useGetVoteWithDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>(
    GetVoteWithDetailsDocument,
    options
  )
}
export type GetVoteWithDetailsQueryHookResult = ReturnType<typeof useGetVoteWithDetailsQuery>
export type GetVoteWithDetailsLazyQueryHookResult = ReturnType<typeof useGetVoteWithDetailsLazyQuery>
export type GetVoteWithDetailsQueryResult = Apollo.QueryResult<
  GetVoteWithDetailsQuery,
  GetVoteWithDetailsQueryVariables
>
export const GetRuntimeWasmBytecodeDocument = gql`
  query GetRuntimeWasmBytecode($where: RuntimeWasmBytecodeWhereUniqueInput!) {
    runtime: runtimeWasmBytecodeByUniqueInput(where: $where) {
      id
      bytecode
    }
  }
`

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
export function useGetRuntimeWasmBytecodeQuery(
  baseOptions: Apollo.QueryHookOptions<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>(
    GetRuntimeWasmBytecodeDocument,
    options
  )
}
export function useGetRuntimeWasmBytecodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>(
    GetRuntimeWasmBytecodeDocument,
    options
  )
}
export type GetRuntimeWasmBytecodeQueryHookResult = ReturnType<typeof useGetRuntimeWasmBytecodeQuery>
export type GetRuntimeWasmBytecodeLazyQueryHookResult = ReturnType<typeof useGetRuntimeWasmBytecodeLazyQuery>
export type GetRuntimeWasmBytecodeQueryResult = Apollo.QueryResult<
  GetRuntimeWasmBytecodeQuery,
  GetRuntimeWasmBytecodeQueryVariables
>
export const GetProposalPostParentDocument = gql`
  query GetProposalPostParent($where: ProposalDiscussionPostWhereUniqueInput!) {
    proposalDiscussionPostByUniqueInput(where: $where) {
      ...ProposalPostParents
    }
  }
  ${ProposalPostParentsFragmentDoc}
`

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
export function useGetProposalPostParentQuery(
  baseOptions: Apollo.QueryHookOptions<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>(
    GetProposalPostParentDocument,
    options
  )
}
export function useGetProposalPostParentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalPostParentQuery, GetProposalPostParentQueryVariables>(
    GetProposalPostParentDocument,
    options
  )
}
export type GetProposalPostParentQueryHookResult = ReturnType<typeof useGetProposalPostParentQuery>
export type GetProposalPostParentLazyQueryHookResult = ReturnType<typeof useGetProposalPostParentLazyQuery>
export type GetProposalPostParentQueryResult = Apollo.QueryResult<
  GetProposalPostParentQuery,
  GetProposalPostParentQueryVariables
>
export const GetProposalVotesDocument = gql`
  query GetProposalVotes($where: ProposalVotedEventWhereInput, $orderBy: [ProposalVotedEventOrderByInput!]) {
    proposalVotedEvents(where: $where, orderBy: $orderBy) {
      ...VoteFields
    }
  }
  ${VoteFieldsFragmentDoc}
`

/**
 * __useGetProposalVotesQuery__
 *
 * To run a query within a React component, call `useGetProposalVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalVotesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetProposalVotesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProposalVotesQuery, GetProposalVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalVotesQuery, GetProposalVotesQueryVariables>(GetProposalVotesDocument, options)
}
export function useGetProposalVotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalVotesQuery, GetProposalVotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalVotesQuery, GetProposalVotesQueryVariables>(GetProposalVotesDocument, options)
}
export type GetProposalVotesQueryHookResult = ReturnType<typeof useGetProposalVotesQuery>
export type GetProposalVotesLazyQueryHookResult = ReturnType<typeof useGetProposalVotesLazyQuery>
export type GetProposalVotesQueryResult = Apollo.QueryResult<GetProposalVotesQuery, GetProposalVotesQueryVariables>
export const GetProposalMentionDocument = gql`
  query GetProposalMention($id: ID!) {
    proposal: proposalByUniqueInput(where: { id: $id }) {
      ...ProposalMentionFields
    }
  }
  ${ProposalMentionFieldsFragmentDoc}
`

/**
 * __useGetProposalMentionQuery__
 *
 * To run a query within a React component, call `useGetProposalMentionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalMentionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalMentionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProposalMentionQuery(
  baseOptions: Apollo.QueryHookOptions<GetProposalMentionQuery, GetProposalMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalMentionQuery, GetProposalMentionQueryVariables>(GetProposalMentionDocument, options)
}
export function useGetProposalMentionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalMentionQuery, GetProposalMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalMentionQuery, GetProposalMentionQueryVariables>(
    GetProposalMentionDocument,
    options
  )
}
export type GetProposalMentionQueryHookResult = ReturnType<typeof useGetProposalMentionQuery>
export type GetProposalMentionLazyQueryHookResult = ReturnType<typeof useGetProposalMentionLazyQuery>
export type GetProposalMentionQueryResult = Apollo.QueryResult<
  GetProposalMentionQuery,
  GetProposalMentionQueryVariables
>
export const GetProposalDiscussionPostMentionDocument = gql`
  query GetProposalDiscussionPostMention($id: ID!) {
    proposalPost: proposalDiscussionPostByUniqueInput(where: { id: $id }) {
      ...ProposalDiscussionPostMentionFields
    }
  }
  ${ProposalDiscussionPostMentionFieldsFragmentDoc}
`

/**
 * __useGetProposalDiscussionPostMentionQuery__
 *
 * To run a query within a React component, call `useGetProposalDiscussionPostMentionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalDiscussionPostMentionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalDiscussionPostMentionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProposalDiscussionPostMentionQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProposalDiscussionPostMentionQuery,
    GetProposalDiscussionPostMentionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalDiscussionPostMentionQuery, GetProposalDiscussionPostMentionQueryVariables>(
    GetProposalDiscussionPostMentionDocument,
    options
  )
}
export function useGetProposalDiscussionPostMentionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProposalDiscussionPostMentionQuery,
    GetProposalDiscussionPostMentionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalDiscussionPostMentionQuery, GetProposalDiscussionPostMentionQueryVariables>(
    GetProposalDiscussionPostMentionDocument,
    options
  )
}
export type GetProposalDiscussionPostMentionQueryHookResult = ReturnType<
  typeof useGetProposalDiscussionPostMentionQuery
>
export type GetProposalDiscussionPostMentionLazyQueryHookResult = ReturnType<
  typeof useGetProposalDiscussionPostMentionLazyQuery
>
export type GetProposalDiscussionPostMentionQueryResult = Apollo.QueryResult<
  GetProposalDiscussionPostMentionQuery,
  GetProposalDiscussionPostMentionQueryVariables
>
export const GetLatestProposalByMemberIdDocument = gql`
  query GetLatestProposalByMemberId($lockAccount: String) {
    proposals(where: { stakingAccount_eq: $lockAccount }, orderBy: [createdAt_DESC], limit: 1) {
      id
      createdInEvent {
        createdAt
        inBlock
        network
      }
      status {
        __typename
      }
      details {
        __typename
      }
      exactExecutionBlock
      statusSetAtBlock
      statusSetAtTime
      createdAt
    }
  }
`

/**
 * __useGetLatestProposalByMemberIdQuery__
 *
 * To run a query within a React component, call `useGetLatestProposalByMemberIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestProposalByMemberIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestProposalByMemberIdQuery({
 *   variables: {
 *      lockAccount: // value for 'lockAccount'
 *   },
 * });
 */
export function useGetLatestProposalByMemberIdQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLatestProposalByMemberIdQuery, GetLatestProposalByMemberIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLatestProposalByMemberIdQuery, GetLatestProposalByMemberIdQueryVariables>(
    GetLatestProposalByMemberIdDocument,
    options
  )
}
export function useGetLatestProposalByMemberIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLatestProposalByMemberIdQuery, GetLatestProposalByMemberIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLatestProposalByMemberIdQuery, GetLatestProposalByMemberIdQueryVariables>(
    GetLatestProposalByMemberIdDocument,
    options
  )
}
export type GetLatestProposalByMemberIdQueryHookResult = ReturnType<typeof useGetLatestProposalByMemberIdQuery>
export type GetLatestProposalByMemberIdLazyQueryHookResult = ReturnType<typeof useGetLatestProposalByMemberIdLazyQuery>
export type GetLatestProposalByMemberIdQueryResult = Apollo.QueryResult<
  GetLatestProposalByMemberIdQuery,
  GetLatestProposalByMemberIdQueryVariables
>
export const GetPayloadDataObjectIdDocument = gql`
  query GetPayloadDataObjectId($inBlock: Int, $payloadHash: String) {
    channelPayoutsUpdatedEvents(where: { inBlock_eq: $inBlock, payloadHash_eq: $payloadHash }, limit: 1) {
      payloadDataObjectId
    }
  }
`

/**
 * __useGetPayloadDataObjectIdQuery__
 *
 * To run a query within a React component, call `useGetPayloadDataObjectIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayloadDataObjectIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayloadDataObjectIdQuery({
 *   variables: {
 *      inBlock: // value for 'inBlock'
 *      payloadHash: // value for 'payloadHash'
 *   },
 * });
 */
export function useGetPayloadDataObjectIdQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPayloadDataObjectIdQuery, GetPayloadDataObjectIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPayloadDataObjectIdQuery, GetPayloadDataObjectIdQueryVariables>(
    GetPayloadDataObjectIdDocument,
    options
  )
}
export function useGetPayloadDataObjectIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPayloadDataObjectIdQuery, GetPayloadDataObjectIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPayloadDataObjectIdQuery, GetPayloadDataObjectIdQueryVariables>(
    GetPayloadDataObjectIdDocument,
    options
  )
}
export type GetPayloadDataObjectIdQueryHookResult = ReturnType<typeof useGetPayloadDataObjectIdQuery>
export type GetPayloadDataObjectIdLazyQueryHookResult = ReturnType<typeof useGetPayloadDataObjectIdLazyQuery>
export type GetPayloadDataObjectIdQueryResult = Apollo.QueryResult<
  GetPayloadDataObjectIdQuery,
  GetPayloadDataObjectIdQueryVariables
>
