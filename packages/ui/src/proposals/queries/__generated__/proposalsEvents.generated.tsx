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
    | { __typename: 'ProposalCancelledEvent' }
    | ({ __typename: 'ProposalCreatedEvent' } & ProposalCreatedEventFieldsFragment)
    | { __typename: 'ProposalDecisionMadeEvent' }
    | { __typename: 'ProposalDiscussionPostCreatedEvent' }
    | { __typename: 'ProposalDiscussionPostDeletedEvent' }
    | { __typename: 'ProposalDiscussionPostUpdatedEvent' }
    | { __typename: 'ProposalDiscussionThreadModeChangedEvent' }
    | { __typename: 'ProposalExecutedEvent' }
    | ({ __typename: 'ProposalStatusUpdatedEvent' } & ProposalStatusUpdatedEventFieldsFragment)
    | { __typename: 'ProposalVotedEvent' }
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
export const GetProposalsEventsDocument = gql`
  query GetProposalsEvents {
    events(where: { type_in: [ProposalCreatedEvent, ProposalStatusUpdatedEvent] }, orderBy: [createdAt_DESC]) {
      ... on ProposalCreatedEvent {
        ...ProposalCreatedEventFields
      }
      ... on ProposalStatusUpdatedEvent {
        ...ProposalStatusUpdatedEventFields
      }
    }
  }
  ${ProposalCreatedEventFieldsFragmentDoc}
  ${ProposalStatusUpdatedEventFieldsFragmentDoc}
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
