import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type ProposalCreatedEventFieldsFragment = {
  __typename: 'ProposalCreatedEvent'
  id: string
  createdAt: any
  inBlock: number
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
  inBlock: number
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
  inBlock: number
  proposal: { __typename: 'Proposal'; id: string; title: string }
  newStatus:
    | { __typename: 'ProposalStatusDeciding' }
    | { __typename: 'ProposalStatusDormant' }
    | { __typename: 'ProposalStatusGracing' }
}

export type ProposalDecisionMadeEventFieldsFragment = {
  __typename: 'ProposalDecisionMadeEvent'
  id: string
  createdAt: any
  inBlock: number
  proposal: { __typename: 'Proposal'; id: string; title: string }
}

export type ProposalDiscussionModeChangedEventFieldsFragment = {
  __typename: 'ProposalDiscussionThreadModeChangedEvent'
  id: string
  createdAt: any
  inBlock: number
  thread: { __typename: 'ProposalDiscussionThread'; proposal: { __typename: 'Proposal'; id: string; title: string } }
  newMode: { __typename: 'ProposalDiscussionThreadModeClosed' } | { __typename: 'ProposalDiscussionThreadModeOpen' }
}

export type ProposalExecutedEventFieldsFragment = {
  __typename: 'ProposalExecutedEvent'
  id: string
  createdAt: any
  inBlock: number
  proposal: { __typename: 'Proposal'; id: string; title: string }
  executionStatus: { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' }
}

export type ProposalVotedEventFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  id: string
  createdAt: any
  inBlock: number
  proposal: { __typename: 'Proposal'; id: string; title: string }
  voter: { __typename: 'Membership'; id: string; handle: string }
}

export type ProposalDiscussionPostCreatedEventFieldsFragment = {
  __typename: 'ProposalDiscussionPostCreatedEvent'
  id: string
  createdAt: any
  inBlock: number
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
  inBlock: number
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
  inBlock: number
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
  proposalCreatedEvents: Array<{
    __typename: 'ProposalCreatedEvent'
    id: string
    createdAt: any
    inBlock: number
    proposal: {
      __typename: 'Proposal'
      id: string
      title: string
      creator: { __typename: 'Membership'; id: string; handle: string }
    }
  }>
  proposalCancelledEvents: Array<{
    __typename: 'ProposalCancelledEvent'
    id: string
    createdAt: any
    inBlock: number
    proposal: {
      __typename: 'Proposal'
      id: string
      title: string
      creator: { __typename: 'Membership'; id: string; handle: string }
    }
  }>
  proposalStatusUpdatedEvents: Array<{
    __typename: 'ProposalStatusUpdatedEvent'
    id: string
    createdAt: any
    inBlock: number
    proposal: { __typename: 'Proposal'; id: string; title: string }
    newStatus:
      | { __typename: 'ProposalStatusDeciding' }
      | { __typename: 'ProposalStatusDormant' }
      | { __typename: 'ProposalStatusGracing' }
  }>
  proposalDecisionMadeEvents: Array<{
    __typename: 'ProposalDecisionMadeEvent'
    id: string
    createdAt: any
    inBlock: number
    proposal: { __typename: 'Proposal'; id: string; title: string }
  }>
  proposalDiscussionThreadModeChangedEvents: Array<{
    __typename: 'ProposalDiscussionThreadModeChangedEvent'
    id: string
    createdAt: any
    inBlock: number
    thread: { __typename: 'ProposalDiscussionThread'; proposal: { __typename: 'Proposal'; id: string; title: string } }
    newMode: { __typename: 'ProposalDiscussionThreadModeClosed' } | { __typename: 'ProposalDiscussionThreadModeOpen' }
  }>
  proposalExecutedEvents: Array<{
    __typename: 'ProposalExecutedEvent'
    id: string
    createdAt: any
    inBlock: number
    proposal: { __typename: 'Proposal'; id: string; title: string }
    executionStatus: { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' }
  }>
  proposalVotedEvents: Array<{
    __typename: 'ProposalVotedEvent'
    id: string
    createdAt: any
    inBlock: number
    proposal: { __typename: 'Proposal'; id: string; title: string }
    voter: { __typename: 'Membership'; id: string; handle: string }
  }>
  proposalDiscussionPostCreatedEvents: Array<{
    __typename: 'ProposalDiscussionPostCreatedEvent'
    id: string
    createdAt: any
    inBlock: number
    post: {
      __typename: 'ProposalDiscussionPost'
      id: string
      author: { __typename: 'Membership'; id: string; handle: string }
      discussionThread: {
        __typename: 'ProposalDiscussionThread'
        proposal: { __typename: 'Proposal'; id: string; title: string }
      }
    }
  }>
  proposalDiscussionPostUpdatedEvents: Array<{
    __typename: 'ProposalDiscussionPostUpdatedEvent'
    id: string
    createdAt: any
    inBlock: number
    post: {
      __typename: 'ProposalDiscussionPost'
      id: string
      author: { __typename: 'Membership'; id: string; handle: string }
      discussionThread: {
        __typename: 'ProposalDiscussionThread'
        proposal: { __typename: 'Proposal'; id: string; title: string }
      }
    }
  }>
  proposalDiscussionPostDeletedEvents: Array<{
    __typename: 'ProposalDiscussionPostDeletedEvent'
    id: string
    createdAt: any
    inBlock: number
    post: {
      __typename: 'ProposalDiscussionPost'
      id: string
      author: { __typename: 'Membership'; id: string; handle: string }
      discussionThread: {
        __typename: 'ProposalDiscussionThread'
        proposal: { __typename: 'Proposal'; id: string; title: string }
      }
    }
  }>
}

export const ProposalCreatedEventFieldsFragmentDoc = gql`
  fragment ProposalCreatedEventFields on ProposalCreatedEvent {
    id
    createdAt
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    inBlock
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
    proposalCreatedEvents(orderBy: inBlock_DESC) {
      ...ProposalCreatedEventFields
    }
    proposalCancelledEvents(orderBy: inBlock_DESC) {
      ...ProposalCancelledEventFields
    }
    proposalStatusUpdatedEvents(orderBy: inBlock_DESC) {
      ...ProposalStatusUpdatedEventFields
    }
    proposalDecisionMadeEvents(orderBy: inBlock_DESC) {
      ...ProposalDecisionMadeEventFields
    }
    proposalDiscussionThreadModeChangedEvents(orderBy: inBlock_DESC) {
      ...ProposalDiscussionModeChangedEventFields
    }
    proposalExecutedEvents(orderBy: inBlock_DESC) {
      ...ProposalExecutedEventFields
    }
    proposalVotedEvents(orderBy: inBlock_DESC) {
      ...ProposalVotedEventFields
    }
    proposalDiscussionPostCreatedEvents(orderBy: inBlock_DESC) {
      ...ProposalDiscussionPostCreatedEventFields
    }
    proposalDiscussionPostUpdatedEvents(orderBy: inBlock_DESC) {
      ...ProposalDiscussionPostUpdatedEventFields
    }
    proposalDiscussionPostDeletedEvents(orderBy: inBlock_DESC) {
      ...ProposalDiscussionPostDeletedEventFields
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
