# Developer documentation

## Development tools

In order to work on Pionner 2 you'd need following tools for development and testing:

- [nodejs](https://nodejs.org) `v14.x`
- [yarn classic](https://classic.yarnpkg.com/en/docs/install) package manager `v1.22.x`

In order to interact with the Joystream ecostystem

- [Joystream node](https://github.com/Joystream/joystream/tree/master/node) _optional_
- [Joystream query-node](https://github.com/Joystream/joystream/tree/query_node/query-node) _optional_

## Tech stack

The Pioneer 2.0 is build using the latest version of React. The React development assumes:

- TypeScript
- Function components
- styled components for CSS

## Coding standards

For code quality & standards we rely on ESLint and Prettier. To run both checks execute inside `packages/ui`:

```shell
## Run linter
yarn lint

## Run lint & apply automatic fixes
yarn lint:fix
```

## CI & integration

The repository has enabled the continuous integration for every commit that lands on `main` as well as for every PR:

- Code inspection and tests (for PR only):
  - linter check
  - build step
  - tests
- The application preview on netlify
- The storybook preview on netlify

**Note**: Only the PRs that pass CI check can be included in the `main` branch.

## Branching strategy

All PRs land in the `main` branch. Other branches are short-lived for development purposes. However, the archival branches exists under `/arch/*` – those consists prepared components or code that was not included in the main branch, but might be needed at later stage.

## Query-node API

To access the archival state of the chain Pioneer 2 fetch such information from the [query-node](https://github.com/Joystream/joystream/tree/query_node/query-node). It is a GraphQL server that allows a convenient API for querying the data.

The following tools are used to consume GraphQL data:
  - [Apollo Client](https://www.apollographql.com/docs/react/) for accessing GraphQL

### Query-node Mocks

To mock the query-node server we use [Mirage JS](https://miragejs.com/) in tests, storybook data and for local development.

All MirageJS & query-node mocks are stored inside the [`@/mocks`](packages/ui/src/mocks).

#### Adding a mocks for a GraphQL Entity

In order to properly mock an `Entity` you should:

1. Prepare mocked data
  * Write a generator that re-creates [seed raw data](packages/ui/src/mocks/data/raw) as JSON file.
  * See [generators](packages/ui/dev/query-node-mocks/generators) for examples.
1. Write a MirageJS seed function
  * A seed function will create proper MirageJS [database](https://miragejs.com/docs/main-concepts/database/) entries from raw data.
  * It should add only the data used by queries. Other information can be omitted.
  * A seed function may create related objects and/or add additional mock information.
  * *Optionally*: Some relations doesn't translate well in MirageJS GraphQL implementation. See [`fixAssiociations()`](https://github.com/Joystream/pioneer/blob/e9e609dadc3c65ed2410c301904836f2868df9dc/packages/ui/src/mocks/server.ts#L27) for details.
1. Run the `yarn query-node-mocks` to recreate mocks
1. Add GraphQL query resolvers
  * Resolvers are used to handle the passed GraphQL query and return the data in a _similar_ fashion to Hydra's GraphQL server.
  * In most cases you'd only need to add a general query resolver for each type of queries:
    * `getWhereResolver('Entity')` - returns a resolver that handles multiple results are returned (many), also used for paginated results, e.g. `forumPosts`, `memberships`
    * `getUniqueResolver('Entity')` – returns a resolver that handles unique results (one), e.g. `forumPostByUniqueInput`, `membershipByUniqueInput`
    * `getConnectionResolver('Entity')` - return a resolver for [relay-style pagination](https://relay.dev/graphql/connections.htm) results, e.g. `forumPostsConneciton`, `membershipsConnection`

### Code generation

Some GraphQL related tools use code generation to scaffold types and react hooks from GraphQL schemas and queries.

After updating `packages/ui/src/api` any of `*.graphql` files run `yarn queries:generated` script in the UI package.

## Dependencies

The package.json entries for `@polkadot/*` packages must be set to the exact versions in order to match Joystream dependencies. See `resolutions` section in [package.json](/package.json) for details.
