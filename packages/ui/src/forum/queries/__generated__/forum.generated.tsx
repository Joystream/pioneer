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
  description: string
  forumcategoryparent?: Types.Maybe<Array<{ __typename: 'ForumCategory' } & ForumSubCategoryFieldsFragment>>
  moderators: Array<{ __typename: 'Worker' } & ForumModeratorFieldsFragment>
} & ForumSubCategoryFieldsFragment

export type ForumCategoryWithDetailsFieldsFragment = {
  __typename: 'ForumCategory'
  description: string
  forumcategoryparent?: Types.Maybe<Array<{ __typename: 'ForumCategory' } & ForumCategoryFieldsFragment>>
  moderators: Array<{ __typename: 'Worker' } & ForumModeratorFieldsFragment>
} & ForumSubCategoryFieldsFragment

export type ForumModeratorFieldsFragment = {
  __typename: 'Worker'
  id: string
  membership: { __typename: 'Membership'; id: string; handle: string }
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
  createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
  status:
    | { __typename: 'ThreadStatusActive' }
    | { __typename: 'ThreadStatusLocked' }
    | { __typename: 'ThreadStatusModerated' }
    | { __typename: 'ThreadStatusRemoved' }
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

export type ForumThreadDetailedFieldsFragment = { __typename: 'ForumThread' } & ForumThreadFieldsFragment

export type ForumPostParentsFragment = {
  __typename: 'ForumPost'
  thread: { __typename: 'ForumThread'; id: string; category: { __typename: 'ForumCategory'; id: string } }
}

export type GetForumCategoriesQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumCategoryWhereInput>
}>

export type GetForumCategoriesQuery = {
  __typename: 'Query'
  forumCategories: Array<{ __typename: 'ForumCategory' } & ForumCategoryFieldsFragment>
}

export type GetForumCategoryQueryVariables = Types.Exact<{
  where: Types.ForumCategoryWhereUniqueInput
}>

export type GetForumCategoryQuery = {
  __typename: 'Query'
  forumCategoryByUniqueInput?: Types.Maybe<{ __typename: 'ForumCategory' } & ForumCategoryWithDetailsFieldsFragment>
}

export type GetForumCategoryBreadcrumbsQueryVariables = Types.Exact<{
  where: Types.ForumCategoryWhereUniqueInput
}>

export type GetForumCategoryBreadcrumbsQuery = {
  __typename: 'Query'
  forumCategoryByUniqueInput?: Types.Maybe<{ __typename: 'ForumCategory' } & ForumCategoryBreadcrumbsFieldsFragment>
}

export type GetForumThreadsQueryVariables = Types.Exact<{
  where: Types.ForumThreadWhereInput
  orderBy?: Types.Maybe<Array<Types.ForumThreadOrderByInput> | Types.ForumThreadOrderByInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetForumThreadsQuery = {
  __typename: 'Query'
  forumThreads: Array<{ __typename: 'ForumThread' } & ForumThreadFieldsFragment>
}

export type GetPaginatedForumThreadsQueryVariables = Types.Exact<{
  where: Types.ForumThreadWhereInput
  orderBy?: Types.Maybe<Array<Types.ForumThreadOrderByInput> | Types.ForumThreadOrderByInput>
  first?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetPaginatedForumThreadsQuery = {
  __typename: 'Query'
  forumThreadsConnection: {
    __typename: 'ForumThreadConnection'
    totalCount: number
    edges: Array<{ __typename: 'ForumThreadEdge'; node: { __typename: 'ForumThread' } & ForumThreadFieldsFragment }>
  }
}

export type GetForumThreadsCountQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ForumThreadWhereInput>
}>

export type GetForumThreadsCountQuery = {
  __typename: 'Query'
  forumThreadsConnection: { __typename: 'ForumThreadConnection'; totalCount: number }
}

export type GetForumThreadsIDsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetForumThreadsIDsQuery = {
  __typename: 'Query'
  forumThreads: Array<{ __typename: 'ForumThread'; id: string }>
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
  orderBy?: Types.Maybe<Array<Types.ForumPostOrderByInput> | Types.ForumPostOrderByInput>
}>

export type GetForumPostsQuery = {
  __typename: 'Query'
  forumPosts: Array<{ __typename: 'ForumPost' } & ForumPostFieldsFragment>
}

export type GetForumPostEditsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetForumPostEditsQuery = {
  __typename: 'Query'
  edits: Array<{
    __typename: 'PostTextUpdatedEvent'
    newText: string
    network: Types.Network
    createdAt: any
    inBlock: number
  }>
}

export type GetForumPostsCountQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
}>

