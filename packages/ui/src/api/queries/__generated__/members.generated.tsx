import * as Types from './baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type MemberFieldsFragment = {
  __typename: 'Member'
  id: string
  rootAccount: string
  controllerAccount: string
  handle?: Types.Maybe<string>
  name?: Types.Maybe<string>
  about?: Types.Maybe<string>
  avatarURI?: Types.Maybe<string>
  isFoundingMember: boolean
  isVerified: boolean
  inviteCount: any
}

export type GetMembersQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetMembersQuery = { __typename: 'Query'; members: Array<{ __typename: 'Member' } & MemberFieldsFragment> }

export const MemberFieldsFragmentDoc = gql`
  fragment MemberFields on Member {
    id
    rootAccount
    controllerAccount
    handle
    name
    about
    avatarURI
    isFoundingMember
    isVerified
    inviteCount
  }
`
export const GetMembersDocument = gql`
  query GetMembers {
    members {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
  return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions)
}
export function useGetMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>
) {
  return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions)
}
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>
