import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetSidebarInfoQueryVariables = Types.Exact<{
  memberId: Types.Scalars['ID']
}>

export type GetSidebarInfoQuery = {
  __typename: 'Query'
  workers: Array<{
    __typename: 'Worker'
    isLead: boolean
    group: { __typename: 'WorkingGroup'; name: string }
    payouts: Array<{ __typename: 'RewardPaidEvent'; amount: any }>
  }>
  councilMembers: Array<{ __typename: 'CouncilMember'; accumulatedReward: any; id: string }>
  workingGroupApplications: Array<{
    __typename: 'WorkingGroupApplication'
    opening: {
      __typename: 'WorkingGroupOpening'
      group: { __typename: 'WorkingGroup'; name: string }
      metadata: { __typename: 'WorkingGroupOpeningMetadata'; expectedEnding?: any | null | undefined }
    }
  }>
  candidates: Array<{
    __typename: 'Candidate'
    id: string
    electionRound: { __typename: 'ElectionRound'; cycleId: number }
  }>
  proposals: Array<{ __typename: 'Proposal'; id: string }>
  forumThreads: Array<{
    __typename: 'ForumThread'
    title: string
    posts: Array<{ __typename: 'ForumPost'; id: string }>
  }>
}

export const GetSidebarInfoDocument = gql`
  query GetSidebarInfo($memberId: ID!) {
    workers(where: { membership: { id_eq: $memberId } }) {
      group {
        name
      }
      isLead
      payouts {
        amount
      }
    }
    councilMembers(where: { member: { id_eq: $memberId } }) {
      accumulatedReward
      id
    }
    workingGroupApplications(
      where: { applicant: { id_eq: $memberId }, status_json: { isTypeOf_eq: "ApplicationStatusPending" } }
    ) {
      opening {
        group {
          name
        }
        metadata {
          expectedEnding
        }
      }
    }
    candidates(where: { member: { id_eq: $memberId }, status_eq: ACTIVE }) {
      id
      electionRound {
        cycleId
      }
    }
    proposals(where: { creator: { id_eq: $memberId } }) {
      id
    }
    forumThreads(where: { author: { id_eq: $memberId } }) {
      title
      posts {
        id
      }
    }
  }
`

/**
 * __useGetSidebarInfoQuery__
 *
 * To run a query within a React component, call `useGetSidebarInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSidebarInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSidebarInfoQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetSidebarInfoQuery(
  baseOptions: Apollo.QueryHookOptions<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>(GetSidebarInfoDocument, options)
}
export function useGetSidebarInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>(GetSidebarInfoDocument, options)
}
export type GetSidebarInfoQueryHookResult = ReturnType<typeof useGetSidebarInfoQuery>
export type GetSidebarInfoLazyQueryHookResult = ReturnType<typeof useGetSidebarInfoLazyQuery>
export type GetSidebarInfoQueryResult = Apollo.QueryResult<GetSidebarInfoQuery, GetSidebarInfoQueryVariables>