export type GetForumPostsCountQuery = {
  __typename: 'Query'
  forumPostsConnection: { __typename: 'ForumPostConnection'; totalCount: number }
}

export type GetForumPostParentsQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereUniqueInput
}>

export type GetForumPostParentsQuery = {
  __typename: 'Query'
  forumPostByUniqueInput?: Types.Maybe<{ __typename: 'ForumPost' } & ForumPostParentsFragment>
}

export const ForumSubCategoryFieldsFragmentDoc = gql`
  fragment ForumSubCategoryFields on ForumCategory {
    id
    title
  }
`
export const ForumModeratorFieldsFragmentDoc = gql`
  fragment ForumModeratorFields on Worker {
    id
    membership {
      id
      handle
    }
  }
`
export const ForumCategoryFieldsFragmentDoc = gql`
  fragment ForumCategoryFields on ForumCategory {
    ...ForumSubCategoryFields
    description
    forumcategoryparent {
      ...ForumSubCategoryFields
    }
    moderators {
      ...ForumModeratorFields
    }
  }
  ${ForumSubCategoryFieldsFragmentDoc}
  ${ForumModeratorFieldsFragmentDoc}
`
export const ForumCategoryWithDetailsFieldsFragmentDoc = gql`
  fragment ForumCategoryWithDetailsFields on ForumCategory {
    ...ForumSubCategoryFields
    description
    forumcategoryparent {
      ...ForumCategoryFields
    }
    moderators {
      ...ForumModeratorFields
    }
  }
  ${ForumSubCategoryFieldsFragmentDoc}
  ${ForumCategoryFieldsFragmentDoc}
  ${ForumModeratorFieldsFragmentDoc}
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
    createdInEvent {
      createdAt
      inBlock
      network
    }
    status {
      __typename
    }
  }
`
export const ForumThreadDetailedFieldsFragmentDoc = gql`
  fragment ForumThreadDetailedFields on ForumThread {
    ...ForumThreadFields
  }
  ${ForumThreadFieldsFragmentDoc}
`
export const ForumPostParentsFragmentDoc = gql`
  fragment ForumPostParents on ForumPost {
    thread {
      id
      category {
        id
      }
    }
  }
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
export const GetForumCategoryDocument = gql`
  query GetForumCategory($where: ForumCategoryWhereUniqueInput!) {
    forumCategoryByUniqueInput(where: $where) {
      ...ForumCategoryWithDetailsFields
    }
  }
  ${ForumCategoryWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetForumCategoryQuery__
 *
 * To run a query within a React component, call `useGetForumCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumCategoryQuery, GetForumCategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoryQuery, GetForumCategoryQueryVariables>(GetForumCategoryDocument, options)
}
export function useGetForumCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoryQuery, GetForumCategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoryQuery, GetForumCategoryQueryVariables>(GetForumCategoryDocument, options)
}
export type GetForumCategoryQueryHookResult = ReturnType<typeof useGetForumCategoryQuery>
export type GetForumCategoryLazyQueryHookResult = ReturnType<typeof useGetForumCategoryLazyQuery>
export type GetForumCategoryQueryResult = Apollo.QueryResult<GetForumCategoryQuery, GetForumCategoryQueryVariables>
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
  query GetForumThreads($where: ForumThreadWhereInput!, $orderBy: [ForumThreadOrderByInput!], $limit: Int) {
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
  baseOptions: Apollo.QueryHookOptions<GetForumThreadsQuery, GetForumThreadsQueryVariables>
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
export const GetPaginatedForumThreadsDocument = gql`
  query GetPaginatedForumThreads($where: ForumThreadWhereInput!, $orderBy: [ForumThreadOrderByInput!], $first: Int) {
    forumThreadsConnection(where: $where, orderBy: $orderBy, first: $first) {
      totalCount
      edges {
        node {
          ...ForumThreadFields
        }
      }
    }
  }
  ${ForumThreadFieldsFragmentDoc}
`

/**
 * __useGetPaginatedForumThreadsQuery__
 *
 * To run a query within a React component, call `useGetPaginatedForumThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedForumThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedForumThreadsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetPaginatedForumThreadsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPaginatedForumThreadsQuery, GetPaginatedForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPaginatedForumThreadsQuery, GetPaginatedForumThreadsQueryVariables>(
    GetPaginatedForumThreadsDocument,
    options
  )
}
export function useGetPaginatedForumThreadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedForumThreadsQuery, GetPaginatedForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPaginatedForumThreadsQuery, GetPaginatedForumThreadsQueryVariables>(
    GetPaginatedForumThreadsDocument,
    options
  )
}
export type GetPaginatedForumThreadsQueryHookResult = ReturnType<typeof useGetPaginatedForumThreadsQuery>
export type GetPaginatedForumThreadsLazyQueryHookResult = ReturnType<typeof useGetPaginatedForumThreadsLazyQuery>
export type GetPaginatedForumThreadsQueryResult = Apollo.QueryResult<
  GetPaginatedForumThreadsQuery,
  GetPaginatedForumThreadsQueryVariables
