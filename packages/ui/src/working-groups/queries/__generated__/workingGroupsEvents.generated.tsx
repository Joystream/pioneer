import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AppliedOnOpeningEventFieldsFragment = {
  __typename: 'AppliedOnOpeningEvent'
  id: string
  createdAt: any
  application: {
    __typename: 'WorkingGroupApplication'
    applicant: { __typename: 'Membership'; id: string; handle: string }
  }
  opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
  group: { __typename: 'WorkingGroup'; name: string }
}

export type ApplicationWithdrawnEventFieldsFragment = {
  __typename: 'ApplicationWithdrawnEvent'
  id: string
  createdAt: any
  application: {
    __typename: 'WorkingGroupApplication'
    opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
    applicant: { __typename: 'Membership'; id: string; handle: string }
  }
  group: { __typename: 'WorkingGroup'; name: string }
}

export type BudgetSpendingActivityEventFieldsFragment = {
  __typename: 'BudgetSpendingEvent'
  id: string
  createdAt: any
  amount: string
  group: { __typename: 'WorkingGroup'; name: string }
}

export type StakeDecreasedEventFieldsFragment = {
  __typename: 'StakeDecreasedEvent'
  id: string
  createdAt: any
  amount: string
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type StakeIncreasedEventFieldsFragment = {
  __typename: 'StakeIncreasedEvent'
  id: string
  createdAt: any
  amount: string
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type StakeSlashedEventFieldsFragment = {
  __typename: 'StakeSlashedEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; id: string; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type OpeningFilledEventFieldsFragment = {
  __typename: 'OpeningFilledEvent'
  id: string
  createdAt: any
  opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
  group: { __typename: 'WorkingGroup'; name: string }
  workersHired: Array<{ __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }>
}

export type WorkerStartedLeavingEventFieldsFragment = {
  __typename: 'WorkerStartedLeavingEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: {
    __typename: 'Worker'
    status:
      | { __typename: 'WorkerStatusActive' }
      | { __typename: 'WorkerStatusLeaving' }
      | { __typename: 'WorkerStatusLeft' }
      | { __typename: 'WorkerStatusTerminated' }
    membership: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type WorkerExitedEventFieldsFragment = {
  __typename: 'WorkerExitedEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type StatusTextChangedEventFieldsFragment = {
  __typename: 'StatusTextChangedEvent'
  id: string
  createdAt: any
  workinggroupmetadatasetInEvent?: Array<{ __typename: 'WorkingGroupMetadata'; id: string }> | null
  upcomingworkinggroupopeningcreatedInEvent?: Array<{ __typename: 'UpcomingWorkingGroupOpening'; id: string }> | null
  group: { __typename: 'WorkingGroup'; name: string }
}

export type OpeningAddedEventFieldsFragment = {
  __typename: 'OpeningAddedEvent'
  id: string
  createdAt: any
  opening: {
    __typename: 'WorkingGroupOpening'
    id: string
    type: Types.WorkingGroupOpeningType
    group: { __typename: 'WorkingGroup'; name: string }
  }
}

export type OpeningCanceledEventFieldsFragment = {
  __typename: 'OpeningCanceledEvent'
  id: string
  createdAt: any
  opening: {
    __typename: 'WorkingGroupOpening'
    id: string
    type: Types.WorkingGroupOpeningType
    group: { __typename: 'WorkingGroup'; name: string }
  }
}

export type BudgetSetEventFieldsFragment = {
  __typename: 'BudgetSetEvent'
  id: string
  createdAt: any
  newBudget: string
  group: { __typename: 'WorkingGroup'; name: string }
}

export type TerminatedWorkerEventFieldsFragment = {
  __typename: 'TerminatedWorkerEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type TerminatedLeaderEventFieldsFragment = {
  __typename: 'TerminatedLeaderEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type WorkerRewardAmountUpdatedEventFragment = {
  __typename: 'WorkerRewardAmountUpdatedEvent'
  id: string
  createdAt: any
  newRewardPerBlock: string
  worker: {
    __typename: 'Worker'
    membership: { __typename: 'Membership'; id: string; handle: string }
    application: {
      __typename: 'WorkingGroupApplication'
      opening: {
        __typename: 'WorkingGroupOpening'
        groupId: string
        metadata: { __typename: 'WorkingGroupOpeningMetadata'; title?: string | null }
      }
    }
  }
}

export type WorkerRewardAccountUpdatedEventFragment = {
  __typename: 'WorkerRewardAccountUpdatedEvent'
  id: string
  createdAt: any
  newRewardAccount: string
}

export type GetMemberRoleEventsQueryVariables = Types.Exact<{
  worker_in?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
  application_in?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetMemberRoleEventsQuery = {
  __typename: 'Query'
  appliedOnOpeningEvents: Array<{
    __typename: 'AppliedOnOpeningEvent'
    id: string
    createdAt: any
    application: {
      __typename: 'WorkingGroupApplication'
      applicant: { __typename: 'Membership'; id: string; handle: string }
    }
    opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  applicationWithdrawnEvents: Array<{
    __typename: 'ApplicationWithdrawnEvent'
    id: string
    createdAt: any
    application: {
      __typename: 'WorkingGroupApplication'
      opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
      applicant: { __typename: 'Membership'; id: string; handle: string }
    }
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  stakeDecreasedEvents: Array<{
    __typename: 'StakeDecreasedEvent'
    id: string
    createdAt: any
    amount: string
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  stakeIncreasedEvents: Array<{
    __typename: 'StakeIncreasedEvent'
    id: string
    createdAt: any
    amount: string
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  stakeSlashedEvents: Array<{
    __typename: 'StakeSlashedEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; id: string; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  workerStartedLeavingEvents: Array<{
    __typename: 'WorkerStartedLeavingEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: {
      __typename: 'Worker'
      status:
        | { __typename: 'WorkerStatusActive' }
        | { __typename: 'WorkerStatusLeaving' }
        | { __typename: 'WorkerStatusLeft' }
        | { __typename: 'WorkerStatusTerminated' }
      membership: { __typename: 'Membership'; id: string; handle: string }
    }
  }>
  workerExitedEvents: Array<{
    __typename: 'WorkerExitedEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  terminatedWorkerEvents: Array<{
    __typename: 'TerminatedWorkerEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  terminatedLeaderEvents: Array<{
    __typename: 'TerminatedLeaderEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  workerRewardAccountUpdatedEvents: Array<{
    __typename: 'WorkerRewardAccountUpdatedEvent'
    id: string
    createdAt: any
    newRewardAccount: string
  }>
  workerRewardAmountUpdatedEvents: Array<{
    __typename: 'WorkerRewardAmountUpdatedEvent'
    id: string
    createdAt: any
    newRewardPerBlock: string
    worker: {
      __typename: 'Worker'
      membership: { __typename: 'Membership'; id: string; handle: string }
      application: {
        __typename: 'WorkingGroupApplication'
        opening: {
          __typename: 'WorkingGroupOpening'
          groupId: string
          metadata: { __typename: 'WorkingGroupOpeningMetadata'; title?: string | null }
        }
      }
    }
  }>
}

export type GetGroupEventsQueryVariables = Types.Exact<{
  group_eq: Types.Scalars['ID']
}>

export type GetGroupEventsQuery = {
  __typename: 'Query'
  appliedOnOpeningEvents: Array<{
    __typename: 'AppliedOnOpeningEvent'
    id: string
    createdAt: any
    application: {
      __typename: 'WorkingGroupApplication'
      applicant: { __typename: 'Membership'; id: string; handle: string }
    }
    opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  applicationWithdrawnEvents: Array<{
    __typename: 'ApplicationWithdrawnEvent'
    id: string
    createdAt: any
    application: {
      __typename: 'WorkingGroupApplication'
      opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
      applicant: { __typename: 'Membership'; id: string; handle: string }
    }
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  budgetSpendingEvents: Array<{
    __typename: 'BudgetSpendingEvent'
    id: string
    createdAt: any
    amount: string
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  stakeDecreasedEvents: Array<{
    __typename: 'StakeDecreasedEvent'
    id: string
    createdAt: any
    amount: string
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  stakeIncreasedEvents: Array<{
    __typename: 'StakeIncreasedEvent'
    id: string
    createdAt: any
    amount: string
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  openingAddedEvents: Array<{
    __typename: 'OpeningAddedEvent'
    id: string
    createdAt: any
    opening: {
      __typename: 'WorkingGroupOpening'
      id: string
      type: Types.WorkingGroupOpeningType
      group: { __typename: 'WorkingGroup'; name: string }
    }
  }>
  openingCanceledEvents: Array<{
    __typename: 'OpeningCanceledEvent'
    id: string
    createdAt: any
    opening: {
      __typename: 'WorkingGroupOpening'
      id: string
      type: Types.WorkingGroupOpeningType
      group: { __typename: 'WorkingGroup'; name: string }
    }
  }>
  openingFilledEvents: Array<{
    __typename: 'OpeningFilledEvent'
    id: string
    createdAt: any
    opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
    group: { __typename: 'WorkingGroup'; name: string }
    workersHired: Array<{ __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }>
  }>
  workerExitedEvents: Array<{
    __typename: 'WorkerExitedEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  statusTextChangedEvents: Array<{
    __typename: 'StatusTextChangedEvent'
    id: string
    createdAt: any
    workinggroupmetadatasetInEvent?: Array<{ __typename: 'WorkingGroupMetadata'; id: string }> | null
    upcomingworkinggroupopeningcreatedInEvent?: Array<{ __typename: 'UpcomingWorkingGroupOpening'; id: string }> | null
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  budgetSetEvents: Array<{
    __typename: 'BudgetSetEvent'
    id: string
    createdAt: any
    newBudget: string
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  stakeSlashedEvents: Array<{
    __typename: 'StakeSlashedEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; id: string; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  terminatedWorkerEvents: Array<{
    __typename: 'TerminatedWorkerEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  terminatedLeaderEvents: Array<{
    __typename: 'TerminatedLeaderEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  workerRewardAmountUpdatedEvents: Array<{
    __typename: 'WorkerRewardAmountUpdatedEvent'
    id: string
    createdAt: any
    newRewardPerBlock: string
    worker: {
      __typename: 'Worker'
      membership: { __typename: 'Membership'; id: string; handle: string }
      application: {
        __typename: 'WorkingGroupApplication'
        opening: {
          __typename: 'WorkingGroupOpening'
          groupId: string
          metadata: { __typename: 'WorkingGroupOpeningMetadata'; title?: string | null }
        }
      }
    }
  }>
}

export type GetWorkerEventsQueryVariables = Types.Exact<{
  workerId?: Types.InputMaybe<Types.Scalars['ID']>
  applicationId?: Types.InputMaybe<Types.Scalars['ID']>
}>

export type GetWorkerEventsQuery = {
  __typename: 'Query'
  appliedOnOpeningEvents: Array<{
    __typename: 'AppliedOnOpeningEvent'
    id: string
    createdAt: any
    application: {
      __typename: 'WorkingGroupApplication'
      applicant: { __typename: 'Membership'; id: string; handle: string }
    }
    opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  applicationWithdrawnEvents: Array<{
    __typename: 'ApplicationWithdrawnEvent'
    id: string
    createdAt: any
    application: {
      __typename: 'WorkingGroupApplication'
      opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
      applicant: { __typename: 'Membership'; id: string; handle: string }
    }
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  stakeDecreasedEvents: Array<{
    __typename: 'StakeDecreasedEvent'
    id: string
    createdAt: any
    amount: string
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  stakeIncreasedEvents: Array<{
    __typename: 'StakeIncreasedEvent'
    id: string
    createdAt: any
    amount: string
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  stakeSlashedEvents: Array<{
    __typename: 'StakeSlashedEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; id: string; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  workerStartedLeavingEvents: Array<{
    __typename: 'WorkerStartedLeavingEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: {
      __typename: 'Worker'
      status:
        | { __typename: 'WorkerStatusActive' }
        | { __typename: 'WorkerStatusLeaving' }
        | { __typename: 'WorkerStatusLeft' }
        | { __typename: 'WorkerStatusTerminated' }
      membership: { __typename: 'Membership'; id: string; handle: string }
    }
  }>
  workerExitedEvents: Array<{
    __typename: 'WorkerExitedEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  terminatedWorkerEvents: Array<{
    __typename: 'TerminatedWorkerEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  terminatedLeaderEvents: Array<{
    __typename: 'TerminatedLeaderEvent'
    id: string
    createdAt: any
    group: { __typename: 'WorkingGroup'; name: string }
    worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
}

export type GetOpeningsEventsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetOpeningsEventsQuery = {
  __typename: 'Query'
  events: Array<
    | { __typename: 'AnnouncingPeriodStartedEvent' }
    | {
        __typename: 'ApplicationWithdrawnEvent'
        id: string
        createdAt: any
        application: {
          __typename: 'WorkingGroupApplication'
          opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
          applicant: { __typename: 'Membership'; id: string; handle: string }
        }
        group: { __typename: 'WorkingGroup'; name: string }
      }
    | {
        __typename: 'AppliedOnOpeningEvent'
        id: string
        createdAt: any
        application: {
          __typename: 'WorkingGroupApplication'
          applicant: { __typename: 'Membership'; id: string; handle: string }
        }
        opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
        group: { __typename: 'WorkingGroup'; name: string }
      }
    | { __typename: 'AuctionBidCanceledEvent' }
    | { __typename: 'AuctionBidMadeEvent' }
    | { __typename: 'AuctionCanceledEvent' }
    | { __typename: 'BidMadeCompletingAuctionEvent' }
    | { __typename: 'BountyCanceledEvent' }
    | { __typename: 'BountyCreatedEvent' }
    | { __typename: 'BountyCreatorCherryWithdrawalEvent' }
    | { __typename: 'BountyFundedEvent' }
    | { __typename: 'BountyFundingWithdrawalEvent' }
    | { __typename: 'BountyMaxFundingReachedEvent' }
    | { __typename: 'BountyRemovedEvent' }
    | { __typename: 'BountyVetoedEvent' }
    | { __typename: 'BudgetBalanceSetEvent' }
    | { __typename: 'BudgetIncrementUpdatedEvent' }
    | { __typename: 'BudgetRefillEvent' }
    | { __typename: 'BudgetRefillPlannedEvent' }
    | {
        __typename: 'BudgetSetEvent'
        id: string
        createdAt: any
        newBudget: string
        group: { __typename: 'WorkingGroup'; name: string }
      }
    | {
        __typename: 'BudgetSpendingEvent'
        id: string
        createdAt: any
        amount: string
        group: { __typename: 'WorkingGroup'; name: string }
      }
    | { __typename: 'BudgetUpdatedEvent' }
    | { __typename: 'BuyNowCanceledEvent' }
    | { __typename: 'BuyNowPriceUpdatedEvent' }
    | { __typename: 'CandidacyNoteSetEvent' }
    | { __typename: 'CandidacyStakeReleaseEvent' }
    | { __typename: 'CandidacyWithdrawEvent' }
    | { __typename: 'CategoryArchivalStatusUpdatedEvent' }
    | { __typename: 'CategoryCreatedEvent' }
    | { __typename: 'CategoryDeletedEvent' }
    | { __typename: 'CategoryMembershipOfModeratorUpdatedEvent' }
    | { __typename: 'CategoryStickyThreadUpdateEvent' }
    | { __typename: 'ChannelFundsWithdrawnEvent' }
    | { __typename: 'ChannelRewardClaimedAndWithdrawnEvent' }
    | { __typename: 'ChannelRewardClaimedEvent' }
    | { __typename: 'CommentCreatedEvent' }
    | { __typename: 'CommentDeletedEvent' }
    | { __typename: 'CommentModeratedEvent' }
    | { __typename: 'CommentPinnedEvent' }
    | { __typename: 'CommentReactedEvent' }
    | { __typename: 'CommentTextUpdatedEvent' }
    | { __typename: 'CouncilBudgetFundedEvent' }
    | { __typename: 'CouncilorRewardUpdatedEvent' }
    | { __typename: 'EnglishAuctionSettledEvent' }
    | { __typename: 'EnglishAuctionStartedEvent' }
    | { __typename: 'InitialInvitationBalanceUpdatedEvent' }
    | { __typename: 'InitialInvitationCountUpdatedEvent' }
    | { __typename: 'InvitesTransferredEvent' }
    | { __typename: 'LeaderInvitationQuotaUpdatedEvent' }
    | { __typename: 'LeaderSetEvent' }
    | { __typename: 'LeaderUnsetEvent' }
    | { __typename: 'MemberAccountsUpdatedEvent' }
    | { __typename: 'MemberBannedFromChannelEvent' }
    | { __typename: 'MemberCreatedEvent' }
    | { __typename: 'MemberInvitedEvent' }
    | { __typename: 'MemberProfileUpdatedEvent' }
    | { __typename: 'MemberVerificationStatusUpdatedEvent' }
    | { __typename: 'MembershipBoughtEvent' }
    | { __typename: 'MembershipGiftedEvent' }
    | { __typename: 'MembershipPriceUpdatedEvent' }
    | { __typename: 'MetaprotocolTransactionStatusEvent' }
    | { __typename: 'NewCandidateEvent' }
    | { __typename: 'NewCouncilElectedEvent' }
    | { __typename: 'NewCouncilNotElectedEvent' }
    | { __typename: 'NewMissedRewardLevelReachedEvent' }
    | { __typename: 'NftBoughtEvent' }
    | { __typename: 'NftIssuedEvent' }
    | { __typename: 'NftSlingedBackToTheOriginalArtistEvent' }
    | { __typename: 'NotEnoughCandidatesEvent' }
    | { __typename: 'OfferAcceptedEvent' }
    | { __typename: 'OfferCanceledEvent' }
    | { __typename: 'OfferStartedEvent' }
    | { __typename: 'OpenAuctionBidAcceptedEvent' }
    | { __typename: 'OpenAuctionStartedEvent' }
    | {
        __typename: 'OpeningAddedEvent'
        id: string
        createdAt: any
        opening: {
          __typename: 'WorkingGroupOpening'
          id: string
          type: Types.WorkingGroupOpeningType
          group: { __typename: 'WorkingGroup'; name: string }
        }
      }
    | {
        __typename: 'OpeningCanceledEvent'
        id: string
        createdAt: any
        opening: {
          __typename: 'WorkingGroupOpening'
          id: string
          type: Types.WorkingGroupOpeningType
          group: { __typename: 'WorkingGroup'; name: string }
        }
      }
    | {
        __typename: 'OpeningFilledEvent'
        id: string
        createdAt: any
        opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
        group: { __typename: 'WorkingGroup'; name: string }
        workersHired: Array<{
          __typename: 'Worker'
          membership: { __typename: 'Membership'; id: string; handle: string }
        }>
      }
    | { __typename: 'OracleJudgmentSubmittedEvent' }
    | { __typename: 'PostAddedEvent' }
    | { __typename: 'PostDeletedEvent' }
    | { __typename: 'PostModeratedEvent' }
    | { __typename: 'PostTextUpdatedEvent' }
    | { __typename: 'ProposalCancelledEvent' }
    | { __typename: 'ProposalCreatedEvent' }
    | { __typename: 'ProposalDecisionMadeEvent' }
    | { __typename: 'ProposalDiscussionPostCreatedEvent' }
    | { __typename: 'ProposalDiscussionPostDeletedEvent' }
    | { __typename: 'ProposalDiscussionPostUpdatedEvent' }
    | { __typename: 'ProposalDiscussionThreadModeChangedEvent' }
    | { __typename: 'ProposalExecutedEvent' }
    | { __typename: 'ProposalStatusUpdatedEvent' }
    | { __typename: 'ProposalVotedEvent' }
    | { __typename: 'ReferendumFinishedEvent' }
    | { __typename: 'ReferendumStartedEvent' }
    | { __typename: 'ReferendumStartedForcefullyEvent' }
    | { __typename: 'ReferralCutUpdatedEvent' }
    | { __typename: 'RequestFundedEvent' }
    | { __typename: 'RevealingStageStartedEvent' }
    | { __typename: 'RewardPaidEvent' }
    | { __typename: 'RewardPaymentEvent' }
    | {
        __typename: 'StakeDecreasedEvent'
        id: string
        createdAt: any
        amount: string
        worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | {
        __typename: 'StakeIncreasedEvent'
        id: string
        createdAt: any
        amount: string
        worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | { __typename: 'StakeReleasedEvent' }
    | {
        __typename: 'StakeSlashedEvent'
        id: string
        createdAt: any
        group: { __typename: 'WorkingGroup'; id: string; name: string }
        worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | { __typename: 'StakingAccountAddedEvent' }
    | { __typename: 'StakingAccountConfirmedEvent' }
    | { __typename: 'StakingAccountRemovedEvent' }
    | {
        __typename: 'StatusTextChangedEvent'
        id: string
        createdAt: any
        workinggroupmetadatasetInEvent?: Array<{ __typename: 'WorkingGroupMetadata'; id: string }> | null
        upcomingworkinggroupopeningcreatedInEvent?: Array<{
          __typename: 'UpcomingWorkingGroupOpening'
          id: string
        }> | null
        group: { __typename: 'WorkingGroup'; name: string }
      }
    | {
        __typename: 'TerminatedLeaderEvent'
        id: string
        createdAt: any
        group: { __typename: 'WorkingGroup'; name: string }
        worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | {
        __typename: 'TerminatedWorkerEvent'
        id: string
        createdAt: any
        group: { __typename: 'WorkingGroup'; name: string }
        worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | { __typename: 'ThreadCreatedEvent' }
    | { __typename: 'ThreadDeletedEvent' }
    | { __typename: 'ThreadMetadataUpdatedEvent' }
    | { __typename: 'ThreadModeratedEvent' }
    | { __typename: 'ThreadMovedEvent' }
    | { __typename: 'VideoReactedEvent' }
    | { __typename: 'VideoReactionsPreferenceEvent' }
    | { __typename: 'VoteCastEvent' }
    | { __typename: 'VoteRevealedEvent' }
    | { __typename: 'VotingPeriodStartedEvent' }
    | { __typename: 'WorkEntrantFundsWithdrawnEvent' }
    | { __typename: 'WorkEntryAnnouncedEvent' }
    | { __typename: 'WorkEntrySlashedEvent' }
    | { __typename: 'WorkEntryWithdrawnEvent' }
    | { __typename: 'WorkSubmittedEvent' }
    | {
        __typename: 'WorkerExitedEvent'
        id: string
        createdAt: any
        group: { __typename: 'WorkingGroup'; name: string }
        worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | { __typename: 'WorkerRewardAccountUpdatedEvent' }
    | { __typename: 'WorkerRewardAmountUpdatedEvent' }
    | { __typename: 'WorkerRoleAccountUpdatedEvent' }
    | { __typename: 'WorkerStartedLeavingEvent' }
  >
}

export const AppliedOnOpeningEventFieldsFragmentDoc = gql`
  fragment AppliedOnOpeningEventFields on AppliedOnOpeningEvent {
    id
    createdAt
    application {
      applicant {
        id
        handle
      }
    }
    opening {
      id
      type
    }
    group {
      name
    }
  }
`
export const ApplicationWithdrawnEventFieldsFragmentDoc = gql`
  fragment ApplicationWithdrawnEventFields on ApplicationWithdrawnEvent {
    id
    createdAt
    application {
      opening {
        id
        type
      }
      applicant {
        id
        handle
      }
    }
    group {
      name
    }
  }
`
export const BudgetSpendingActivityEventFieldsFragmentDoc = gql`
  fragment BudgetSpendingActivityEventFields on BudgetSpendingEvent {
    id
    createdAt
    amount
    group {
      name
    }
  }
`
export const StakeDecreasedEventFieldsFragmentDoc = gql`
  fragment StakeDecreasedEventFields on StakeDecreasedEvent {
    id
    createdAt
    worker {
      membership {
        id
        handle
      }
    }
    amount
  }
`
export const StakeIncreasedEventFieldsFragmentDoc = gql`
  fragment StakeIncreasedEventFields on StakeIncreasedEvent {
    id
    createdAt
    worker {
      membership {
        id
        handle
      }
    }
    amount
  }
`
export const StakeSlashedEventFieldsFragmentDoc = gql`
  fragment StakeSlashedEventFields on StakeSlashedEvent {
    id
    createdAt
    group {
      id
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const OpeningFilledEventFieldsFragmentDoc = gql`
  fragment OpeningFilledEventFields on OpeningFilledEvent {
    id
    createdAt
    opening {
      id
      type
    }
    group {
      name
    }
    workersHired {
      membership {
        id
        handle
      }
    }
  }
`
export const WorkerStartedLeavingEventFieldsFragmentDoc = gql`
  fragment WorkerStartedLeavingEventFields on WorkerStartedLeavingEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      status {
        __typename
      }
      membership {
        id
        handle
      }
    }
  }
`
export const WorkerExitedEventFieldsFragmentDoc = gql`
  fragment WorkerExitedEventFields on WorkerExitedEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const StatusTextChangedEventFieldsFragmentDoc = gql`
  fragment StatusTextChangedEventFields on StatusTextChangedEvent {
    id
    createdAt
    workinggroupmetadatasetInEvent {
      id
    }
    upcomingworkinggroupopeningcreatedInEvent {
      id
    }
    group {
      name
    }
  }
`
export const OpeningAddedEventFieldsFragmentDoc = gql`
  fragment OpeningAddedEventFields on OpeningAddedEvent {
    id
    createdAt
    opening {
      id
      type
      group {
        name
      }
    }
  }
`
export const OpeningCanceledEventFieldsFragmentDoc = gql`
  fragment OpeningCanceledEventFields on OpeningCanceledEvent {
    id
    createdAt
    opening {
      id
      type
      group {
        name
      }
    }
  }
`
export const BudgetSetEventFieldsFragmentDoc = gql`
  fragment BudgetSetEventFields on BudgetSetEvent {
    id
    createdAt
    group {
      name
    }
    newBudget
  }
`
export const TerminatedWorkerEventFieldsFragmentDoc = gql`
  fragment TerminatedWorkerEventFields on TerminatedWorkerEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const TerminatedLeaderEventFieldsFragmentDoc = gql`
  fragment TerminatedLeaderEventFields on TerminatedLeaderEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const WorkerRewardAmountUpdatedEventFragmentDoc = gql`
  fragment WorkerRewardAmountUpdatedEvent on WorkerRewardAmountUpdatedEvent {
    id
    createdAt
    newRewardPerBlock
    worker {
      membership {
        id
        handle
      }
      application {
        opening {
          groupId
          metadata {
            title
          }
        }
      }
    }
  }
`
export const WorkerRewardAccountUpdatedEventFragmentDoc = gql`
  fragment WorkerRewardAccountUpdatedEvent on WorkerRewardAccountUpdatedEvent {
    id
    createdAt
    newRewardAccount
  }
`
export const GetMemberRoleEventsDocument = gql`
  query GetMemberRoleEvents($worker_in: [ID!], $application_in: [ID!]) {
    appliedOnOpeningEvents(where: { application: { id_in: $application_in } }) {
      ...AppliedOnOpeningEventFields
    }
    applicationWithdrawnEvents(where: { application: { id_in: $application_in } }) {
      ...ApplicationWithdrawnEventFields
    }
    stakeDecreasedEvents(where: { worker: { id_in: $worker_in } }) {
      ...StakeDecreasedEventFields
    }
    stakeIncreasedEvents(where: { worker: { id_in: $worker_in } }) {
      ...StakeIncreasedEventFields
    }
    stakeSlashedEvents(where: { worker: { id_in: $worker_in } }) {
      ...StakeSlashedEventFields
    }
    workerStartedLeavingEvents(where: { worker: { id_in: $worker_in } }) {
      ...WorkerStartedLeavingEventFields
    }
    workerExitedEvents(where: { worker: { id_in: $worker_in } }) {
      ...WorkerExitedEventFields
    }
    terminatedWorkerEvents(where: { worker: { id_in: $worker_in } }) {
      ...TerminatedWorkerEventFields
    }
    terminatedLeaderEvents(where: { worker: { id_in: $worker_in } }) {
      ...TerminatedLeaderEventFields
    }
    workerRewardAccountUpdatedEvents(where: { worker: { id_in: $worker_in } }) {
      ...WorkerRewardAccountUpdatedEvent
    }
    workerRewardAmountUpdatedEvents(where: { worker: { id_in: $worker_in } }) {
      ...WorkerRewardAmountUpdatedEvent
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${WorkerStartedLeavingEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
  ${WorkerRewardAccountUpdatedEventFragmentDoc}
  ${WorkerRewardAmountUpdatedEventFragmentDoc}
`

/**
 * __useGetMemberRoleEventsQuery__
 *
 * To run a query within a React component, call `useGetMemberRoleEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberRoleEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberRoleEventsQuery({
 *   variables: {
 *      worker_in: // value for 'worker_in'
 *      application_in: // value for 'application_in'
 *   },
 * });
 */
export function useGetMemberRoleEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>(
    GetMemberRoleEventsDocument,
    options
  )
}
export function useGetMemberRoleEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>(
    GetMemberRoleEventsDocument,
    options
  )
}
export type GetMemberRoleEventsQueryHookResult = ReturnType<typeof useGetMemberRoleEventsQuery>
export type GetMemberRoleEventsLazyQueryHookResult = ReturnType<typeof useGetMemberRoleEventsLazyQuery>
export type GetMemberRoleEventsQueryResult = Apollo.QueryResult<
  GetMemberRoleEventsQuery,
  GetMemberRoleEventsQueryVariables
>
export const GetGroupEventsDocument = gql`
  query GetGroupEvents($group_eq: ID!) {
    appliedOnOpeningEvents(where: { group: { id_eq: $group_eq } }) {
      ...AppliedOnOpeningEventFields
    }
    applicationWithdrawnEvents(where: { group: { id_eq: $group_eq } }) {
      ...ApplicationWithdrawnEventFields
    }
    budgetSpendingEvents(where: { group: { id_eq: $group_eq } }) {
      ...BudgetSpendingActivityEventFields
    }
    stakeDecreasedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StakeDecreasedEventFields
    }
    stakeIncreasedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StakeIncreasedEventFields
    }
    openingAddedEvents(where: { group: { id_eq: $group_eq } }) {
      ...OpeningAddedEventFields
    }
    openingCanceledEvents(where: { group: { id_eq: $group_eq } }) {
      ...OpeningCanceledEventFields
    }
    openingFilledEvents(where: { group: { id_eq: $group_eq } }) {
      ...OpeningFilledEventFields
    }
    workerExitedEvents(where: { group: { id_eq: $group_eq } }) {
      ...WorkerExitedEventFields
    }
    statusTextChangedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StatusTextChangedEventFields
    }
    budgetSetEvents(where: { group: { id_eq: $group_eq } }) {
      ...BudgetSetEventFields
    }
    stakeSlashedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StakeSlashedEventFields
    }
    terminatedWorkerEvents(where: { group: { id_eq: $group_eq } }) {
      ...TerminatedWorkerEventFields
    }
    terminatedLeaderEvents(where: { group: { id_eq: $group_eq } }) {
      ...TerminatedLeaderEventFields
    }
    workerRewardAmountUpdatedEvents(where: { group: { id_eq: $group_eq } }) {
      ...WorkerRewardAmountUpdatedEvent
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${BudgetSpendingActivityEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${OpeningAddedEventFieldsFragmentDoc}
  ${OpeningCanceledEventFieldsFragmentDoc}
  ${OpeningFilledEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${StatusTextChangedEventFieldsFragmentDoc}
  ${BudgetSetEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
  ${WorkerRewardAmountUpdatedEventFragmentDoc}
`

/**
 * __useGetGroupEventsQuery__
 *
 * To run a query within a React component, call `useGetGroupEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupEventsQuery({
 *   variables: {
 *      group_eq: // value for 'group_eq'
 *   },
 * });
 */
export function useGetGroupEventsQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupEventsQuery, GetGroupEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetGroupEventsQuery, GetGroupEventsQueryVariables>(GetGroupEventsDocument, options)
}
export function useGetGroupEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupEventsQuery, GetGroupEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetGroupEventsQuery, GetGroupEventsQueryVariables>(GetGroupEventsDocument, options)
}
export type GetGroupEventsQueryHookResult = ReturnType<typeof useGetGroupEventsQuery>
export type GetGroupEventsLazyQueryHookResult = ReturnType<typeof useGetGroupEventsLazyQuery>
export type GetGroupEventsQueryResult = Apollo.QueryResult<GetGroupEventsQuery, GetGroupEventsQueryVariables>
export const GetWorkerEventsDocument = gql`
  query GetWorkerEvents($workerId: ID, $applicationId: ID) {
    appliedOnOpeningEvents(where: { application: { id_eq: $applicationId } }) {
      ...AppliedOnOpeningEventFields
    }
    applicationWithdrawnEvents(where: { application: { id_eq: $applicationId } }) {
      ...ApplicationWithdrawnEventFields
    }
    stakeDecreasedEvents(where: { worker: { id_eq: $workerId } }) {
      ...StakeDecreasedEventFields
    }
    stakeIncreasedEvents(where: { worker: { id_eq: $workerId } }) {
      ...StakeIncreasedEventFields
    }
    stakeSlashedEvents(where: { worker: { id_eq: $workerId } }) {
      ...StakeSlashedEventFields
    }
    workerStartedLeavingEvents(where: { worker: { id_eq: $workerId } }) {
      ...WorkerStartedLeavingEventFields
    }
    workerExitedEvents(where: { worker: { id_eq: $workerId } }) {
      ...WorkerExitedEventFields
    }
    terminatedWorkerEvents(where: { worker: { id_eq: $workerId } }) {
      ...TerminatedWorkerEventFields
    }
    terminatedLeaderEvents(where: { worker: { id_eq: $workerId } }) {
      ...TerminatedLeaderEventFields
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${WorkerStartedLeavingEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
`

/**
 * __useGetWorkerEventsQuery__
 *
 * To run a query within a React component, call `useGetWorkerEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerEventsQuery({
 *   variables: {
 *      workerId: // value for 'workerId'
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useGetWorkerEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>(GetWorkerEventsDocument, options)
}
export function useGetWorkerEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>(GetWorkerEventsDocument, options)
}
export type GetWorkerEventsQueryHookResult = ReturnType<typeof useGetWorkerEventsQuery>
export type GetWorkerEventsLazyQueryHookResult = ReturnType<typeof useGetWorkerEventsLazyQuery>
export type GetWorkerEventsQueryResult = Apollo.QueryResult<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>
export const GetOpeningsEventsDocument = gql`
  query GetOpeningsEvents {
    events(
      where: {
        type_in: [
          AppliedOnOpeningEvent
          ApplicationWithdrawnEvent
          BudgetSpendingEvent
          StakeDecreasedEvent
          StakeIncreasedEvent
          OpeningAddedEvent
          OpeningCanceledEvent
          OpeningFilledEvent
          WorkerExitedEvent
          StatusTextChangedEvent
          BudgetSetEvent
          StakeSlashedEvent
          TerminatedLeaderEvent
          TerminatedWorkerEvent
        ]
      }
      limit: 25
      orderBy: [createdAt_DESC]
    ) {
      ... on AppliedOnOpeningEvent {
        ...AppliedOnOpeningEventFields
      }
      ... on ApplicationWithdrawnEvent {
        ...ApplicationWithdrawnEventFields
      }
      ... on BudgetSpendingEvent {
        ...BudgetSpendingActivityEventFields
      }
      ... on StakeDecreasedEvent {
        ...StakeDecreasedEventFields
      }
      ... on StakeIncreasedEvent {
        ...StakeIncreasedEventFields
      }
      ... on OpeningAddedEvent {
        ...OpeningAddedEventFields
      }
      ... on OpeningCanceledEvent {
        ...OpeningCanceledEventFields
      }
      ... on OpeningFilledEvent {
        ...OpeningFilledEventFields
      }
      ... on WorkerExitedEvent {
        ...WorkerExitedEventFields
      }
      ... on StatusTextChangedEvent {
        ...StatusTextChangedEventFields
      }
      ... on BudgetSetEvent {
        ...BudgetSetEventFields
      }
      ... on StakeSlashedEvent {
        ...StakeSlashedEventFields
      }
      ... on TerminatedWorkerEvent {
        ...TerminatedWorkerEventFields
      }
      ... on TerminatedLeaderEvent {
        ...TerminatedLeaderEventFields
      }
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${BudgetSpendingActivityEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${OpeningAddedEventFieldsFragmentDoc}
  ${OpeningCanceledEventFieldsFragmentDoc}
  ${OpeningFilledEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${StatusTextChangedEventFieldsFragmentDoc}
  ${BudgetSetEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
`

/**
 * __useGetOpeningsEventsQuery__
 *
 * To run a query within a React component, call `useGetOpeningsEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpeningsEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpeningsEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOpeningsEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetOpeningsEventsQuery, GetOpeningsEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetOpeningsEventsQuery, GetOpeningsEventsQueryVariables>(GetOpeningsEventsDocument, options)
}
export function useGetOpeningsEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOpeningsEventsQuery, GetOpeningsEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetOpeningsEventsQuery, GetOpeningsEventsQueryVariables>(
    GetOpeningsEventsDocument,
    options
  )
}
export type GetOpeningsEventsQueryHookResult = ReturnType<typeof useGetOpeningsEventsQuery>
export type GetOpeningsEventsLazyQueryHookResult = ReturnType<typeof useGetOpeningsEventsLazyQuery>
export type GetOpeningsEventsQueryResult = Apollo.QueryResult<GetOpeningsEventsQuery, GetOpeningsEventsQueryVariables>
