# Mocking

There are two types of mocks used by the Pioneer

1. GraphQL (query-node) mocks
2. Local node mocks

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
### Polkadot apps

You can also connect to the node using [Polkadot apps wallet](README#connecting-to-the-joystream-node-using-polkadot-app-wallet) to interact with the node.

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

  See if proper query resolver is present in the [`@/mocks/server.ts`](packages/ui/src/mocks/server.ts) file.

* No associated data in the mocked response

  This might be a case when seeding, instead of passing a MirageJS object a simple object was passed.

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