>
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
export const GetForumThreadsIDsDocument = gql`
  query GetForumThreadsIDs {
    forumThreads {
      id
    }
  }
`

/**
 * __useGetForumThreadsIDsQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsIDsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetForumThreadsIDsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>(GetForumThreadsIDsDocument, options)
}
export function useGetForumThreadsIDsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>(
    GetForumThreadsIDsDocument,
    options
  )
}
export type GetForumThreadsIDsQueryHookResult = ReturnType<typeof useGetForumThreadsIDsQuery>
export type GetForumThreadsIDsLazyQueryHookResult = ReturnType<typeof useGetForumThreadsIDsLazyQuery>
export type GetForumThreadsIDsQueryResult = Apollo.QueryResult<
  GetForumThreadsIDsQuery,
  GetForumThreadsIDsQueryVariables
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
  query GetForumPosts($where: ForumPostWhereInput!, $offset: Int, $limit: Int, $orderBy: [ForumPostOrderByInput!]) {
    forumPosts(where: $where, offset: $offset, limit: $limit, orderBy: $orderBy) {
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
 *      orderBy: // value for 'orderBy'
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
export const GetForumPostEditsDocument = gql`
  query GetForumPostEdits($id: ID!) {
    edits: postTextUpdatedEvents(where: { post: { id_eq: $id } }) {
      newText
      network
      createdAt
      inBlock
    }
  }
`

/**
 * __useGetForumPostEditsQuery__
 *
 * To run a query within a React component, call `useGetForumPostEditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostEditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostEditsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForumPostEditsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>(GetForumPostEditsDocument, options)
}
export function useGetForumPostEditsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>(
    GetForumPostEditsDocument,
    options
  )
}
export type GetForumPostEditsQueryHookResult = ReturnType<typeof useGetForumPostEditsQuery>
export type GetForumPostEditsLazyQueryHookResult = ReturnType<typeof useGetForumPostEditsLazyQuery>
export type GetForumPostEditsQueryResult = Apollo.QueryResult<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>
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
export const GetForumPostParentsDocument = gql`
  query GetForumPostParents($where: ForumPostWhereUniqueInput!) {
    forumPostByUniqueInput(where: $where) {
      ...ForumPostParents
    }
  }
  ${ForumPostParentsFragmentDoc}
`

/**
 * __useGetForumPostParentsQuery__
 *
 * To run a query within a React component, call `useGetForumPostParentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostParentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostParentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumPostParentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>(
    GetForumPostParentsDocument,
    options
  )
}
export function useGetForumPostParentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>(
    GetForumPostParentsDocument,
    options
  )
}
export type GetForumPostParentsQueryHookResult = ReturnType<typeof useGetForumPostParentsQuery>
export type GetForumPostParentsLazyQueryHookResult = ReturnType<typeof useGetForumPostParentsLazyQuery>
export type GetForumPostParentsQueryResult = Apollo.QueryResult<
  GetForumPostParentsQuery,
  GetForumPostParentsQueryVariables
>
