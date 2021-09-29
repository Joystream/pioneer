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

## Tests

The testing strategy involves two stages:
1. storybook for simple components & manual tests
2. automated tests for business logic

### The storybook

The project's [storybook](https://storybook.js.org/) is build by the CI and available at [https://pioneer-2-storybook.netlify.app/](https://pioneer-2-storybook.netlify.app/).

To run the local instance (project root or `packages/ui` directory):

```bash
yarn run storybook
```

For more complex components, the stories might [query-node mocks](#query-node-mocks) in order to fetch data.

Example story that uses query-node mocks to fetch `members` data:

```tsx
import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ComplexComponent } from '@/foo/bar/components/ComplexComponent'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'ComplexComponent',
  component: ComplexComponent,
} as Meta

export const Default: Story = () => {
  return (
    <MockApolloProvider members>
      <ComplexComponent />
    </MockApolloProvider>
  )
}
```

**Note**: Some components might need to connect with Polkadot.js extension. However, the extension API can't be accessed inside storybook's iframe ([example story](/packages/ui/src/accounts/components/SelectAccount/SelectAccount.stories.tsx) that renders warning).

### Tests

Pioneer 2 use [jest](https://jestjs.io/) to run automated tests and [testing-library](https://testing-library.com/) as testing utilities. The [query-node mocks](#query-node-mocks) uses the same setup as the front-end mocks.

#### Polkadot.js API stubs

In order to ease stubbing Polkadot.js API there is a bunch of testing utilities to stub common responses or states:

The most common one is `stubTransction` with helpers to simulate transaction success or failure:

```ts
import { stubTransactionSuccess } from 'ui/test/_mocks/transactions'
const api = stubApi()

let transaction: any

beforeEach(() => {
  // This exposes `tx.balances.transfer` on the api stub.
  transaction = stubTransaction(api, 'api.tx.balances.transfer')
})

describe('Transaciton', () => {
it('Success', () => {
    stubTransactionSuccess(transaction)
    // ...
  })

  it('Data in success events', () => {
    stubTransactionSuccess(transaction, [createType('ThreadId', 1337)], 'forum', 'ThreadCreated')
    // ...
  })

  it('Failure', () => {
    stubTransactionFailure(transfer)
    // ...
  })
})
```

The other stubs helps with creating balances, `api.query.*` responses, etc.

#### Specific helpers

- To interact with dropdowns use `selectFromDropdown()` helper
- To interact with Pioneer 2 buttons use `getButton()` test helper which is optimized for [test speed](#slow-tests).
- Don't run the CKEditor inside tests (JSDom is not fully compatible with contenteditable)
  ```ts
  jest.mock('@/common/components/CKEditor', () => ({
    CKEditor: (props: CKEditorProps) => mockCKEditor(props),
  }))

  describe('Component with CKEditor inside', () => {})
  ```

#### Slow tests

If you experience a slow test:

- Reduce number of mocked data. The default `seedEntity()` methods loads all the date (with related tables) while most of the tests needs only one or two entities.
- Look out for `*ByRole()` queries as they are way slower than `*ByText()` or `*ByTestId()` (we use `id` as test-id attribute).

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

## Joystream API

Both - the testnet & local development environment expects that a Joystream node instance is available.

Expected URIs:

- local: `ws://127.0.0.1:9944`
- testnet: `wss://olympia-dev.joystream.app`

### Local environment limitations

Since the local query-node operates on [mocks](#query-node-mocks) all of the mocked entities are not present.

The second limitation is that any on-chain action is not represented in the query-node mocks.

### Node mocks

To test most of the extrinsics requires existing on-chain data. To create some on-chain objects use the `yarn run node-mocks` script or use the polkadot apps wallet application to create them beforehand.

Available commands:

- `yarn node-mocks members:create` – generate memberships using query-node mocks data
- `yarn node-mocks set-budget` - Set membership Working Group budget
- `yarn node-mocks opening:create` - Create an opening
- `yarn node-mocks opening:fill` - Fill existing opening
- `yarn node-mocks transfer` - Transfer tokens between accounts

To show help:

```shell
yarn node-mocks --help
```

You can also connect to the node using [Polkadot apps wallet](#connecting-to-the-joystream-node-using-polkadot-app-wallet) to interact with the node.

## Query-node API

To access the archival state of the chain Pioneer 2 fetch such information from the [query-node](https://github.com/Joystream/joystream/tree/query_node/query-node). It is a GraphQL server that allows a convenient API for querying the data.

The following tools are used to consume GraphQL data:
  - [Apollo Client](https://www.apollographql.com/docs/react/) for accessing GraphQL

### Adding queries

To fetch the data from a GraphQL we use code generated by [GraphQL Code Generator](https://www.graphql-code-generator.com/)

To generate scripts run:

```shell
yarn run queries:generate
```

The queries are organized as below:
- The query-node schema is stored under [@/common/api/schema.graphql](packages/ui/src/common/api/schemas/schema.graphql)
- GraphQL queries are stored per every module, inside `@/module/queries/` folder - you only need to modify those.
- The `graphq-codegen` will generate React hooks for Apollo Client ([plugin `typescript-react-apollo`](https://www.graphql-code-generator.com/docs/plugins/typescript-react-apollo)) that will be exposed as `@/module/queries` import.

For instance, to query for `memberships`:

Create a `@/memberships/queries/members.graphql` file:

```graphql
query GetMembers {
  memberships {
    id
    handle
  }
}
```

Then run the `yarn run queries:generate` script.

Use the generated hook in your code:

```ts
import { useGetMembersQuery } from '@/memberships/queries'

const { loading, data } = useGetMembersQuery()
```

### Query-node Mocks

To mock the query-node server we use [Mirage JS](https://miragejs.com/) in tests, storybook data and for local development.

All MirageJS & query-node mocks are stored inside the [`@/mocks`](packages/ui/src/mocks).

#### Adding a mocks for a GraphQL Entity

In order to properly mock an `Entity` you should:

1. Prepare mocked data
  * Write a generator that re-creates [seed raw data](packages/ui/src/mocks/data/raw) as JSON file.
  * See [generators](packages/ui/dev/query-node-mocks/generators) for examples.
2. Write a MirageJS seed function
  * A seed function will create proper MirageJS [database](https://miragejs.com/docs/main-concepts/database/) entries from raw data.
  * It should add only the data used by queries. Other information can be omitted.
  * A seed function may create related objects and/or add additional mock information.
  * *Optionally*: Some relations doesn't translate well in MirageJS GraphQL implementation. See [`fixAssiociations()`](https://github.com/Joystream/pioneer/blob/e9e609dadc3c65ed2410c301904836f2868df9dc/packages/ui/src/mocks/server.ts#L27) for details.
3. Run the `yarn query-node-mocks` to recreate mocks
4. Add GraphQL query resolvers
  * Resolvers are used to handle the passed GraphQL query and return the data in a _similar_ fashion to Hydra's GraphQL server.
  * In most cases you'd only need to add a general query resolver for each type of queries:
    * `getWhereResolver('Entity')` - returns a resolver that handles multiple results are returned (many), also used for paginated results, e.g. `forumPosts`, `memberships`
    * `getUniqueResolver('Entity')` – returns a resolver that handles unique results (one), e.g. `forumPostByUniqueInput`, `membershipByUniqueInput`
    * `getConnectionResolver('Entity')` - return a resolver for [relay-style pagination](https://relay.dev/graphql/connections.htm) results, e.g. `forumPostsConneciton`, `membershipsConnection`

#### Troubleshooting

* "Mirage: The xxx model has multiple possible inverse associations for xxx.xxx association"

  See `fixAssociations()` for similar errors and fix.

* No data fetched from the query

  See if proper query resolver is present.

* No associated data in the mocked response

  This might be a case when seeding, instead of passing a MireageJS object a simple object was passed.

  ```ts
  // Wrong:
  server.schema.create('Parent', {
    name: 'foo',
    child: {
      name: 'baz'
    }
  })
  // Correct:
  server.schema.create('Parent', {
    name: 'foo',
    child: server.schema.create('Child', {
      name: 'baz'
    })
  })
  // Also OK if Child's 'id' is known:
  server.schema.create('Parent', {
    name: 'foo',
    childId: '7'
  })
  ```

### Code generation

Some GraphQL related tools use code generation to scaffold types and react hooks from GraphQL schemas and queries.

After updating `packages/ui/src/api` any of `*.graphql` files run `yarn queries:generated` script in the UI package.

## Dependencies

The package.json entries for `@polkadot/*` packages must be set to the exact versions in order to match Joystream dependencies. See `resolutions` section in [package.json](/package.json) for details.

# Tips & Tricks

## Connecting to the Joystream node using Polkadot app wallet

You can use the Polkadot apps wallet to browse the Joystream node state and call all available extrinsics.

In order to use the app with Joystream API types you need to upload the correct type `defs.json` from the Joystream repo (using proper branch as well). The full path to file is: `/types/augment/all/defs.json`.

For the `olympia_dev` branch the `defs.json` use this [link](https://github.com/Joystream/joystream/blob/olympia_dev/types/augment/all/defs.json):

1. Copy the contents of the [`raw view`](https://raw.githubusercontent.com/Joystream/joystream/olympia_dev/types/augment/all/defs.json).
2. Paste to the input on Settings > Developer tab
3. Switch to a network
   1. [local](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944)
   2. [olympia testnet](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Folympia-dev.joystream.app%2Frpc)
