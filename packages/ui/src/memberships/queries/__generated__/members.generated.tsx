import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type MemberFieldsFragment = {
  __typename: 'Membership'
  id: string
  rootAccount: string
  controllerAccount: string
  handle: string
  isVerified: boolean
  isFoundingMember: boolean
  inviteCount: number
  metadata: { __typename: 'MemberMetadata'; name?: Types.Maybe<string>; about?: Types.Maybe<string> }
  roles: Array<{
    __typename: 'Worker'
    createdAt: any
    isLead: boolean
    group: { __typename: 'WorkingGroup'; name: string }
  }>
}

export type MemberWithDetailsFieldsFragment = {
  __typename: 'Membership'
  entry:
    | {
        __typename: 'MembershipEntryPaid'
        membershipBoughtEvent?: Types.Maybe<{
          __typename: 'MembershipBoughtEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        }>
      }
    | {
        __typename: 'MembershipEntryInvited'
        memberInvitedEvent?: Types.Maybe<{
          __typename: 'MemberInvitedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        }>
      }
    | { __typename: 'MembershipEntryGenesis'; phantom?: Types.Maybe<number> }
  invitees: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
} & MemberFieldsFragment

export type GetMembersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.MembershipWhereInput>
  orderBy?: Types.Maybe<Array<Types.MembershipOrderByInput> | Types.MembershipOrderByInput>
  offset?: Types.Maybe<Types.Scalars['Int']>
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetMembersQuery = {
  __typename: 'Query'
  memberships: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
}

export type GetMembersCountQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.MembershipWhereInput>
}>

export type GetMembersCountQuery = {
  __typename: 'Query'
  membershipsConnection: { __typename: 'MembershipConnection'; totalCount: number }
}

export type GetMemberQueryVariables = Types.Exact<{
  where: Types.MembershipWhereUniqueInput
}>

export type GetMemberQuery = {
  __typename: 'Query'
  membershipByUniqueInput?: Types.Maybe<{ __typename: 'Membership' } & MemberWithDetailsFieldsFragment>
}

export type SearchMembersQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type SearchMembersQuery = {
  __typename: 'Query'
  memberships: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
}

export const MemberFieldsFragmentDoc = gql`
  fragment MemberFields on Membership {
    id
    rootAccount
    controllerAccount
    handle
    metadata {
      name
      about
    }
    isVerified
    isFoundingMember
    inviteCount
    roles {
      group {
        name
      }
      createdAt
      isLead
    }
  }
`
export const MemberWithDetailsFieldsFragmentDoc = gql`
  fragment MemberWithDetailsFields on Membership {
    ...MemberFields
    entry {
      ... on MembershipEntryInvited {
        memberInvitedEvent {
          createdAt
          inBlock
          network
        }
      }
      ... on MembershipEntryPaid {
        membershipBoughtEvent {
          createdAt
          inBlock
          network
        }
      }
      ... on MembershipEntryGenesis {
        phantom
      }
    }
    invitees {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const GetMembersDocument = gql`
  query GetMembers($where: MembershipWhereInput, $orderBy: [MembershipOrderByInput!], $offset: Int, $limit: Int) {
    memberships(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
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
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export function useGetMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>
export const GetMembersCountDocument = gql`
  query GetMembersCount($where: MembershipWhereInput) {
    membershipsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetMembersCountQuery__
 *
 * To run a query within a React component, call `useGetMembersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMembersCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMembersCountQuery, GetMembersCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMembersCountQuery, GetMembersCountQueryVariables>(GetMembersCountDocument, options)
}
export function useGetMembersCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembersCountQuery, GetMembersCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMembersCountQuery, GetMembersCountQueryVariables>(GetMembersCountDocument, options)
}
export type GetMembersCountQueryHookResult = ReturnType<typeof useGetMembersCountQuery>
export type GetMembersCountLazyQueryHookResult = ReturnType<typeof useGetMembersCountLazyQuery>
export type GetMembersCountQueryResult = Apollo.QueryResult<GetMembersCountQuery, GetMembersCountQueryVariables>
export const GetMemberDocument = gql`
  query GetMember($where: MembershipWhereUniqueInput!) {
    membershipByUniqueInput(where: $where) {
      ...MemberWithDetailsFields
    }
  }
  ${MemberWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMemberQuery(baseOptions: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options)
}
export function useGetMemberLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options)
}
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>
export const SearchMembersDocument = gql`
  query SearchMembers($text: String!, $limit: Int) {
    memberships(where: { handle_contains: $text }, limit: $limit) {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useSearchMembersQuery__
 *
 * To run a query within a React component, call `useSearchMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMembersQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchMembersQuery(
  baseOptions: Apollo.QueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options)
}
export function useSearchMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options)
}
export type SearchMembersQueryHookResult = ReturnType<typeof useSearchMembersQuery>
export type SearchMembersLazyQueryHookResult = ReturnType<typeof useSearchMembersLazyQuery>
export type SearchMembersQueryResult = Apollo.QueryResult<SearchMembersQuery, SearchMembersQueryVariables>
