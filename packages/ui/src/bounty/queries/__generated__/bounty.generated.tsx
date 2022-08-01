import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type BountyFieldsFragment = {
  __typename: 'Bounty'
  id: string
  createdAt: any
  title?: string | null
  bannerImageUri?: string | null
  description?: string | null
  cherry: string
  entrantStake: string
  workPeriod: number
  judgingPeriod: number
  stage: Types.BountyStage
  isTerminated: boolean
  totalFunding: string
  discussionThreadId?: string | null
  creator?: {
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
  } | null
  oracle?: {
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
  } | null
  entrantWhitelist?: {
    __typename: 'BountyEntrantWhitelist'
    members: Array<{ __typename: 'Membership'; id: string }>
  } | null
  contributions?: Array<{
    __typename: 'BountyContribution'
    id: string
    amount: string
    withdrawnInEvent?: { __typename: 'BountyFundingWithdrawalEvent'; id: string } | null
    contributor?: {
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
    } | null
  }> | null
  entries?: Array<{
    __typename: 'BountyEntry'
    id: string
    workSubmitted: boolean
    works?: Array<{
      __typename: 'WorkSubmittedEvent'
      id: string
      title?: string | null
      description?: string | null
    }> | null
    worker: {
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
      | { __typename: 'BountyEntryStatusPassed' }
      | { __typename: 'BountyEntryStatusRejected' }
      | { __typename: 'BountyEntryStatusWinner'; reward: string }
      | { __typename: 'BountyEntryStatusWithdrawn' }
      | { __typename: 'BountyEntryStatusWorking' }
    withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
  }> | null
  createdInEvent: { __typename: 'BountyCreatedEvent'; inBlock: number }
  judgment?: {
    __typename: 'OracleJudgmentSubmittedEvent'
    inBlock: number
    rationale?: string | null
    createdAt: any
    network: Types.Network
  } | null
  maxFundingReachedEvent?: { __typename: 'BountyMaxFundingReachedEvent'; createdAt: any } | null
  fundingType:
    | { __typename: 'BountyFundingLimited'; minFundingAmount: string; maxFundingAmount: string; fundingPeriod: number }
    | { __typename: 'BountyFundingPerpetual'; target: string }
}

export type BountyFundingTypeFieldsFragment = {
  __typename: 'Bounty'
  fundingType:
    | { __typename: 'BountyFundingLimited'; minFundingAmount: string; maxFundingAmount: string; fundingPeriod: number }
    | { __typename: 'BountyFundingPerpetual'; target: string }
}

export type BountyEntryFieldsFragment = {
  __typename: 'BountyEntry'
  id: string
  workSubmitted: boolean
  worker: {
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
    | { __typename: 'BountyEntryStatusPassed' }
    | { __typename: 'BountyEntryStatusRejected' }
    | { __typename: 'BountyEntryStatusWinner'; reward: string }
    | { __typename: 'BountyEntryStatusWithdrawn' }
    | { __typename: 'BountyEntryStatusWorking' }
  withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
}

export type BountyEntryWithDetailsFieldsFragment = {
  __typename: 'BountyEntry'
  id: string
  workSubmitted: boolean
  works?: Array<{
    __typename: 'WorkSubmittedEvent'
    id: string
    title?: string | null
    description?: string | null
  }> | null
  worker: {
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
    | { __typename: 'BountyEntryStatusPassed' }
    | { __typename: 'BountyEntryStatusRejected' }
    | { __typename: 'BountyEntryStatusWinner'; reward: string }
    | { __typename: 'BountyEntryStatusWithdrawn' }
    | { __typename: 'BountyEntryStatusWorking' }
  withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
}

export type BountyWorkFieldsFragment = {
  __typename: 'WorkSubmittedEvent'
  id: string
  title?: string | null
  description?: string | null
}

export type BountyWorkWithDetailsFieldsFragment = {
  __typename: 'BountyEntry'
  id: string
  workSubmitted: boolean
  works?: Array<{
    __typename: 'WorkSubmittedEvent'
    inBlock: number
    createdAt: any
    network: Types.Network
    id: string
    title?: string | null
    description?: string | null
  }> | null
  worker: {
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
    | { __typename: 'BountyEntryStatusPassed' }
    | { __typename: 'BountyEntryStatusRejected' }
    | { __typename: 'BountyEntryStatusWinner'; reward: string }
    | { __typename: 'BountyEntryStatusWithdrawn' }
    | { __typename: 'BountyEntryStatusWorking' }
  withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
}

export type BountyContributionFieldsFragment = {
  __typename: 'BountyContribution'
  id: string
  amount: string
  withdrawnInEvent?: { __typename: 'BountyFundingWithdrawalEvent'; id: string } | null
  contributor?: {
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
  } | null
}

export type GetBountiesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BountyWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.BountyOrderByInput> | Types.BountyOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetBountiesQuery = {
  __typename: 'Query'
  bounties: Array<{
    __typename: 'Bounty'
    id: string
    createdAt: any
    title?: string | null
    bannerImageUri?: string | null
    description?: string | null
    cherry: string
    entrantStake: string
    workPeriod: number
    judgingPeriod: number
    stage: Types.BountyStage
    isTerminated: boolean
    totalFunding: string
    discussionThreadId?: string | null
    creator?: {
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
    } | null
    oracle?: {
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
    } | null
    entrantWhitelist?: {
      __typename: 'BountyEntrantWhitelist'
      members: Array<{ __typename: 'Membership'; id: string }>
    } | null
    contributions?: Array<{
      __typename: 'BountyContribution'
      id: string
      amount: string
      withdrawnInEvent?: { __typename: 'BountyFundingWithdrawalEvent'; id: string } | null
      contributor?: {
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
      } | null
    }> | null
    entries?: Array<{
      __typename: 'BountyEntry'
      id: string
      workSubmitted: boolean
      works?: Array<{
        __typename: 'WorkSubmittedEvent'
        id: string
        title?: string | null
        description?: string | null
      }> | null
      worker: {
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
        | { __typename: 'BountyEntryStatusPassed' }
        | { __typename: 'BountyEntryStatusRejected' }
        | { __typename: 'BountyEntryStatusWinner'; reward: string }
        | { __typename: 'BountyEntryStatusWithdrawn' }
        | { __typename: 'BountyEntryStatusWorking' }
      withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
    }> | null
    createdInEvent: { __typename: 'BountyCreatedEvent'; inBlock: number }
    judgment?: {
      __typename: 'OracleJudgmentSubmittedEvent'
      inBlock: number
      rationale?: string | null
      createdAt: any
      network: Types.Network
    } | null
    maxFundingReachedEvent?: { __typename: 'BountyMaxFundingReachedEvent'; createdAt: any } | null
    fundingType:
      | {
          __typename: 'BountyFundingLimited'
          minFundingAmount: string
          maxFundingAmount: string
          fundingPeriod: number
        }
      | { __typename: 'BountyFundingPerpetual'; target: string }
  }>
}

export type GetBountiesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BountyWhereInput>
}>

export type GetBountiesCountQuery = {
  __typename: 'Query'
  bountiesConnection: { __typename: 'BountyConnection'; totalCount: number }
}

export type GetBountyQueryVariables = Types.Exact<{
  where: Types.BountyWhereUniqueInput
}>

export type GetBountyQuery = {
  __typename: 'Query'
  bountyByUniqueInput?: {
    __typename: 'Bounty'
    id: string
    createdAt: any
    title?: string | null
    bannerImageUri?: string | null
    description?: string | null
    cherry: string
    entrantStake: string
    workPeriod: number
    judgingPeriod: number
    stage: Types.BountyStage
    isTerminated: boolean
    totalFunding: string
    discussionThreadId?: string | null
    creator?: {
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
    } | null
    oracle?: {
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
    } | null
    entrantWhitelist?: {
      __typename: 'BountyEntrantWhitelist'
      members: Array<{ __typename: 'Membership'; id: string }>
    } | null
    contributions?: Array<{
      __typename: 'BountyContribution'
      id: string
      amount: string
      withdrawnInEvent?: { __typename: 'BountyFundingWithdrawalEvent'; id: string } | null
      contributor?: {
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
      } | null
    }> | null
    entries?: Array<{
      __typename: 'BountyEntry'
      id: string
      workSubmitted: boolean
      works?: Array<{
        __typename: 'WorkSubmittedEvent'
        id: string
        title?: string | null
        description?: string | null
      }> | null
      worker: {
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
        | { __typename: 'BountyEntryStatusPassed' }
        | { __typename: 'BountyEntryStatusRejected' }
        | { __typename: 'BountyEntryStatusWinner'; reward: string }
        | { __typename: 'BountyEntryStatusWithdrawn' }
        | { __typename: 'BountyEntryStatusWorking' }
      withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
    }> | null
    createdInEvent: { __typename: 'BountyCreatedEvent'; inBlock: number }
    judgment?: {
      __typename: 'OracleJudgmentSubmittedEvent'
      inBlock: number
      rationale?: string | null
      createdAt: any
      network: Types.Network
    } | null
    maxFundingReachedEvent?: { __typename: 'BountyMaxFundingReachedEvent'; createdAt: any } | null
    fundingType:
      | {
          __typename: 'BountyFundingLimited'
          minFundingAmount: string
          maxFundingAmount: string
          fundingPeriod: number
        }
      | { __typename: 'BountyFundingPerpetual'; target: string }
  } | null
}

export type GetBountyWorksQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BountyEntryWhereInput>
  order?: Types.InputMaybe<Array<Types.BountyEntryOrderByInput> | Types.BountyEntryOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetBountyWorksQuery = {
  __typename: 'Query'
  bountyEntries: Array<{
    __typename: 'BountyEntry'
    id: string
    workSubmitted: boolean
    works?: Array<{
      __typename: 'WorkSubmittedEvent'
      inBlock: number
      createdAt: any
      network: Types.Network
      id: string
      title?: string | null
      description?: string | null
    }> | null
    worker: {
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
      | { __typename: 'BountyEntryStatusPassed' }
      | { __typename: 'BountyEntryStatusRejected' }
      | { __typename: 'BountyEntryStatusWinner'; reward: string }
      | { __typename: 'BountyEntryStatusWithdrawn' }
      | { __typename: 'BountyEntryStatusWorking' }
    withdrawnInEvent?: { __typename: 'WorkEntryWithdrawnEvent'; inBlock: number } | null
  }>
}

export type GetBountyWorksCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkSubmittedEventWhereInput>
}>

export type GetBountyWorksCountQuery = {
  __typename: 'Query'
  workSubmittedEventsConnection: { __typename: 'WorkSubmittedEventConnection'; totalCount: number }
}

export type GetUserBountyStatisticsQueryVariables = Types.Exact<{
  memberId: Types.Scalars['ID']
}>

export type GetUserBountyStatisticsQuery = {
  __typename: 'Query'
  bountyEntries: Array<{
    __typename: 'BountyEntry'
    status:
      | { __typename: 'BountyEntryStatusPassed' }
      | { __typename: 'BountyEntryStatusRejected' }
      | { __typename: 'BountyEntryStatusWinner'; reward: string }
      | { __typename: 'BountyEntryStatusWithdrawn' }
      | { __typename: 'BountyEntryStatusWorking' }
  }>
  bountyContributions: Array<{ __typename: 'BountyContribution'; amount: string }>
}

export type GetUserBountyTabsInformationQueryVariables = Types.Exact<{
  memberIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetUserBountyTabsInformationQuery = {
  __typename: 'Query'
  bountiesConnection: { __typename: 'BountyConnection'; totalCount: number }
  bountyContributionsConnection: { __typename: 'BountyContributionConnection'; totalCount: number }
  bountyEntriesConnection: { __typename: 'BountyEntryConnection'; totalCount: number }
}

export type GetBountyContributorsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BountyContributionWhereInput>
  order?: Types.InputMaybe<Array<Types.BountyContributionOrderByInput> | Types.BountyContributionOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetBountyContributorsQuery = {
  __typename: 'Query'
  bountyContributions: Array<{
    __typename: 'BountyContribution'
    id: string
    amount: string
    withdrawnInEvent?: { __typename: 'BountyFundingWithdrawalEvent'; id: string } | null
    contributor?: {
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
    } | null
  }>
}

export type GetLatestBountyEntryQueryVariables = Types.Exact<{
  lockAccount?: Types.InputMaybe<Types.Scalars['String']>
}>

export type GetLatestBountyEntryQuery = {
  __typename: 'Query'
  bountyEntries: Array<{
    __typename: 'BountyEntry'
    id: string
    bountyId: string
    bounty: {
      __typename: 'Bounty'
      createdAt: any
      workPeriod: number
      judgingPeriod: number
      maxFundingReachedEvent?: { __typename: 'BountyMaxFundingReachedEvent'; createdAt: any } | null
      fundingType:
        | {
            __typename: 'BountyFundingLimited'
            minFundingAmount: string
            maxFundingAmount: string
            fundingPeriod: number
          }
        | { __typename: 'BountyFundingPerpetual'; target: string }
    }
    announcedInEvent: { __typename: 'WorkEntryAnnouncedEvent'; createdAt: any; inBlock: number; network: Types.Network }
  }>
}

export const BountyFundingTypeFieldsFragmentDoc = gql`
  fragment BountyFundingTypeFields on Bounty {
    fundingType {
      ... on BountyFundingLimited {
        minFundingAmount
        maxFundingAmount
        fundingPeriod
      }
      ... on BountyFundingPerpetual {
        target
      }
    }
  }
`
export const BountyContributionFieldsFragmentDoc = gql`
  fragment BountyContributionFields on BountyContribution {
    id
    amount
    withdrawnInEvent {
      id
    }
    contributor {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const BountyEntryFieldsFragmentDoc = gql`
  fragment BountyEntryFields on BountyEntry {
    id
    worker {
      ...MemberFields
    }
    workSubmitted
    status {
      ... on BountyEntryStatusWinner {
        reward
      }
    }
    withdrawnInEvent {
      inBlock
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const BountyWorkFieldsFragmentDoc = gql`
  fragment BountyWorkFields on WorkSubmittedEvent {
    id
    title
    description
  }
`
export const BountyEntryWithDetailsFieldsFragmentDoc = gql`
  fragment BountyEntryWithDetailsFields on BountyEntry {
    ...BountyEntryFields
    works {
      ...BountyWorkFields
    }
  }
  ${BountyEntryFieldsFragmentDoc}
  ${BountyWorkFieldsFragmentDoc}
`
export const BountyFieldsFragmentDoc = gql`
  fragment BountyFields on Bounty {
    id
    createdAt
    title
    bannerImageUri
    description
    cherry
    entrantStake
    creator {
      ...MemberFields
    }
    oracle {
      ...MemberFields
    }
    ...BountyFundingTypeFields
    entrantWhitelist {
      members {
        id
      }
    }
    workPeriod
    judgingPeriod
    stage
    isTerminated
    totalFunding
    discussionThreadId
    contributions {
      ...BountyContributionFields
    }
    entries {
      ...BountyEntryWithDetailsFields
    }
    createdInEvent {
      inBlock
    }
    judgment {
      inBlock
      rationale
      createdAt
      network
    }
    maxFundingReachedEvent {
      createdAt
    }
  }
  ${MemberFieldsFragmentDoc}
  ${BountyFundingTypeFieldsFragmentDoc}
  ${BountyContributionFieldsFragmentDoc}
  ${BountyEntryWithDetailsFieldsFragmentDoc}
`
export const BountyWorkWithDetailsFieldsFragmentDoc = gql`
  fragment BountyWorkWithDetailsFields on BountyEntry {
    ...BountyEntryFields
    works {
      ...BountyWorkFields
      inBlock
      createdAt
      network
    }
  }
  ${BountyEntryFieldsFragmentDoc}
  ${BountyWorkFieldsFragmentDoc}
`
export const GetBountiesDocument = gql`
  query GetBounties($where: BountyWhereInput, $orderBy: [BountyOrderByInput!], $offset: Int, $limit: Int) {
    bounties(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      ...BountyFields
    }
  }
  ${BountyFieldsFragmentDoc}
`

/**
 * __useGetBountiesQuery__
 *
 * To run a query within a React component, call `useGetBountiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountiesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBountiesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountiesQuery, GetBountiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountiesQuery, GetBountiesQueryVariables>(GetBountiesDocument, options)
}
export function useGetBountiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountiesQuery, GetBountiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountiesQuery, GetBountiesQueryVariables>(GetBountiesDocument, options)
}
export type GetBountiesQueryHookResult = ReturnType<typeof useGetBountiesQuery>
export type GetBountiesLazyQueryHookResult = ReturnType<typeof useGetBountiesLazyQuery>
export type GetBountiesQueryResult = Apollo.QueryResult<GetBountiesQuery, GetBountiesQueryVariables>
export const GetBountiesCountDocument = gql`
  query GetBountiesCount($where: BountyWhereInput) {
    bountiesConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetBountiesCountQuery__
 *
 * To run a query within a React component, call `useGetBountiesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountiesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountiesCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBountiesCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountiesCountQuery, GetBountiesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountiesCountQuery, GetBountiesCountQueryVariables>(GetBountiesCountDocument, options)
}
export function useGetBountiesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountiesCountQuery, GetBountiesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountiesCountQuery, GetBountiesCountQueryVariables>(GetBountiesCountDocument, options)
}
export type GetBountiesCountQueryHookResult = ReturnType<typeof useGetBountiesCountQuery>
export type GetBountiesCountLazyQueryHookResult = ReturnType<typeof useGetBountiesCountLazyQuery>
export type GetBountiesCountQueryResult = Apollo.QueryResult<GetBountiesCountQuery, GetBountiesCountQueryVariables>
export const GetBountyDocument = gql`
  query GetBounty($where: BountyWhereUniqueInput!) {
    bountyByUniqueInput(where: $where) {
      ...BountyFields
    }
  }
  ${BountyFieldsFragmentDoc}
`

/**
 * __useGetBountyQuery__
 *
 * To run a query within a React component, call `useGetBountyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountyQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBountyQuery(baseOptions: Apollo.QueryHookOptions<GetBountyQuery, GetBountyQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountyQuery, GetBountyQueryVariables>(GetBountyDocument, options)
}
export function useGetBountyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountyQuery, GetBountyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountyQuery, GetBountyQueryVariables>(GetBountyDocument, options)
}
export type GetBountyQueryHookResult = ReturnType<typeof useGetBountyQuery>
export type GetBountyLazyQueryHookResult = ReturnType<typeof useGetBountyLazyQuery>
export type GetBountyQueryResult = Apollo.QueryResult<GetBountyQuery, GetBountyQueryVariables>
export const GetBountyWorksDocument = gql`
  query GetBountyWorks($where: BountyEntryWhereInput, $order: [BountyEntryOrderByInput!], $offset: Int, $limit: Int) {
    bountyEntries(where: $where, orderBy: $order, offset: $offset, limit: $limit) {
      ...BountyWorkWithDetailsFields
    }
  }
  ${BountyWorkWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetBountyWorksQuery__
 *
 * To run a query within a React component, call `useGetBountyWorksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountyWorksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountyWorksQuery({
 *   variables: {
 *      where: // value for 'where'
 *      order: // value for 'order'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBountyWorksQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountyWorksQuery, GetBountyWorksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountyWorksQuery, GetBountyWorksQueryVariables>(GetBountyWorksDocument, options)
}
export function useGetBountyWorksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountyWorksQuery, GetBountyWorksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountyWorksQuery, GetBountyWorksQueryVariables>(GetBountyWorksDocument, options)
}
export type GetBountyWorksQueryHookResult = ReturnType<typeof useGetBountyWorksQuery>
export type GetBountyWorksLazyQueryHookResult = ReturnType<typeof useGetBountyWorksLazyQuery>
export type GetBountyWorksQueryResult = Apollo.QueryResult<GetBountyWorksQuery, GetBountyWorksQueryVariables>
export const GetBountyWorksCountDocument = gql`
  query GetBountyWorksCount($where: WorkSubmittedEventWhereInput) {
    workSubmittedEventsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetBountyWorksCountQuery__
 *
 * To run a query within a React component, call `useGetBountyWorksCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountyWorksCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountyWorksCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBountyWorksCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountyWorksCountQuery, GetBountyWorksCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountyWorksCountQuery, GetBountyWorksCountQueryVariables>(
    GetBountyWorksCountDocument,
    options
  )
}
export function useGetBountyWorksCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountyWorksCountQuery, GetBountyWorksCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountyWorksCountQuery, GetBountyWorksCountQueryVariables>(
    GetBountyWorksCountDocument,
    options
  )
}
export type GetBountyWorksCountQueryHookResult = ReturnType<typeof useGetBountyWorksCountQuery>
export type GetBountyWorksCountLazyQueryHookResult = ReturnType<typeof useGetBountyWorksCountLazyQuery>
export type GetBountyWorksCountQueryResult = Apollo.QueryResult<
  GetBountyWorksCountQuery,
  GetBountyWorksCountQueryVariables
>
export const GetUserBountyStatisticsDocument = gql`
  query GetUserBountyStatistics($memberId: ID!) {
    bountyEntries(where: { worker: { id_eq: $memberId } }) {
      status {
        ... on BountyEntryStatusWinner {
          reward
        }
      }
    }
    bountyContributions(where: { contributor: { id_eq: $memberId } }) {
      amount
    }
  }
`

/**
 * __useGetUserBountyStatisticsQuery__
 *
 * To run a query within a React component, call `useGetUserBountyStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBountyStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBountyStatisticsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetUserBountyStatisticsQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserBountyStatisticsQuery, GetUserBountyStatisticsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserBountyStatisticsQuery, GetUserBountyStatisticsQueryVariables>(
    GetUserBountyStatisticsDocument,
    options
  )
}
export function useGetUserBountyStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserBountyStatisticsQuery, GetUserBountyStatisticsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserBountyStatisticsQuery, GetUserBountyStatisticsQueryVariables>(
    GetUserBountyStatisticsDocument,
    options
  )
}
export type GetUserBountyStatisticsQueryHookResult = ReturnType<typeof useGetUserBountyStatisticsQuery>
export type GetUserBountyStatisticsLazyQueryHookResult = ReturnType<typeof useGetUserBountyStatisticsLazyQuery>
export type GetUserBountyStatisticsQueryResult = Apollo.QueryResult<
  GetUserBountyStatisticsQuery,
  GetUserBountyStatisticsQueryVariables
>
export const GetUserBountyTabsInformationDocument = gql`
  query GetUserBountyTabsInformation($memberIds: [ID!]) {
    bountiesConnection(where: { creator: { id_in: $memberIds } }) {
      totalCount
    }
    bountyContributionsConnection(where: { contributor: { id_in: $memberIds } }) {
      totalCount
    }
    bountyEntriesConnection(where: { worker: { id_in: $memberIds } }) {
      totalCount
    }
  }
`

/**
 * __useGetUserBountyTabsInformationQuery__
 *
 * To run a query within a React component, call `useGetUserBountyTabsInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBountyTabsInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBountyTabsInformationQuery({
 *   variables: {
 *      memberIds: // value for 'memberIds'
 *   },
 * });
 */
export function useGetUserBountyTabsInformationQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserBountyTabsInformationQuery, GetUserBountyTabsInformationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserBountyTabsInformationQuery, GetUserBountyTabsInformationQueryVariables>(
    GetUserBountyTabsInformationDocument,
    options
  )
}
export function useGetUserBountyTabsInformationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserBountyTabsInformationQuery,
    GetUserBountyTabsInformationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserBountyTabsInformationQuery, GetUserBountyTabsInformationQueryVariables>(
    GetUserBountyTabsInformationDocument,
    options
  )
}
export type GetUserBountyTabsInformationQueryHookResult = ReturnType<typeof useGetUserBountyTabsInformationQuery>
export type GetUserBountyTabsInformationLazyQueryHookResult = ReturnType<
  typeof useGetUserBountyTabsInformationLazyQuery
>
export type GetUserBountyTabsInformationQueryResult = Apollo.QueryResult<
  GetUserBountyTabsInformationQuery,
  GetUserBountyTabsInformationQueryVariables
>
export const GetBountyContributorsDocument = gql`
  query GetBountyContributors(
    $where: BountyContributionWhereInput
    $order: [BountyContributionOrderByInput!]
    $offset: Int
    $limit: Int
  ) {
    bountyContributions(where: $where, orderBy: $order, offset: $offset, limit: $limit) {
      ...BountyContributionFields
    }
  }
  ${BountyContributionFieldsFragmentDoc}
`

/**
 * __useGetBountyContributorsQuery__
 *
 * To run a query within a React component, call `useGetBountyContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBountyContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBountyContributorsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      order: // value for 'order'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBountyContributorsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBountyContributorsQuery, GetBountyContributorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBountyContributorsQuery, GetBountyContributorsQueryVariables>(
    GetBountyContributorsDocument,
    options
  )
}
export function useGetBountyContributorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBountyContributorsQuery, GetBountyContributorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBountyContributorsQuery, GetBountyContributorsQueryVariables>(
    GetBountyContributorsDocument,
    options
  )
}
export type GetBountyContributorsQueryHookResult = ReturnType<typeof useGetBountyContributorsQuery>
export type GetBountyContributorsLazyQueryHookResult = ReturnType<typeof useGetBountyContributorsLazyQuery>
export type GetBountyContributorsQueryResult = Apollo.QueryResult<
  GetBountyContributorsQuery,
  GetBountyContributorsQueryVariables
>
export const GetLatestBountyEntryDocument = gql`
  query GetLatestBountyEntry($lockAccount: String) {
    bountyEntries(where: { stakingAccount_eq: $lockAccount }, orderBy: [createdAt_DESC], limit: 1) {
      id
      bountyId
      bounty {
        createdAt
        ...BountyFundingTypeFields
        workPeriod
        judgingPeriod
        maxFundingReachedEvent {
          createdAt
        }
      }
      announcedInEvent {
        createdAt
        inBlock
        network
      }
    }
  }
  ${BountyFundingTypeFieldsFragmentDoc}
`

/**
 * __useGetLatestBountyEntryQuery__
 *
 * To run a query within a React component, call `useGetLatestBountyEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestBountyEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestBountyEntryQuery({
 *   variables: {
 *      lockAccount: // value for 'lockAccount'
 *   },
 * });
 */
export function useGetLatestBountyEntryQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLatestBountyEntryQuery, GetLatestBountyEntryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLatestBountyEntryQuery, GetLatestBountyEntryQueryVariables>(
    GetLatestBountyEntryDocument,
    options
  )
}
export function useGetLatestBountyEntryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLatestBountyEntryQuery, GetLatestBountyEntryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLatestBountyEntryQuery, GetLatestBountyEntryQueryVariables>(
    GetLatestBountyEntryDocument,
    options
  )
}
export type GetLatestBountyEntryQueryHookResult = ReturnType<typeof useGetLatestBountyEntryQuery>
export type GetLatestBountyEntryLazyQueryHookResult = ReturnType<typeof useGetLatestBountyEntryLazyQuery>
export type GetLatestBountyEntryQueryResult = Apollo.QueryResult<
  GetLatestBountyEntryQuery,
  GetLatestBountyEntryQueryVariables
>
