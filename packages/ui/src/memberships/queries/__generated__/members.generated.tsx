import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { BlockFieldsFragment, BlockFieldsFragmentDoc } from '../../../common/queries/__generated__/blocks.generated'
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
}

export type GetMembersQueryVariables = Types.Exact<{
  rootAccount_in?: Types.Maybe<Array<Types.Scalars['String']> | Types.Scalars['String']>
  controllerAccount_in?: Types.Maybe<Array<Types.Scalars['String']> | Types.Scalars['String']>
  orderBy?: Types.Maybe<Types.MembershipOrderByInput>
}>

export type GetMembersQuery = {
  __typename: 'Query'
  memberships: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
}

export type FilterMembersQueryVariables = Types.Exact<{
  id?: Types.Maybe<Types.Scalars['ID']>
  search?: Types.Maybe<Types.Scalars['String']>
  isVerified?: Types.Maybe<Types.Scalars['Boolean']>
  isFoundingMember?: Types.Maybe<Types.Scalars['Boolean']>
  orderBy?: Types.Maybe<Types.MembershipOrderByInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
  offset?: Types.Maybe<Types.Scalars['Int']>
}>

export type FilterMembersQuery = {
  __typename: 'Query'
  memberships: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
}

export type MemberWithDetailsFragment = {
  __typename: 'Membership'
  registeredAtTime: any
  registeredAtBlock: { __typename: 'Block' } & BlockFieldsFragment
  invitees: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
} & MemberFieldsFragment

export type GetMemberQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetMemberQuery = {
  __typename: 'Query'
  membershipByUniqueInput?: Types.Maybe<{ __typename: 'Membership' } & MemberWithDetailsFragment>
}

export type SearchMembersQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type SearchMembersQuery = {
  __typename: 'Query'
  memberships: Array<{ __typename: 'Membership' } & MemberFieldsFragment>
}

export type GetPaginatedMembersQueryVariables = Types.Exact<{
  after?: Types.Maybe<Types.Scalars['String']>
  where?: Types.Maybe<Types.MembershipWhereInput>
  order?: Types.Maybe<Types.MembershipOrderByInput>
}>

export type GetPaginatedMembersQuery = {
  __typename: 'Query'
  membershipsConnection: {
    __typename: 'MembershipConnection'
    totalCount: number
    edges: Array<{
      __typename: 'MembershipEdge'
      cursor: string
      node: { __typename: 'Membership' } & MemberFieldsFragment
    }>
    pageInfo: {
      __typename: 'PageInfo'
      startCursor?: Types.Maybe<string>
      endCursor?: Types.Maybe<string>
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
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
  }
`
export const MemberWithDetailsFragmentDoc = gql`
  fragment MemberWithDetails on Membership {
    ...MemberFields
    registeredAtTime
    registeredAtBlock {
      ...BlockFields
    }
    invitees {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
  ${BlockFieldsFragmentDoc}
`
export const GetMembersDocument = gql`
  query GetMembers($rootAccount_in: [String!], $controllerAccount_in: [String!], $orderBy: MembershipOrderByInput) {
    memberships(
      where: { rootAccount_in: $rootAccount_in, controllerAccount_in: $controllerAccount_in }
      orderBy: $orderBy
    ) {
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
 *      rootAccount_in: // value for 'rootAccount_in'
 *      controllerAccount_in: // value for 'controllerAccount_in'
 *      orderBy: // value for 'orderBy'
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
export const FilterMembersDocument = gql`
  query FilterMembers(
    $id: ID
    $search: String
    $isVerified: Boolean
    $isFoundingMember: Boolean
    $orderBy: MembershipOrderByInput
    $limit: Int
    $offset: Int
  ) {
    memberships(
      where: {
        id_eq: $id
        handle_contains: $search
        isVerified_eq: $isVerified
        isFoundingMember_eq: $isFoundingMember
      }
      orderBy: $orderBy
      limit: $limit
      offset: $offset
    ) {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useFilterMembersQuery__
 *
 * To run a query within a React component, call `useFilterMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterMembersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      search: // value for 'search'
 *      isVerified: // value for 'isVerified'
 *      isFoundingMember: // value for 'isFoundingMember'
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFilterMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<FilterMembersQuery, FilterMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FilterMembersQuery, FilterMembersQueryVariables>(FilterMembersDocument, options)
}
export function useFilterMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FilterMembersQuery, FilterMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FilterMembersQuery, FilterMembersQueryVariables>(FilterMembersDocument, options)
}
export type FilterMembersQueryHookResult = ReturnType<typeof useFilterMembersQuery>
export type FilterMembersLazyQueryHookResult = ReturnType<typeof useFilterMembersLazyQuery>
export type FilterMembersQueryResult = Apollo.QueryResult<FilterMembersQuery, FilterMembersQueryVariables>
export const GetMemberDocument = gql`
  query GetMember($id: ID!) {
    membershipByUniqueInput(where: { id: $id }) {
      ...MemberWithDetails
    }
  }
  ${MemberWithDetailsFragmentDoc}
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
 *      id: // value for 'id'
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
export const GetPaginatedMembersDocument = gql`
  query GetPaginatedMembers($after: String, $where: MembershipWhereInput, $order: MembershipOrderByInput) {
    membershipsConnection(where: $where, orderBy: $order, after: $after) {
      edges {
        cursor
        node {
          ...MemberFields
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useGetPaginatedMembersQuery__
 *
 * To run a query within a React component, call `useGetPaginatedMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedMembersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      where: // value for 'where'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetPaginatedMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPaginatedMembersQuery, GetPaginatedMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPaginatedMembersQuery, GetPaginatedMembersQueryVariables>(
    GetPaginatedMembersDocument,
    options
  )
}
export function useGetPaginatedMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedMembersQuery, GetPaginatedMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPaginatedMembersQuery, GetPaginatedMembersQueryVariables>(
    GetPaginatedMembersDocument,
    options
  )
}
export type GetPaginatedMembersQueryHookResult = ReturnType<typeof useGetPaginatedMembersQuery>
export type GetPaginatedMembersLazyQueryHookResult = ReturnType<typeof useGetPaginatedMembersLazyQuery>
export type GetPaginatedMembersQueryResult = Apollo.QueryResult<
  GetPaginatedMembersQuery,
  GetPaginatedMembersQueryVariables
>
