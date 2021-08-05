import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import {
  MemberFieldsFragment,
  MemberFieldsFragmentDoc,
} from '../../../memberships/queries/__generated__/members.generated'
import { gql } from '@apollo/client'

import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ForumCategoryFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  description: string
  moderators: Array<{
    __typename: 'Worker'
    id: string
    membership: { __typename: 'Membership'; id: string; handle: string }
  }>
}

export type ForumSubCategoryFieldsFragment = { __typename: 'ForumCategory'; id: string; title: string }

export type ForumCategoryBreadcrumbsFieldsFragment = {
  __typename: 'ForumCategory'
  parent?: Types.Maybe<
    {
      __typename: 'ForumCategory'
      parent?: Types.Maybe<
        {
          __typename: 'ForumCategory'
          parent?: Types.Maybe<
            {
              __typename: 'ForumCategory'
              parent?: Types.Maybe<
                {
                  __typename: 'ForumCategory'
                  parent?: Types.Maybe<
                    {
                      __typename: 'ForumCategory'
                      parent?: Types.Maybe<{ __typename: 'ForumCategory' } & ForumSubCategoryFieldsFragment>
                    } & ForumSubCategoryFieldsFragment
                  >
                } & ForumSubCategoryFieldsFragment
              >
            } & ForumSubCategoryFieldsFragment
          >
        } & ForumSubCategoryFieldsFragment
      >
    } & ForumSubCategoryFieldsFragment
  >
} & ForumSubCategoryFieldsFragment

export type ForumThreadFieldsFragment = {
  __typename: 'ForumThread'
  id: string
  isSticky: boolean
  categoryId: string
  title: string
  authorId: string
}

export type ForumPostFieldsFragment = {
  __typename: 'ForumPost'
  repliesTo?: Types.Maybe<{ __typename: 'ForumPost' } & ForumPostWithoutReplyFieldsFragment>
} & ForumPostWithoutReplyFieldsFragment

export type ForumPostWithoutReplyFieldsFragment = {
  __typename: 'ForumPost'
  id: string
  createdAt: any
  updatedAt?: Types.Maybe<any>
  text: string
  authorId: string
  author: { __typename: 'Membership' } & MemberFieldsFragment
  postaddedeventpost?: Types.Maybe<
    Array<{ __typename: 'PostAddedEvent'; createdAt: any; inBlock: number; network: Types.Network }>
  >
}

export type ForumThreadDetailedFieldsFragment = {
  __typename: 'ForumThread'
  createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
} & ForumThreadFieldsFragment

export type GetForumCategoriesQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumCategoryWhereInput>
}>

export type GetForumCategoriesQuery = {
  __typename: 'Query'
  forumCategories: Array<{ __typename: 'ForumCategory' } & ForumCategoryFieldsFragment>
}

export type GetForumSubCategoriesQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumCategoryWhereInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetForumSubCategoriesQuery = {
  __typename: 'Query'
  forumCategories: Array<{ __typename: 'ForumCategory' } & ForumSubCategoryFieldsFragment>
}

export type GetForumCategoryBreadcrumbsQueryVariables = Types.Exact<{
  where: Types.ForumCategoryWhereUniqueInput
}>

export type GetForumCategoryBreadcrumbsQuery = {
  __typename: 'Query'
  forumCategoryByUniqueInput?: Types.Maybe<{ __typename: 'ForumCategory' } & ForumCategoryBreadcrumbsFieldsFragment>
}

export type GetForumThreadsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumThreadWhereInput>
  orderBy?: Types.Maybe<Array<Types.ForumThreadOrderByInput> | Types.ForumThreadOrderByInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetForumThreadsQuery = {
  __typename: 'Query'
  forumThreads: Array<{ __typename: 'ForumThread' } & ForumThreadFieldsFragment>
}

export type GetForumThreadsCountQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumThreadWhereInput>
}>

export type GetForumThreadsCountQuery = {
  __typename: 'Query'
  forumThreadsConnection: { __typename: 'ForumThreadConnection'; totalCount: number }
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
  orderBy?: Types.Maybe<Array<Types.ForumPostOrderByInput> | Types.ForumPostOrderByInput>
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
    moderators {
      id
      membership {
        id
        handle
      }
    }
  }
`
export const ForumSubCategoryFieldsFragmentDoc = gql`
  fragment ForumSubCategoryFields on ForumCategory {
    id
    title
  }
`
export const ForumCategoryBreadcrumbsFieldsFragmentDoc = gql`
  fragment ForumCategoryBreadcrumbsFields on ForumCategory {
    ...ForumSubCategoryFields
    parent {
      ...ForumSubCategoryFields
      parent {
        ...ForumSubCategoryFields
        parent {
          ...ForumSubCategoryFields
          parent {
            ...ForumSubCategoryFields
            parent {
              ...ForumSubCategoryFields
              parent {
                ...ForumSubCategoryFields
              }
            }
          }
        }
      }
    }
  }
  ${ForumSubCategoryFieldsFragmentDoc}
