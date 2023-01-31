import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type PostAddedEventFieldsFragment = {
  __typename: 'PostAddedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ForumPost'
    id: string
    thread: { __typename: 'ForumThread'; id: string }
    author: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type PostTextUpdatedEventFieldsFragment = {
  __typename: 'PostTextUpdatedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ForumPost'
    id: string
    thread: { __typename: 'ForumThread'; id: string }
    author: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type PostDeletedEventFieldsFragment = {
  __typename: 'PostDeletedEvent'
  id: string
  createdAt: any
  posts: Array<{
    __typename: 'ForumPost'
    id: string
    thread: { __typename: 'ForumThread'; id: string; title: string }
  }>
  actor: { __typename: 'Membership'; id: string; handle: string }
}

export type PostModeratedEventFieldsFragment = {
  __typename: 'PostModeratedEvent'
  id: string
  createdAt: any
  post: { __typename: 'ForumPost'; id: string; thread: { __typename: 'ForumThread'; id: string } }
  actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type ThreadCreatedEventFieldsFragment = {
  __typename: 'ThreadCreatedEvent'
  id: string
  createdAt: any
  thread: {
    __typename: 'ForumThread'
    id: string
    title: string
    author: { __typename: 'Membership'; id: string; handle: string }
    category: { __typename: 'ForumCategory'; id: string; title: string }
  }
}

export type ThreadDeletedEventFieldsFragment = {
  __typename: 'ThreadDeletedEvent'
  id: string
  createdAt: any
  thread: { __typename: 'ForumThread'; id: string; title: string }
}

export type ThreadModeratedEventFieldsFragment = {
  __typename: 'ThreadModeratedEvent'
  id: string
  createdAt: any
  thread: { __typename: 'ForumThread'; id: string; title: string }
  actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type CategoryCreatedEventFieldsFragment = {
  __typename: 'CategoryCreatedEvent'
  id: string
  createdAt: any
  category: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
  }
}

export type CategoryDeletedEventFieldsFragment = {
  __typename: 'CategoryDeletedEvent'
  id: string
  createdAt: any
  category: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
  }
}

export type GetForumEventsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetForumEventsQuery = {
  __typename: 'Query'
  events: Array<
    | { __typename: 'AnnouncingPeriodStartedEvent' }
    | { __typename: 'ApplicationWithdrawnEvent' }
    | { __typename: 'AppliedOnOpeningEvent' }
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
    | { __typename: 'BudgetSetEvent' }
    | { __typename: 'BudgetSpendingEvent' }
    | { __typename: 'BudgetUpdatedEvent' }
    | { __typename: 'BuyNowCanceledEvent' }
    | { __typename: 'BuyNowPriceUpdatedEvent' }
    | { __typename: 'CandidacyNoteSetEvent' }
    | { __typename: 'CandidacyStakeReleaseEvent' }
    | { __typename: 'CandidacyWithdrawEvent' }
    | { __typename: 'CategoryArchivalStatusUpdatedEvent' }
    | {
        __typename: 'CategoryCreatedEvent'
        id: string
        createdAt: any
        category: {
          __typename: 'ForumCategory'
          id: string
          title: string
          parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
        }
      }
    | {
        __typename: 'CategoryDeletedEvent'
        id: string
        createdAt: any
        category: {
          __typename: 'ForumCategory'
          id: string
          title: string
          parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
        }
      }
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
    | { __typename: 'OpeningAddedEvent' }
    | { __typename: 'OpeningCanceledEvent' }
    | { __typename: 'OpeningFilledEvent' }
    | { __typename: 'OracleJudgmentSubmittedEvent' }
    | {
        __typename: 'PostAddedEvent'
        id: string
        createdAt: any
        post: {
          __typename: 'ForumPost'
          id: string
          thread: { __typename: 'ForumThread'; id: string }
          author: { __typename: 'Membership'; id: string; handle: string }
        }
      }
    | {
        __typename: 'PostDeletedEvent'
        id: string
        createdAt: any
        posts: Array<{
          __typename: 'ForumPost'
          id: string
          thread: { __typename: 'ForumThread'; id: string; title: string }
        }>
        actor: { __typename: 'Membership'; id: string; handle: string }
      }
    | {
        __typename: 'PostModeratedEvent'
        id: string
        createdAt: any
        post: { __typename: 'ForumPost'; id: string; thread: { __typename: 'ForumThread'; id: string } }
        actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
    | {
        __typename: 'PostTextUpdatedEvent'
        id: string
        createdAt: any
        post: {
          __typename: 'ForumPost'
          id: string
          thread: { __typename: 'ForumThread'; id: string }
          author: { __typename: 'Membership'; id: string; handle: string }
        }
      }
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
    | { __typename: 'StakeDecreasedEvent' }
    | { __typename: 'StakeIncreasedEvent' }
    | { __typename: 'StakeReleasedEvent' }
    | { __typename: 'StakeSlashedEvent' }
    | { __typename: 'StakingAccountAddedEvent' }
    | { __typename: 'StakingAccountConfirmedEvent' }
    | { __typename: 'StakingAccountRemovedEvent' }
    | { __typename: 'StatusTextChangedEvent' }
    | { __typename: 'TerminatedLeaderEvent' }
    | { __typename: 'TerminatedWorkerEvent' }
    | {
        __typename: 'ThreadCreatedEvent'
        id: string
        createdAt: any
        thread: {
          __typename: 'ForumThread'
          id: string
          title: string
          author: { __typename: 'Membership'; id: string; handle: string }
          category: { __typename: 'ForumCategory'; id: string; title: string }
        }
      }
    | {
        __typename: 'ThreadDeletedEvent'
        id: string
        createdAt: any
        thread: { __typename: 'ForumThread'; id: string; title: string }
      }
    | { __typename: 'ThreadMetadataUpdatedEvent' }
    | {
        __typename: 'ThreadModeratedEvent'
        id: string
        createdAt: any
        thread: { __typename: 'ForumThread'; id: string; title: string }
        actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
      }
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
    | { __typename: 'WorkerExitedEvent' }
    | { __typename: 'WorkerRewardAccountUpdatedEvent' }
    | { __typename: 'WorkerRewardAmountUpdatedEvent' }
    | { __typename: 'WorkerRoleAccountUpdatedEvent' }
    | { __typename: 'WorkerStartedLeavingEvent' }
  >
}

export const PostAddedEventFieldsFragmentDoc = gql`
  fragment PostAddedEventFields on PostAddedEvent {
    id
    createdAt
    post {
      id
      thread {
        id
      }
      author {
        id
        handle
      }
    }
  }
`
export const PostTextUpdatedEventFieldsFragmentDoc = gql`
  fragment PostTextUpdatedEventFields on PostTextUpdatedEvent {
    id
    createdAt
    post {
      id
      thread {
        id
      }
      author {
        id
        handle
      }
    }
  }
`
export const PostDeletedEventFieldsFragmentDoc = gql`
  fragment PostDeletedEventFields on PostDeletedEvent {
    id
    createdAt
    posts {
      id
      thread {
        id
        title
      }
    }
    actor {
      id
      handle
    }
  }
`
export const PostModeratedEventFieldsFragmentDoc = gql`
  fragment PostModeratedEventFields on PostModeratedEvent {
    id
    createdAt
    post {
      id
      thread {
        id
      }
    }
    actor {
      membership {
        id
        handle
      }
    }
  }
`
export const ThreadCreatedEventFieldsFragmentDoc = gql`
  fragment ThreadCreatedEventFields on ThreadCreatedEvent {
    id
    createdAt
    thread {
      id
      title
      author {
        id
        handle
      }
      category {
        id
        title
      }
    }
  }
`
export const ThreadDeletedEventFieldsFragmentDoc = gql`
  fragment ThreadDeletedEventFields on ThreadDeletedEvent {
    id
    createdAt
    thread {
      id
      title
    }
  }
`
export const ThreadModeratedEventFieldsFragmentDoc = gql`
  fragment ThreadModeratedEventFields on ThreadModeratedEvent {
    id
    createdAt
    thread {
      id
      title
    }
    actor {
      membership {
        id
        handle
      }
    }
  }
`
export const CategoryCreatedEventFieldsFragmentDoc = gql`
  fragment CategoryCreatedEventFields on CategoryCreatedEvent {
    id
    createdAt
    category {
      id
      title
      parent {
        id
        title
      }
    }
  }
`
export const CategoryDeletedEventFieldsFragmentDoc = gql`
  fragment CategoryDeletedEventFields on CategoryDeletedEvent {
    id
    createdAt
    category {
      id
      title
      parent {
        id
        title
      }
    }
  }
`
export const GetForumEventsDocument = gql`
  query GetForumEvents {
    events(
      where: {
        type_in: [
          PostAddedEvent
          PostTextUpdatedEvent
          PostModeratedEvent
          PostDeletedEvent
          ThreadCreatedEvent
          ThreadDeletedEvent
          ThreadModeratedEvent
          CategoryCreatedEvent
          CategoryDeletedEvent
        ]
      }
      limit: 25
      orderBy: [createdAt_DESC]
    ) {
      ... on PostAddedEvent {
        ...PostAddedEventFields
      }
      ... on PostTextUpdatedEvent {
        ...PostTextUpdatedEventFields
      }
      ... on PostModeratedEvent {
        ...PostModeratedEventFields
      }
      ... on PostDeletedEvent {
        ...PostDeletedEventFields
      }
      ... on ThreadCreatedEvent {
        ...ThreadCreatedEventFields
      }
      ... on ThreadDeletedEvent {
        ...ThreadDeletedEventFields
      }
      ... on ThreadModeratedEvent {
        ...ThreadModeratedEventFields
      }
      ... on CategoryCreatedEvent {
        ...CategoryCreatedEventFields
      }
      ... on CategoryDeletedEvent {
        ...CategoryDeletedEventFields
      }
    }
  }
  ${PostAddedEventFieldsFragmentDoc}
  ${PostTextUpdatedEventFieldsFragmentDoc}
  ${PostModeratedEventFieldsFragmentDoc}
  ${PostDeletedEventFieldsFragmentDoc}
  ${ThreadCreatedEventFieldsFragmentDoc}
  ${ThreadDeletedEventFieldsFragmentDoc}
  ${ThreadModeratedEventFieldsFragmentDoc}
  ${CategoryCreatedEventFieldsFragmentDoc}
  ${CategoryDeletedEventFieldsFragmentDoc}
`

/**
 * __useGetForumEventsQuery__
 *
 * To run a query within a React component, call `useGetForumEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetForumEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumEventsQuery, GetForumEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumEventsQuery, GetForumEventsQueryVariables>(GetForumEventsDocument, options)
}
export function useGetForumEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumEventsQuery, GetForumEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumEventsQuery, GetForumEventsQueryVariables>(GetForumEventsDocument, options)
}
export type GetForumEventsQueryHookResult = ReturnType<typeof useGetForumEventsQuery>
export type GetForumEventsLazyQueryHookResult = ReturnType<typeof useGetForumEventsLazyQuery>
export type GetForumEventsQueryResult = Apollo.QueryResult<GetForumEventsQuery, GetForumEventsQueryVariables>
