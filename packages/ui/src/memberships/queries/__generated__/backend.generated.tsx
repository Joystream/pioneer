import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetBackendMemberExistsQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type GetBackendMemberExistsQuery = { __typename: 'Query'; memberExist?: boolean | null }

export const GetBackendMemberExistsDocument = gql`
  query GetBackendMemberExists($id: Int!) {
    memberExist(id: $id)
  }
`

/**
 * __useGetBackendMemberExistsQuery__
 *
 * To run a query within a React component, call `useGetBackendMemberExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBackendMemberExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBackendMemberExistsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBackendMemberExistsQuery(
  baseOptions: Apollo.QueryHookOptions<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>(
    GetBackendMemberExistsDocument,
    options
  )
}
export function useGetBackendMemberExistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBackendMemberExistsQuery, GetBackendMemberExistsQueryVariables>(
    GetBackendMemberExistsDocument,
    options
  )
}
export type GetBackendMemberExistsQueryHookResult = ReturnType<typeof useGetBackendMemberExistsQuery>
export type GetBackendMemberExistsLazyQueryHookResult = ReturnType<typeof useGetBackendMemberExistsLazyQuery>
export type GetBackendMemberExistsQueryResult = Apollo.QueryResult<
  GetBackendMemberExistsQuery,
  GetBackendMemberExistsQueryVariables
>
