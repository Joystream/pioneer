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
    "fragment PostFields on ForumPost {\n  id\n  authorId\n  createdAt\n  text\n  thread {\n    id\n    authorId\n    posts {\n      authorId\n      createdAt\n      text\n    }\n    category {\n      moderators {\n        membershipId\n      }\n    }\n  }\n}\n\nfragment ProposalDiscussionPostFields on ProposalDiscussionPost {\n  id\n  authorId\n  text\n  discussionThread {\n    id\n    proposal {\n      id\n      creatorId\n    }\n    posts {\n      authorId\n      text\n    }\n  }\n}\n\nfragment PostAddedEventFields on PostAddedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    ...PostFields\n  }\n}\n\nfragment ProposalDiscussionPostCreatedEventFields on ProposalDiscussionPostCreatedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    ...ProposalDiscussionPostFields\n  }\n}\n\nquery GetNotificationEvents {\n  events(\n    where: {type_in: [PostAddedEvent, PostTextUpdatedEvent]}\n    limit: 50\n    orderBy: [createdAt_DESC]\n  ) {\n    ... on PostAddedEvent {\n      ...PostAddedEventFields\n    }\n    ... on ProposalDiscussionPostCreatedEvent {\n      ...ProposalDiscussionPostCreatedEventFields\n    }\n  }\n}": types.PostFieldsFragmentDoc,
    "query GetMembershipById($id: ID!) {\n  membershipByUniqueInput(where: {id: $id}) {\n    controllerAccount\n  }\n}": types.GetMembershipByIdDocument,
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
export function graphql(source: "fragment PostFields on ForumPost {\n  id\n  authorId\n  createdAt\n  text\n  thread {\n    id\n    authorId\n    posts {\n      authorId\n      createdAt\n      text\n    }\n    category {\n      moderators {\n        membershipId\n      }\n    }\n  }\n}\n\nfragment ProposalDiscussionPostFields on ProposalDiscussionPost {\n  id\n  authorId\n  text\n  discussionThread {\n    id\n    proposal {\n      id\n      creatorId\n    }\n    posts {\n      authorId\n      text\n    }\n  }\n}\n\nfragment PostAddedEventFields on PostAddedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    ...PostFields\n  }\n}\n\nfragment ProposalDiscussionPostCreatedEventFields on ProposalDiscussionPostCreatedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    ...ProposalDiscussionPostFields\n  }\n}\n\nquery GetNotificationEvents {\n  events(\n    where: {type_in: [PostAddedEvent, PostTextUpdatedEvent]}\n    limit: 50\n    orderBy: [createdAt_DESC]\n  ) {\n    ... on PostAddedEvent {\n      ...PostAddedEventFields\n    }\n    ... on ProposalDiscussionPostCreatedEvent {\n      ...ProposalDiscussionPostCreatedEventFields\n    }\n  }\n}"): (typeof documents)["fragment PostFields on ForumPost {\n  id\n  authorId\n  createdAt\n  text\n  thread {\n    id\n    authorId\n    posts {\n      authorId\n      createdAt\n      text\n    }\n    category {\n      moderators {\n        membershipId\n      }\n    }\n  }\n}\n\nfragment ProposalDiscussionPostFields on ProposalDiscussionPost {\n  id\n  authorId\n  text\n  discussionThread {\n    id\n    proposal {\n      id\n      creatorId\n    }\n    posts {\n      authorId\n      text\n    }\n  }\n}\n\nfragment PostAddedEventFields on PostAddedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    ...PostFields\n  }\n}\n\nfragment ProposalDiscussionPostCreatedEventFields on ProposalDiscussionPostCreatedEvent {\n  __typename\n  id\n  inBlock\n  post {\n    ...ProposalDiscussionPostFields\n  }\n}\n\nquery GetNotificationEvents {\n  events(\n    where: {type_in: [PostAddedEvent, PostTextUpdatedEvent]}\n    limit: 50\n    orderBy: [createdAt_DESC]\n  ) {\n    ... on PostAddedEvent {\n      ...PostAddedEventFields\n    }\n    ... on ProposalDiscussionPostCreatedEvent {\n      ...ProposalDiscussionPostCreatedEventFields\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMembershipById($id: ID!) {\n  membershipByUniqueInput(where: {id: $id}) {\n    controllerAccount\n  }\n}"): (typeof documents)["query GetMembershipById($id: ID!) {\n  membershipByUniqueInput(where: {id: $id}) {\n    controllerAccount\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;