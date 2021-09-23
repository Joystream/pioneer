import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated';

import { MemberFieldsFragment , MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CouncilMemberFieldsFragment = { __typename: 'CouncilMember', id: string, unpaidReward: any, stake: any, member: (
    { __typename: 'Membership', councilMembers: Array<{ __typename: 'CouncilMember' }> }
    & MemberFieldsFragment
  ) };

export type ElectedCouncilsFieldsFragment = { __typename: 'ElectedCouncil', id: string, councilMembers: Array<(
    { __typename: 'CouncilMember' }
    & CouncilMemberFieldsFragment
  )> };

export type ElectionCandidateFieldsFragment = { __typename: 'Candidate', id: string, stake: any, member: (
    { __typename: 'Membership' }
    & MemberFieldsFragment
  ) };

export type ElectionRoundFieldsFragment = { __typename: 'ElectionRound', cycleId: number, candidates: Array<(
    { __typename: 'Candidate' }
    & ElectionCandidateFieldsFragment
  )> };

export type GetElectedCouncilsQueryVariables = Types.Exact<{
  where: Types.ElectedCouncilWhereInput;
}>;


export type GetElectedCouncilsQuery = { __typename: 'Query', electedCouncils: Array<(
    { __typename: 'ElectedCouncil' }
    & ElectedCouncilsFieldsFragment
  )> };

export type GetCurrentElectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentElectionQuery = { __typename: 'Query', electionRounds: Array<(
    { __typename: 'ElectionRound' }
    & ElectionRoundFieldsFragment
  )> };

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
    ${MemberFieldsFragmentDoc}`;
export const ElectedCouncilsFieldsFragmentDoc = gql`
    fragment ElectedCouncilsFields on ElectedCouncil {
  id
  councilMembers {
    ...CouncilMemberFields
  }
}
    ${CouncilMemberFieldsFragmentDoc}`;
export const ElectionCandidateFieldsFragmentDoc = gql`
    fragment ElectionCandidateFields on Candidate {
  id
  member {
    ...MemberFields
  }
  stake
}
    ${MemberFieldsFragmentDoc}`;
export const ElectionRoundFieldsFragmentDoc = gql`
    fragment ElectionRoundFields on ElectionRound {
  cycleId
  candidates {
    ...ElectionCandidateFields
  }
}
    ${ElectionCandidateFieldsFragmentDoc}`;
export const GetElectedCouncilsDocument = gql`
    query GetElectedCouncils($where: ElectedCouncilWhereInput!) {
  electedCouncils(where: $where) {
    ...ElectedCouncilsFields
  }
}
    ${ElectedCouncilsFieldsFragmentDoc}`;

/**
 * __useGetElectedCouncilsQuery__
 *
 * To run a query within a React component, call `useGetElectedCouncilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectedCouncilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectedCouncilsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetElectedCouncilsQuery(baseOptions: Apollo.QueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options);
      }
export function useGetElectedCouncilsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options);
        }
export type GetElectedCouncilsQueryHookResult = ReturnType<typeof useGetElectedCouncilsQuery>;
export type GetElectedCouncilsLazyQueryHookResult = ReturnType<typeof useGetElectedCouncilsLazyQuery>;
export type GetElectedCouncilsQueryResult = Apollo.QueryResult<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>;
export const GetCurrentElectionDocument = gql`
    query GetCurrentElection {
  electionRounds(where: {isFinished_eq: false}, orderBy: [cycleId_DESC], limit: 1) {
    ...ElectionRoundFields
  }
}
    ${ElectionRoundFieldsFragmentDoc}`;

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
export function useGetCurrentElectionQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>(GetCurrentElectionDocument, options);
      }
export function useGetCurrentElectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>(GetCurrentElectionDocument, options);
        }
export type GetCurrentElectionQueryHookResult = ReturnType<typeof useGetCurrentElectionQuery>;
export type GetCurrentElectionLazyQueryHookResult = ReturnType<typeof useGetCurrentElectionLazyQuery>;
export type GetCurrentElectionQueryResult = Apollo.QueryResult<GetCurrentElectionQuery, GetCurrentElectionQueryVariables>;