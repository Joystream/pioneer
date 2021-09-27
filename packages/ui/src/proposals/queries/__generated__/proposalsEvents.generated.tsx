import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ProposalCreatedEventFieldsFragment = {
  __typename: 'ProposalCreatedEvent'
  id: string
  createdAt: any
  proposal: {
    __typename: 'Proposal'
    id: string
    title: string
    creator: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type ProposalCancelledEventFieldsFragment = {
  __typename: 'ProposalCancelledEvent'
  id: string
  createdAt: any
  proposal: {
    __typename: 'Proposal'
    id: string
    title: string
    creator: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type ProposalStatusUpdatedEventFieldsFragment = {
  __typename: 'ProposalStatusUpdatedEvent'
  id: string
  createdAt: any
  proposal: { __typename: 'Proposal'; id: string; title: string }
  newStatus:
    | { __typename: 'ProposalStatusDeciding' }
    | { __typename: 'ProposalStatusGracing' }
    | { __typename: 'ProposalStatusDormant' }
}

export type ProposalDecisionMadeEventFieldsFragment = {
  __typename: 'ProposalDecisionMadeEvent'
  id: string
  createdAt: any
  proposal: { __typename: 'Proposal'; id: string; title: string }
}

export type ProposalDiscussionModeChangedEventFieldsFragment = {
  __typename: 'ProposalDiscussionThreadModeChangedEvent'
  id: string
  createdAt: any
  thread: { __typename: 'ProposalDiscussionThread'; proposal: { __typename: 'Proposal'; id: string; title: string } }
  newMode: { __typename: 'ProposalDiscussionThreadModeOpen' } | { __typename: 'ProposalDiscussionThreadModeClosed' }
}

export type ProposalExecutedEventFieldsFragment = {
  __typename: 'ProposalExecutedEvent'
  id: string
  createdAt: any
  proposal: { __typename: 'Proposal'; id: string; title: string }
  executionStatus: { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' }
}

export type ProposalVotedEventFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  id: string
  createdAt: any
  proposal: { __typename: 'Proposal'; id: string; title: string }
  voter: { __typename: 'Membership'; id: string; handle: string }
}

export type ProposalDiscussionPostCreatedEventFieldsFragment = {
  __typename: 'ProposalDiscussionPostCreatedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ProposalDiscussionPost'
    id: string
    author: { __typename: 'Membership'; id: string; handle: string }
    discussionThread: {
      __typename: 'ProposalDiscussionThread'
      proposal: { __typename: 'Proposal'; id: string; title: string }
    }
  }
}

export type ProposalDiscussionPostUpdatedEventFieldsFragment = {
  __typename: 'ProposalDiscussionPostUpdatedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ProposalDiscussionPost'
    id: string
    author: { __typename: 'Membership'; id: string; handle: string }
    discussionThread: {
      __typename: 'ProposalDiscussionThread'
      proposal: { __typename: 'Proposal'; id: string; title: string }
    }
  }
}

export type ProposalDiscussionPostDeletedEventFieldsFragment = {
  __typename: 'ProposalDiscussionPostDeletedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ProposalDiscussionPost'
    id: string
    author: { __typename: 'Membership'; id: string; handle: string }
    discussionThread: {
      __typename: 'ProposalDiscussionThread'
      proposal: { __typename: 'Proposal'; id: string; title: string }
    }
  }
}

export type GetProposalsEventsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetProposalsEventsQuery = {
  __typename: 'Query'
  events: Array<
    | { __typename: 'ApplicationWithdrawnEvent' }
    | { __typename: 'AppliedOnOpeningEvent' }
    | { __typename: 'BudgetSetEvent' }
    | { __typename: 'BudgetSpendingEvent' }
    | { __typename: 'InitialInvitationBalanceUpdatedEvent' }
    | { __typename: 'InitialInvitationCountUpdatedEvent' }
    | { __typename: 'InvitesTransferredEvent' }
    | { __typename: 'LeaderInvitationQuotaUpdatedEvent' }
    | { __typename: 'LeaderSetEvent' }
    | { __typename: 'LeaderUnsetEvent' }
    | { __typename: 'MemberAccountsUpdatedEvent' }
    | { __typename: 'MemberInvitedEvent' }
    | { __typename: 'MemberProfileUpdatedEvent' }
    | { __typename: 'MemberVerificationStatusUpdatedEvent' }
    | { __typename: 'MembershipBoughtEvent' }
    | { __typename: 'MembershipPriceUpdatedEvent' }
    | { __typename: 'NewMissedRewardLevelReachedEvent' }
    | { __typename: 'OpeningAddedEvent' }
    | { __typename: 'OpeningCanceledEvent' }
    | { __typename: 'OpeningFilledEvent' }
    | ({ __typename: 'ProposalCancelledEvent' } & ProposalCancelledEventFieldsFragment)
    | ({ __typename: 'ProposalCreatedEvent' } & ProposalCreatedEventFieldsFragment)
    | ({ __typename: 'ProposalDecisionMadeEvent' } & ProposalDecisionMadeEventFieldsFragment)
    | ({ __typename: 'ProposalDiscussionPostCreatedEvent' } & ProposalDiscussionPostCreatedEventFieldsFragment)
    | ({ __typename: 'ProposalDiscussionPostDeletedEvent' } & ProposalDiscussionPostDeletedEventFieldsFragment)
    | ({ __typename: 'ProposalDiscussionPostUpdatedEvent' } & ProposalDiscussionPostUpdatedEventFieldsFragment)
    | ({ __typename: 'ProposalDiscussionThreadModeChangedEvent' } & ProposalDiscussionModeChangedEventFieldsFragment)
    | ({ __typename: 'ProposalExecutedEvent' } & ProposalExecutedEventFieldsFragment)
    | ({ __typename: 'ProposalStatusUpdatedEvent' } & ProposalStatusUpdatedEventFieldsFragment)
    | ({ __typename: 'ProposalVotedEvent' } & ProposalVotedEventFieldsFragment)
    | { __typename: 'ReferralCutUpdatedEvent' }
    | { __typename: 'RewardPaidEvent' }
    | { __typename: 'StakeDecreasedEvent' }
    | { __typename: 'StakeIncreasedEvent' }
    | { __typename: 'StakeSlashedEvent' }
    | { __typename: 'StakingAccountAddedEvent' }
    | { __typename: 'StakingAccountConfirmedEvent' }
    | { __typename: 'StakingAccountRemovedEvent' }
    | { __typename: 'StatusTextChangedEvent' }
    | { __typename: 'TerminatedLeaderEvent' }
    | { __typename: 'TerminatedWorkerEvent' }
    | { __typename: 'WorkerExitedEvent' }
    | { __typename: 'WorkerRewardAccountUpdatedEvent' }
    | { __typename: 'WorkerRewardAmountUpdatedEvent' }
    | { __typename: 'WorkerRoleAccountUpdatedEvent' }
    | { __typename: 'WorkerStartedLeavingEvent' }
  >
}

export const ProposalCreatedEventFieldsFragmentDoc = gql`
  fragment ProposalCreatedEventFields on ProposalCreatedEvent {
    id
    createdAt
    proposal {
      id
      title
      creator {
        id
        handle
      }
    }
  }
`
export const ProposalCancelledEventFieldsFragmentDoc = gql`
  fragment ProposalCancelledEventFields on ProposalCancelledEvent {
    id
    createdAt
    proposal {
      id
      title
      creator {
        id
        handle
      }
    }
  }
`
export const ProposalStatusUpdatedEventFieldsFragmentDoc = gql`
  fragment ProposalStatusUpdatedEventFields on ProposalStatusUpdatedEvent {
    id
    createdAt
    proposal {
      id
      title
    }
    newStatus {
      __typename
    }
  }
`
export const ProposalDecisionMadeEventFieldsFragmentDoc = gql`
  fragment ProposalDecisionMadeEventFields on ProposalDecisionMadeEvent {
    id
    createdAt
    proposal {
      id
      title
    }
  }
`
export const ProposalDiscussionModeChangedEventFieldsFragmentDoc = gql`
  fragment ProposalDiscussionModeChangedEventFields on ProposalDiscussionThreadModeChangedEvent {
    id
    createdAt
    thread {
      proposal {
        id
        title
      }
    }
    newMode {
      __typename
    }
  }
`
export const ProposalExecutedEventFieldsFragmentDoc = gql`
  fragment ProposalExecutedEventFields on ProposalExecutedEvent {
    id
    createdAt
    proposal {
      id
      title
    }
    executionStatus {
      __typename
    }
  }
`
export const ProposalVotedEventFieldsFragmentDoc = gql`
  fragment ProposalVotedEventFields on ProposalVotedEvent {
    id
    createdAt
    proposal {
      id
      title
    }
    voter {
      id
      handle
    }
  }
`
export const ProposalDiscussionPostCreatedEventFieldsFragmentDoc = gql`
  fragment ProposalDiscussionPostCreatedEventFields on ProposalDiscussionPostCreatedEvent {
    id
    createdAt
    post {
      id
      author {
        id
        handle
      }
      discussionThread {
        proposal {
          id
          title
        }
      }
    }
  }
`
export const ProposalDiscussionPostUpdatedEventFieldsFragmentDoc = gql`
  fragment ProposalDiscussionPostUpdatedEventFields on ProposalDiscussionPostUpdatedEvent {
    id
    createdAt
    post {
      id
      author {
        id
        handle
      }
      discussionThread {
        proposal {
          id
          title
        }
      }
    }
  }
`
export const ProposalDiscussionPostDeletedEventFieldsFragmentDoc = gql`
  fragment ProposalDiscussionPostDeletedEventFields on ProposalDiscussionPostDeletedEvent {
    id
    createdAt
    post {
      id
      author {
        id
        handle
      }
      discussionThread {
        proposal {
          id
          title
        }
      }
    }
  }
`
export const GetProposalsEventsDocument = gql`
  query GetProposalsEvents {
    events(
      where: {
        type_in: [
          ProposalCreatedEvent
          ProposalStatusUpdatedEvent
          ProposalDecisionMadeEvent
          ProposalCancelledEvent
          ProposalDiscussionThreadModeChangedEvent
          ProposalExecutedEvent
          ProposalVotedEvent
          ProposalDiscussionPostCreatedEvent
          ProposalDiscussionPostUpdatedEvent
          ProposalDiscussionPostDeletedEvent
        ]
      }
      orderBy: [createdAt_DESC]
    ) {
      ... on ProposalCreatedEvent {
        ...ProposalCreatedEventFields
      }
      ... on ProposalCancelledEvent {
        ...ProposalCancelledEventFields
      }
      ... on ProposalStatusUpdatedEvent {
        ...ProposalStatusUpdatedEventFields
      }
      ... on ProposalDecisionMadeEvent {
        ...ProposalDecisionMadeEventFields
      }
      ... on ProposalDiscussionThreadModeChangedEvent {
        ...ProposalDiscussionModeChangedEventFields
      }
      ... on ProposalExecutedEvent {
        ...ProposalExecutedEventFields
      }
      ... on ProposalVotedEvent {
        ...ProposalVotedEventFields
      }
      ... on ProposalDiscussionPostCreatedEvent {
        ...ProposalDiscussionPostCreatedEventFields
      }
      ... on ProposalDiscussionPostUpdatedEvent {
        ...ProposalDiscussionPostUpdatedEventFields
      }
      ... on ProposalDiscussionPostDeletedEvent {
        ...ProposalDiscussionPostDeletedEventFields
      }
    }
  }
  ${ProposalCreatedEventFieldsFragmentDoc}
  ${ProposalCancelledEventFieldsFragmentDoc}
  ${ProposalStatusUpdatedEventFieldsFragmentDoc}
  ${ProposalDecisionMadeEventFieldsFragmentDoc}
  ${ProposalDiscussionModeChangedEventFieldsFragmentDoc}
  ${ProposalExecutedEventFieldsFragmentDoc}
  ${ProposalVotedEventFieldsFragmentDoc}
  ${ProposalDiscussionPostCreatedEventFieldsFragmentDoc}
  ${ProposalDiscussionPostUpdatedEventFieldsFragmentDoc}
  ${ProposalDiscussionPostDeletedEventFieldsFragmentDoc}
`

/**
 * __useGetProposalsEventsQuery__
 *
 * To run a query within a React component, call `useGetProposalsEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalsEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalsEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProposalsEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProposalsEventsQuery, GetProposalsEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalsEventsQuery, GetProposalsEventsQueryVariables>(GetProposalsEventsDocument, options)
}
export function useGetProposalsEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsEventsQuery, GetProposalsEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalsEventsQuery, GetProposalsEventsQueryVariables>(
    GetProposalsEventsDocument,
    options
  )
}
export type GetProposalsEventsQueryHookResult = ReturnType<typeof useGetProposalsEventsQuery>
export type GetProposalsEventsLazyQueryHookResult = ReturnType<typeof useGetProposalsEventsLazyQuery>
export type GetProposalsEventsQueryResult = Apollo.QueryResult<
  GetProposalsEventsQuery,
  GetProposalsEventsQueryVariables
>