`
export const ForumPostWithoutReplyFieldsFragmentDoc = gql`
  fragment ForumPostWithoutReplyFields on ForumPost {
    id
    createdAt
    updatedAt
    author {
      ...MemberFields
    }
    text
    authorId
    postaddedeventpost {
      createdAt
      inBlock
      network
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const ForumPostFieldsFragmentDoc = gql`
  fragment ForumPostFields on ForumPost {
    ...ForumPostWithoutReplyFields
    repliesTo {
      ...ForumPostWithoutReplyFields
    }
  }
  ${ForumPostWithoutReplyFieldsFragmentDoc}
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
      createdAt
      inBlock
      network
    }
  }
  ${ForumThreadFieldsFragmentDoc}
`
export const GetForumCategoriesDocument = gql`
  query GetForumCategories($where: ForumCategoryWhereInput) {
    forumCategories(where: $where) {
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
 *      where: // value for 'where'
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
export const GetForumSubCategoriesDocument = gql`
  query GetForumSubCategories($where: ForumCategoryWhereInput, $limit: Int) {
    forumCategories(where: $where, limit: $limit) {
      ...ForumSubCategoryFields
    }
  }
  ${ForumSubCategoryFieldsFragmentDoc}
`

/**
 * __useGetForumSubCategoriesQuery__
 *
 * To run a query within a React component, call `useGetForumSubCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumSubCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumSubCategoriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetForumSubCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumSubCategoriesQuery, GetForumSubCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumSubCategoriesQuery, GetForumSubCategoriesQueryVariables>(
    GetForumSubCategoriesDocument,
    options
  )
}
export function useGetForumSubCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumSubCategoriesQuery, GetForumSubCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumSubCategoriesQuery, GetForumSubCategoriesQueryVariables>(
    GetForumSubCategoriesDocument,
    options
  )
}
export type GetForumSubCategoriesQueryHookResult = ReturnType<typeof useGetForumSubCategoriesQuery>
export type GetForumSubCategoriesLazyQueryHookResult = ReturnType<typeof useGetForumSubCategoriesLazyQuery>
export type GetForumSubCategoriesQueryResult = Apollo.QueryResult<
  GetForumSubCategoriesQuery,
  GetForumSubCategoriesQueryVariables
>
export const GetForumCategoryBreadcrumbsDocument = gql`
  query GetForumCategoryBreadcrumbs($where: ForumCategoryWhereUniqueInput!) {
    forumCategoryByUniqueInput(where: $where) {
      ...ForumCategoryBreadcrumbsFields
    }
  }
  ${ForumCategoryBreadcrumbsFieldsFragmentDoc}
`

/**
 * __useGetForumCategoryBreadcrumbsQuery__
 *
 * To run a query within a React component, call `useGetForumCategoryBreadcrumbsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoryBreadcrumbsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoryBreadcrumbsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumCategoryBreadcrumbsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>(
    GetForumCategoryBreadcrumbsDocument,
    options
  )
}
export function useGetForumCategoryBreadcrumbsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>(
    GetForumCategoryBreadcrumbsDocument,
    options
  )
}
export type GetForumCategoryBreadcrumbsQueryHookResult = ReturnType<typeof useGetForumCategoryBreadcrumbsQuery>
export type GetForumCategoryBreadcrumbsLazyQueryHookResult = ReturnType<typeof useGetForumCategoryBreadcrumbsLazyQuery>
export type GetForumCategoryBreadcrumbsQueryResult = Apollo.QueryResult<
  GetForumCategoryBreadcrumbsQuery,
  GetForumCategoryBreadcrumbsQueryVariables
>
export const GetForumThreadsDocument = gql`
  query GetForumThreads($where: ForumThreadWhereInput, $orderBy: [ForumThreadOrderByInput!], $limit: Int) {
    forumThreads(where: $where, orderBy: $orderBy, limit: $limit) {
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
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
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
export const GetForumThreadsCountDocument = gql`
  query GetForumThreadsCount($where: ForumThreadWhereInput) {
    forumThreadsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetForumThreadsCountQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(
    GetForumThreadsCountDocument,
    options
  )
}
export function useGetForumThreadsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(
    GetForumThreadsCountDocument,
    options
  )
}
export type GetForumThreadsCountQueryHookResult = ReturnType<typeof useGetForumThreadsCountQuery>
export type GetForumThreadsCountLazyQueryHookResult = ReturnType<typeof useGetForumThreadsCountLazyQuery>
export type GetForumThreadsCountQueryResult = Apollo.QueryResult<
  GetForumThreadsCountQuery,
  GetForumThreadsCountQueryVariables
>
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
  query GetForumPosts($where: ForumPostWhereInput!, $orderBy: [ForumPostOrderByInput!], $offset: Int, $limit: Int) {
    forumPosts(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
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
 *      orderBy: // value for 'orderBy'
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
