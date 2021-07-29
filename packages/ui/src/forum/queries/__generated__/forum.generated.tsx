import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ForumCategoryFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  description: string
}

export type ForumThreadFieldsFragment = {
  __typename: 'ForumThread'
  id: string
  isSticky: boolean
  categoryId: string
  title: string
  authorId: string
}

export type ForumPostFieldsFragment = { __typename: 'ForumPost'; id: string; text: string; authorId: string }

export type ForumThreadDetailedFieldsFragment = {
  __typename: 'ForumThread'
  createdInEvent: { __typename: 'ThreadCreatedEvent'; inBlock: number }
} & ForumThreadFieldsFragment

export type GetForumCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetForumCategoriesQuery = {
  __typename: 'Query'
  forumCategories: Array<{ __typename: 'ForumCategory' } & ForumCategoryFieldsFragment>
}

export type GetForumThreadsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumThreadWhereInput>
}>

export type GetForumThreadsQuery = {
  __typename: 'Query'
  forumThreads: Array<{ __typename: 'ForumThread' } & ForumThreadFieldsFragment>
}

export type GetForumThreadQueryVariables = Types.Exact<{
  where: Types.ForumThreadWhereUniqueInput
}>

export type GetForumThreadQuery = {
  __typename: 'Query'
  thread?: Types.Maybe<{ __typename: 'ForumThread' } & ForumThreadDetailedFieldsFragment>
}

export type GetForumPostsQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
  offset?: Types.Maybe<Types.Scalars['Int']>
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetForumPostsQuery = {
  __typename: 'Query'
  forumPosts: Array<{ __typename: 'ForumPost' } & ForumPostFieldsFragment>
}

export type GetForumPostsCountQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
}>

export type GetForumPostsCountQuery = {
  __typename: 'Query'
  forumPostsConnection: { __typename: 'ForumPostConnection'; totalCount: number }
}

export const ForumCategoryFieldsFragmentDoc = gql`
  fragment ForumCategoryFields on ForumCategory {
    id
    title
    description
  }
`
export const ForumPostFieldsFragmentDoc = gql`
  fragment ForumPostFields on ForumPost {
    id
    text
    authorId
  }
`
export const ForumThreadFieldsFragmentDoc = gql`
  fragment ForumThreadFields on ForumThread {
    id
    isSticky
    categoryId
    title
    authorId
  }
`
export const ForumThreadDetailedFieldsFragmentDoc = gql`
  fragment ForumThreadDetailedFields on ForumThread {
    ...ForumThreadFields
    createdInEvent {
      inBlock
    }
  }
  ${ForumThreadFieldsFragmentDoc}
`
export const GetForumCategoriesDocument = gql`
  query GetForumCategories {
    forumCategories {
      ...ForumCategoryFields
    }
  }
  ${ForumCategoryFieldsFragmentDoc}
`

/**
 * __useGetForumCategoriesQuery__
 *
 * To run a query within a React component, call `useGetForumCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetForumCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>(GetForumCategoriesDocument, options)
}
export function useGetForumCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>(
    GetForumCategoriesDocument,
    options
  )
}
export type GetForumCategoriesQueryHookResult = ReturnType<typeof useGetForumCategoriesQuery>
export type GetForumCategoriesLazyQueryHookResult = ReturnType<typeof useGetForumCategoriesLazyQuery>
export type GetForumCategoriesQueryResult = Apollo.QueryResult<
  GetForumCategoriesQuery,
  GetForumCategoriesQueryVariables
>
export const GetForumThreadsDocument = gql`
  query GetForumThreads($where: ForumThreadWhereInput) {
    forumThreads(where: $where) {
      ...ForumThreadFields
    }
  }
  ${ForumThreadFieldsFragmentDoc}
`

/**
 * __useGetForumThreadsQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsQuery, GetForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsQuery, GetForumThreadsQueryVariables>(GetForumThreadsDocument, options)
}
export function useGetForumThreadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsQuery, GetForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsQuery, GetForumThreadsQueryVariables>(GetForumThreadsDocument, options)
}
export type GetForumThreadsQueryHookResult = ReturnType<typeof useGetForumThreadsQuery>
export type GetForumThreadsLazyQueryHookResult = ReturnType<typeof useGetForumThreadsLazyQuery>
export type GetForumThreadsQueryResult = Apollo.QueryResult<GetForumThreadsQuery, GetForumThreadsQueryVariables>
export const GetForumThreadDocument = gql`
  query GetForumThread($where: ForumThreadWhereUniqueInput!) {
    thread: forumThreadByUniqueInput(where: $where) {
      ...ForumThreadDetailedFields
    }
  }
  ${ForumThreadDetailedFieldsFragmentDoc}
`

/**
 * __useGetForumThreadQuery__
 *
 * To run a query within a React component, call `useGetForumThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumThreadQuery, GetForumThreadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadQuery, GetForumThreadQueryVariables>(GetForumThreadDocument, options)
}
export function useGetForumThreadLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadQuery, GetForumThreadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadQuery, GetForumThreadQueryVariables>(GetForumThreadDocument, options)
}
export type GetForumThreadQueryHookResult = ReturnType<typeof useGetForumThreadQuery>
export type GetForumThreadLazyQueryHookResult = ReturnType<typeof useGetForumThreadLazyQuery>
export type GetForumThreadQueryResult = Apollo.QueryResult<GetForumThreadQuery, GetForumThreadQueryVariables>
export const GetForumPostsDocument = gql`
  query GetForumPosts($where: ForumPostWhereInput!, $offset: Int, $limit: Int) {
    forumPosts(where: $where, offset: $offset, limit: $limit) {
      ...ForumPostFields
    }
  }
  ${ForumPostFieldsFragmentDoc}
`

/**
 * __useGetForumPostsQuery__
 *
 * To run a query within a React component, call `useGetForumPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetForumPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostsQuery, GetForumPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostsQuery, GetForumPostsQueryVariables>(GetForumPostsDocument, options)
}
export function useGetForumPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsQuery, GetForumPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostsQuery, GetForumPostsQueryVariables>(GetForumPostsDocument, options)
}
export type GetForumPostsQueryHookResult = ReturnType<typeof useGetForumPostsQuery>
export type GetForumPostsLazyQueryHookResult = ReturnType<typeof useGetForumPostsLazyQuery>
export type GetForumPostsQueryResult = Apollo.QueryResult<GetForumPostsQuery, GetForumPostsQueryVariables>
export const GetForumPostsCountDocument = gql`
  query GetForumPostsCount($where: ForumPostWhereInput!) {
    forumPostsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetForumPostsCountQuery__
 *
 * To run a query within a React component, call `useGetForumPostsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumPostsCountQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(GetForumPostsCountDocument, options)
}
export function useGetForumPostsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(
    GetForumPostsCountDocument,
    options
  )
}
export type GetForumPostsCountQueryHookResult = ReturnType<typeof useGetForumPostsCountQuery>
export type GetForumPostsCountLazyQueryHookResult = ReturnType<typeof useGetForumPostsCountLazyQuery>
export type GetForumPostsCountQueryResult = Apollo.QueryResult<
  GetForumPostsCountQuery,
  GetForumPostsCountQueryVariables
>
