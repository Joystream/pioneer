import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type PostAddedEventFieldsFragment = { __typename: 'PostAddedEvent', id: string, createdAt: any, post: { __typename: 'ForumPost', id: string, thread: { __typename: 'ForumThread', id: string }, author: { __typename: 'Membership', id: string, handle: string } } };

export type PostTextUpdatedEventFieldsFragment = { __typename: 'PostTextUpdatedEvent', id: string, createdAt: any, post: { __typename: 'ForumPost', id: string, thread: { __typename: 'ForumThread', id: string }, author: { __typename: 'Membership', id: string, handle: string } } };

export type GetForumEventsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetForumEventsQuery = { __typename: 'Query', postAddedEvents: Array<(
    { __typename: 'PostAddedEvent' }
    & PostAddedEventFieldsFragment
  )>, postTextUpdatedEvents: Array<(
    { __typename: 'PostTextUpdatedEvent' }
    & PostTextUpdatedEventFieldsFragment
  )> };

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
    `;
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
    `;
export const GetForumEventsDocument = gql`
    query GetForumEvents {
  postAddedEvents(orderBy: createdAt_DESC, limit: 10) {
    ...PostAddedEventFields
  }
  postTextUpdatedEvents(orderBy: createdAt_DESC, limit: 10) {
    ...PostTextUpdatedEventFields
  }
}
    ${PostAddedEventFieldsFragmentDoc}
${PostTextUpdatedEventFieldsFragmentDoc}`;

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
export function useGetForumEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetForumEventsQuery, GetForumEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForumEventsQuery, GetForumEventsQueryVariables>(GetForumEventsDocument, options);
      }
export function useGetForumEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumEventsQuery, GetForumEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForumEventsQuery, GetForumEventsQueryVariables>(GetForumEventsDocument, options);
        }
export type GetForumEventsQueryHookResult = ReturnType<typeof useGetForumEventsQuery>;
export type GetForumEventsLazyQueryHookResult = ReturnType<typeof useGetForumEventsLazyQuery>;
export type GetForumEventsQueryResult = Apollo.QueryResult<GetForumEventsQuery, GetForumEventsQueryVariables>;