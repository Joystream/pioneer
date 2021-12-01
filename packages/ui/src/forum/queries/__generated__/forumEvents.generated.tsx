import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type PostAddedEventFieldsFragment = {
  __typename: 'PostAddedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ForumPost'
    id: string
    thread: { __typename: 'ForumThread'; id: string }
    author: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type PostTextUpdatedEventFieldsFragment = {
  __typename: 'PostTextUpdatedEvent'
  id: string
  createdAt: any
  post: {
    __typename: 'ForumPost'
    id: string
    thread: { __typename: 'ForumThread'; id: string }
    author: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type PostDeletedEventFieldsFragment = {
  __typename: 'PostDeletedEvent'
  id: string
  createdAt: any
  posts: Array<{
    __typename: 'ForumPost'
    id: string
    thread: { __typename: 'ForumThread'; id: string; title: string }
  }>
  actor: { __typename: 'Membership'; id: string; handle: string }
}

export type PostModeratedEventFieldsFragment = {
  __typename: 'PostModeratedEvent'
  id: string
  createdAt: any
  post: { __typename: 'ForumPost'; id: string; thread: { __typename: 'ForumThread'; id: string } }
  actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type ThreadCreatedEventFieldsFragment = {
  __typename: 'ThreadCreatedEvent'
  id: string
  createdAt: any
  thread: {
    __typename: 'ForumThread'
    id: string
    title: string
    author: { __typename: 'Membership'; id: string; handle: string }
    category: { __typename: 'ForumCategory'; id: string; title: string }
  }
}

export type ThreadDeletedEventFieldsFragment = {
  __typename: 'ThreadDeletedEvent'
  id: string
  createdAt: any
  thread: { __typename: 'ForumThread'; id: string; title: string }
}

export type ThreadModeratedEventFieldsFragment = {
  __typename: 'ThreadModeratedEvent'
  id: string
  createdAt: any
  thread: { __typename: 'ForumThread'; id: string; title: string }
  actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type CategoryCreatedEventFieldsFragment = {
  __typename: 'CategoryCreatedEvent'
  id: string
  createdAt: any
  category: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: { __typename: 'ForumCategory'; id: string; title: string } | null | undefined
  }
}

export type CategoryDeletedEventFieldsFragment = {
  __typename: 'CategoryDeletedEvent'
  id: string
  createdAt: any
  category: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: { __typename: 'ForumCategory'; id: string; title: string } | null | undefined
  }
}

export type GetForumEventsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetForumEventsQuery = {
  __typename: 'Query'
  postAddedEvents: Array<{
    __typename: 'PostAddedEvent'
    id: string
    createdAt: any
    post: {
      __typename: 'ForumPost'
      id: string
      thread: { __typename: 'ForumThread'; id: string }
      author: { __typename: 'Membership'; id: string; handle: string }
    }
  }>
  postTextUpdatedEvents: Array<{
    __typename: 'PostTextUpdatedEvent'
    id: string
    createdAt: any
    post: {
      __typename: 'ForumPost'
      id: string
      thread: { __typename: 'ForumThread'; id: string }
      author: { __typename: 'Membership'; id: string; handle: string }
    }
  }>
  postModeratedEvents: Array<{
    __typename: 'PostModeratedEvent'
    id: string
    createdAt: any
    post: { __typename: 'ForumPost'; id: string; thread: { __typename: 'ForumThread'; id: string } }
    actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  postDeletedEvents: Array<{
    __typename: 'PostDeletedEvent'
    id: string
    createdAt: any
    posts: Array<{
      __typename: 'ForumPost'
      id: string
      thread: { __typename: 'ForumThread'; id: string; title: string }
    }>
    actor: { __typename: 'Membership'; id: string; handle: string }
  }>
  threadCreatedEvents: Array<{
    __typename: 'ThreadCreatedEvent'
    id: string
    createdAt: any
    thread: {
      __typename: 'ForumThread'
      id: string
      title: string
      author: { __typename: 'Membership'; id: string; handle: string }
      category: { __typename: 'ForumCategory'; id: string; title: string }
    }
  }>
  threadDeletedEvents: Array<{
    __typename: 'ThreadDeletedEvent'
    id: string
    createdAt: any
    thread: { __typename: 'ForumThread'; id: string; title: string }
  }>
  threadModeratedEvents: Array<{
    __typename: 'ThreadModeratedEvent'
    id: string
    createdAt: any
    thread: { __typename: 'ForumThread'; id: string; title: string }
    actor: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
  }>
  categoryCreatedEvents: Array<{
    __typename: 'CategoryCreatedEvent'
    id: string
    createdAt: any
    category: {
      __typename: 'ForumCategory'
      id: string
      title: string
      parent?: { __typename: 'ForumCategory'; id: string; title: string } | null | undefined
    }
  }>
  categoryDeletedEvents: Array<{
    __typename: 'CategoryDeletedEvent'
    id: string
    createdAt: any
    category: {
      __typename: 'ForumCategory'
      id: string
      title: string
      parent?: { __typename: 'ForumCategory'; id: string; title: string } | null | undefined
    }
  }>
}

export const PostAddedEventFieldsFragmentDoc = gql`
  fragment PostAddedEventFields on PostAddedEvent {
    id
    createdAt
    post {
      id
      thread {
        id
      }
      author {
        id
        handle
      }
    }
  }
`
export const PostTextUpdatedEventFieldsFragmentDoc = gql`
  fragment PostTextUpdatedEventFields on PostTextUpdatedEvent {
    id
    createdAt
    post {
      id
      thread {
        id
      }
      author {
        id
        handle
      }
    }
  }
`
export const PostDeletedEventFieldsFragmentDoc = gql`
  fragment PostDeletedEventFields on PostDeletedEvent {
    id
    createdAt
    posts {
      id
      thread {
        id
        title
      }
    }
    actor {
      id
      handle
    }
  }
`
export const PostModeratedEventFieldsFragmentDoc = gql`
  fragment PostModeratedEventFields on PostModeratedEvent {
    id
    createdAt
    post {
      id
      thread {
        id
      }
    }
    actor {
      membership {
        id
        handle
      }
    }
  }
`
export const ThreadCreatedEventFieldsFragmentDoc = gql`
  fragment ThreadCreatedEventFields on ThreadCreatedEvent {
    id
    createdAt
    thread {
      id
      title
      author {
        id
        handle
      }
      category {
        id
        title
      }
    }
  }
`
export const ThreadDeletedEventFieldsFragmentDoc = gql`
  fragment ThreadDeletedEventFields on ThreadDeletedEvent {
    id
    createdAt
    thread {
      id
      title
    }
  }
`
export const ThreadModeratedEventFieldsFragmentDoc = gql`
  fragment ThreadModeratedEventFields on ThreadModeratedEvent {
    id
    createdAt
    thread {
      id
      title
    }
    actor {
      membership {
        id
        handle
      }
    }
  }
`
export const CategoryCreatedEventFieldsFragmentDoc = gql`
  fragment CategoryCreatedEventFields on CategoryCreatedEvent {
    id
    createdAt
    category {
      id
      title
      parent {
        id
        title
      }
    }
  }
`
export const CategoryDeletedEventFieldsFragmentDoc = gql`
  fragment CategoryDeletedEventFields on CategoryDeletedEvent {
    id
    createdAt
    category {
      id
      title
      parent {
        id
        title
      }
    }
  }
`
export const GetForumEventsDocument = gql`
  query GetForumEvents {
    postAddedEvents(orderBy: createdAt_DESC, limit: 10) {
      ...PostAddedEventFields
    }
    postTextUpdatedEvents(orderBy: createdAt_DESC, limit: 10) {
      ...PostTextUpdatedEventFields
    }
    postModeratedEvents(orderBy: createdAt_DESC, limit: 10) {
      ...PostModeratedEventFields
    }
    postDeletedEvents(orderBy: createdAt_DESC, limit: 10) {
      ...PostDeletedEventFields
    }
    threadCreatedEvents(orderBy: createdAt_DESC, limit: 5) {
      ...ThreadCreatedEventFields
    }
    threadDeletedEvents(orderBy: createdAt_DESC, limit: 5) {
      ...ThreadDeletedEventFields
    }
    threadModeratedEvents(orderBy: createdAt_DESC, limit: 5) {
      ...ThreadModeratedEventFields
    }
    categoryCreatedEvents(orderBy: createdAt_DESC, limit: 5) {
      ...CategoryCreatedEventFields
    }
    categoryDeletedEvents(orderBy: createdAt_DESC, limit: 5) {
      ...CategoryDeletedEventFields
    }
  }
  ${PostAddedEventFieldsFragmentDoc}
  ${PostTextUpdatedEventFieldsFragmentDoc}
  ${PostModeratedEventFieldsFragmentDoc}
  ${PostDeletedEventFieldsFragmentDoc}
  ${ThreadCreatedEventFieldsFragmentDoc}
  ${ThreadDeletedEventFieldsFragmentDoc}
  ${ThreadModeratedEventFieldsFragmentDoc}
  ${CategoryCreatedEventFieldsFragmentDoc}
  ${CategoryDeletedEventFieldsFragmentDoc}
`

/**
 * __useGetForumEventsQuery__
 *
 * To run a query within a React component, call `useGetForumEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetForumEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumEventsQuery, GetForumEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumEventsQuery, GetForumEventsQueryVariables>(GetForumEventsDocument, options)
}
export function useGetForumEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumEventsQuery, GetForumEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumEventsQuery, GetForumEventsQueryVariables>(GetForumEventsDocument, options)
}
export type GetForumEventsQueryHookResult = ReturnType<typeof useGetForumEventsQuery>
export type GetForumEventsLazyQueryHookResult = ReturnType<typeof useGetForumEventsLazyQuery>
export type GetForumEventsQueryResult = Apollo.QueryResult<GetForumEventsQuery, GetForumEventsQueryVariables>
