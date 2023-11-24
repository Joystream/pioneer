/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetMembershipById($id: ID!) {\n  membershipByUniqueInput(where: {id: $id}) {\n    controllerAccount\n  }\n}": types.GetMembershipByIdDocument,
    "query GetPost($id: ID!) {\n  forumPostByUniqueInput(where: {id: $id}) {\n    author {\n      handle\n    }\n    thread {\n      id\n      title\n    }\n    text\n  }\n}\n\nquery GetThread($id: ID!) {\n  forumThreadByUniqueInput(where: {id: $id}) {\n    author {\n      handle\n    }\n    title\n    initialPost {\n      text\n    }\n  }\n}\n\nquery getForumCategory($id: ID!) {\n  forumCategoryByUniqueInput(where: {id: $id}) {\n    parentId\n  }\n}": types.GetPostDocument,
    "fragment PostAddedEventFields on PostAddedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    id\n    authorId\n    createdAt\n    text\n    repliesTo {\n      authorId\n    }\n    thread {\n      id\n      authorId\n      posts {\n        authorId\n        createdAt\n        text\n      }\n      categoryId\n    }\n  }\n}\n\nfragment ThreadCreatedEventFields on ThreadCreatedEvent {\n  __typename\n  id\n  inBlock\n  thread {\n    id\n    authorId\n    categoryId\n  }\n  text\n}\n\nfragment ElectionAnnouncingStartedEventFields on AnnouncingPeriodStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nfragment ElectionVotingStartedEventFields on VotingPeriodStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nfragment ElectionRevealingStartedFields on RevealingStageStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nquery GetNotificationEvents($from: Int, $exclude: [ID!]) {\n  events(\n    where: {type_in: [PostAddedEvent, ThreadCreatedEvent, AnnouncingPeriodStartedEvent, VotingPeriodStartedEvent, RevealingStageStartedEvent], inBlock_gte: $from, NOT: {id_in: $exclude}}\n    orderBy: [inBlock_ASC]\n  ) {\n    ... on PostAddedEvent {\n      ...PostAddedEventFields\n    }\n    ... on ThreadCreatedEvent {\n      ...ThreadCreatedEventFields\n    }\n    ... on AnnouncingPeriodStartedEvent {\n      ...ElectionAnnouncingStartedEventFields\n    }\n    ... on VotingPeriodStartedEvent {\n      ...ElectionVotingStartedEventFields\n    }\n    ... on RevealingStageStartedEvent {\n      ...ElectionRevealingStartedFields\n    }\n  }\n}": types.PostAddedEventFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMembershipById($id: ID!) {\n  membershipByUniqueInput(where: {id: $id}) {\n    controllerAccount\n  }\n}"): (typeof documents)["query GetMembershipById($id: ID!) {\n  membershipByUniqueInput(where: {id: $id}) {\n    controllerAccount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPost($id: ID!) {\n  forumPostByUniqueInput(where: {id: $id}) {\n    author {\n      handle\n    }\n    thread {\n      id\n      title\n    }\n    text\n  }\n}\n\nquery GetThread($id: ID!) {\n  forumThreadByUniqueInput(where: {id: $id}) {\n    author {\n      handle\n    }\n    title\n    initialPost {\n      text\n    }\n  }\n}\n\nquery getForumCategory($id: ID!) {\n  forumCategoryByUniqueInput(where: {id: $id}) {\n    parentId\n  }\n}"): (typeof documents)["query GetPost($id: ID!) {\n  forumPostByUniqueInput(where: {id: $id}) {\n    author {\n      handle\n    }\n    thread {\n      id\n      title\n    }\n    text\n  }\n}\n\nquery GetThread($id: ID!) {\n  forumThreadByUniqueInput(where: {id: $id}) {\n    author {\n      handle\n    }\n    title\n    initialPost {\n      text\n    }\n  }\n}\n\nquery getForumCategory($id: ID!) {\n  forumCategoryByUniqueInput(where: {id: $id}) {\n    parentId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostAddedEventFields on PostAddedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    id\n    authorId\n    createdAt\n    text\n    repliesTo {\n      authorId\n    }\n    thread {\n      id\n      authorId\n      posts {\n        authorId\n        createdAt\n        text\n      }\n      categoryId\n    }\n  }\n}\n\nfragment ThreadCreatedEventFields on ThreadCreatedEvent {\n  __typename\n  id\n  inBlock\n  thread {\n    id\n    authorId\n    categoryId\n  }\n  text\n}\n\nfragment ElectionAnnouncingStartedEventFields on AnnouncingPeriodStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nfragment ElectionVotingStartedEventFields on VotingPeriodStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nfragment ElectionRevealingStartedFields on RevealingStageStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nquery GetNotificationEvents($from: Int, $exclude: [ID!]) {\n  events(\n    where: {type_in: [PostAddedEvent, ThreadCreatedEvent, AnnouncingPeriodStartedEvent, VotingPeriodStartedEvent, RevealingStageStartedEvent], inBlock_gte: $from, NOT: {id_in: $exclude}}\n    orderBy: [inBlock_ASC]\n  ) {\n    ... on PostAddedEvent {\n      ...PostAddedEventFields\n    }\n    ... on ThreadCreatedEvent {\n      ...ThreadCreatedEventFields\n    }\n    ... on AnnouncingPeriodStartedEvent {\n      ...ElectionAnnouncingStartedEventFields\n    }\n    ... on VotingPeriodStartedEvent {\n      ...ElectionVotingStartedEventFields\n    }\n    ... on RevealingStageStartedEvent {\n      ...ElectionRevealingStartedFields\n    }\n  }\n}"): (typeof documents)["fragment PostAddedEventFields on PostAddedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    id\n    authorId\n    createdAt\n    text\n    repliesTo {\n      authorId\n    }\n    thread {\n      id\n      authorId\n      posts {\n        authorId\n        createdAt\n        text\n      }\n      categoryId\n    }\n  }\n}\n\nfragment ThreadCreatedEventFields on ThreadCreatedEvent {\n  __typename\n  id\n  inBlock\n  thread {\n    id\n    authorId\n    categoryId\n  }\n  text\n}\n\nfragment ElectionAnnouncingStartedEventFields on AnnouncingPeriodStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nfragment ElectionVotingStartedEventFields on VotingPeriodStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nfragment ElectionRevealingStartedFields on RevealingStageStartedEvent {\n  __typename\n  id\n  inBlock\n}\n\nquery GetNotificationEvents($from: Int, $exclude: [ID!]) {\n  events(\n    where: {type_in: [PostAddedEvent, ThreadCreatedEvent, AnnouncingPeriodStartedEvent, VotingPeriodStartedEvent, RevealingStageStartedEvent], inBlock_gte: $from, NOT: {id_in: $exclude}}\n    orderBy: [inBlock_ASC]\n  ) {\n    ... on PostAddedEvent {\n      ...PostAddedEventFields\n    }\n    ... on ThreadCreatedEvent {\n      ...ThreadCreatedEventFields\n    }\n    ... on AnnouncingPeriodStartedEvent {\n      ...ElectionAnnouncingStartedEventFields\n    }\n    ... on VotingPeriodStartedEvent {\n      ...ElectionVotingStartedEventFields\n    }\n    ... on RevealingStageStartedEvent {\n      ...ElectionRevealingStartedFields\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;