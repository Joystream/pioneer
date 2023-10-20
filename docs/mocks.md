# Mocking

There are two types of mocks used by the Pioneer

1. GraphQL (query-node) mocks
2. Local node mocks

### Node mocks

To test most of the extrinsics requires existing on-chain data. To create some on-chain objects use the `yarn run node-mocks` script or use the polkadot apps wallet application to create them beforehand.

Available commands:

- `yarn workspace @joystream/pioneer node-mocks council:elect [-d BLOCK_TIME¹] [--to ELECTION_STAGE]` - Run an election until the specified stage: VOTE, REVEAL, or IDLE (default)
- `yarn workspace @joystream/pioneer node-mocks council:announce` - Announce enough candidacies to start the voting stage when the announcing stage ends
- `yarn workspace @joystream/pioneer node-mocks council:vote` - Vote for the announced by the previous command candidate to start the revealing stage next
- `yarn workspace @joystream/pioneer node-mocks council:reveal` - Reveal the votes casted by the previous command to start elect a new council and start the idle stage next
- `yarn workspace @joystream/pioneer node-mocks members:create` - generate memberships using query-node mocks data
- `yarn workspace @joystream/pioneer node-mocks set-budget` - Set membership Working Group budget
- `yarn workspace @joystream/pioneer node-mocks opening:create [-d BLOCK_TIME¹]` - Create an opening
- `yarn workspace @joystream/pioneer node-mocks opening:fill` - Fill existing opening
- `yarn workspace @joystream/pioneer node-mocks upcoming-opening:create` - Create an upcoming opening
- `yarn workspace @joystream/pioneer node-mocks forumCategory:create` - Create a forum category
- `yarn workspace @joystream/pioneer node-mocks transfer` - Transfer tokens between accounts

**(¹)** `BLOCK_TIME` is the time between each block. It is 6000ms by default but on testing chain it is 1000ms. Therefore when running some of the scripts on these testing chain `-d 1000` should be added for the command to succeed.

To show help:

```shell
yarn node-mocks --help
```

#### Chain spec

Another way to influence the on-chain state for testing purpose, is to provide a customize `chain-spec.json` file when running a Joystream node:

1. Create `packages/ui/dev/chain-spec/data/chain-spec.json` if it does not exist:
   - Either with docker compose: `docker-compose run --rm build` (the first time the `chain-spec.json` file is generated this way, the file ownership might have to be fixed).
   - Or directly with the runtime binary:
      ```shell
      <path to the runtime> build-spec --dev > packages/ui/dev/chain-spec/data/chain-spec.json
      ```

2. _(optional)_ Change the starting Council/Referendum stage (the default is `Announcing`):
   - Run `yarn workspace @joystream/pioneer helpers setChainSpec -s <stage> [-d <duration>]`
      - The `stage` parameter (required) can be either `idle`, `announcing`, `voting`, or `revealing` (these should be lowercase)
      - The `duration` parameter (optional) set the number of blocks this stage will last.

3. Start the node:
   - Either with docker compose: `docker-compose up node`
   - Or directly with the runtime binary:
      ```shell
      <path to the runtime> --tmp --alice --validator --unsafe-ws-external --unsafe-rpc-external --rpc-cors=all --chain packages/ui/dev/chain-spec/data/chain-spec.json --log runtime
      ```
### Other helper commands

#### Decoding data from the chain:

```shell
> yarn workspace @joystream/pioneer run helpers decode -t [TYPE] -v [VALUE]
```

This command requires two arguments:
- `-t`, `--type`: The expected type of the value to decode. It can be `text`, or the name or alias of a [metadata class](https://github.com/Joystream/joystream/blob/master/metadata-protobuf/doc/index.md).
- `-v`, `--value`: The hash or the string representation of the `Uint8Array` to decode.

With `-t text` this command will simply decode encoded plaint text values. E.g:
```shell
> yarn workspace @joystream/pioneer run helpers decode -t text -v 0x4c6f72656d20697370756d
Lorem ispum
```

Otherwhise the type options should refer to a [metadata class](https://github.com/Joystream/joystream/blob/master/metadata-protobuf/doc/index.md). It can be the name of the class:
```shell
> yarn workspace @joystream/pioneer run helpers decode -t CouncilCandidacyNoteMetadata -v 0x0a0a616...
CouncilCandidacyNoteMetadata {
  ...
}
```

Or it can be an alias:
```shell
> yarn workspace @joystream/pioneer run helpers decode -t candidacy -v 0x0a0a616...
CouncilCandidacyNoteMetadata {
  ...
}
```
The available aliases are: `post`, `opening`, `thread`, `bounty`, `candidacy`, `candidate`, `application`, `member`, and `membership`.

#### Others
- `yarn workspace @joystream/pioneer run helpers commitment -s <salt> [-a <accountId>] [-o <optionId>] [-c <cycleId>]` - Calculate a commitment
- `yarn workspace @joystream/pioneer run helpers nextCouncilStage` - Wait until the next council stage start

### Polkadot apps

You can also connect to the node using [Polkadot apps wallet](README.md#connecting-to-the-joystream-node-using-polkadot-app-wallet) to interact with the node.

### Query-node Mocks

To mock the query-node server we use [Mirage JS](https://miragejs.com/) in tests, storybook data and for local development.

All MirageJS & query-node mocks are stored inside the [`@/mocks`](/packages/ui/src/mocks).

#### Adding a mocks for a GraphQL Entity

In order to properly mock an `Entity` you should:

1. Prepare mocked data
* Write a generator that re-creates [seed raw data](/packages/ui/src/mocks/data/raw) as JSON file.
* See [generators](/packages/ui/dev/query-node-mocks/generators) for examples.
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

  See if proper query resolver is present in the [`@/mocks/server.ts`](/packages/ui/src/mocks/server.ts) file.

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

#### Speeding up MirageJS seeding

Seeding MirageJS can be slow, so when writing tests or stories, it's important to only add the truly essential data to MirageJS. For instance seeding all mocked members data with ~~`seedMembers(server)`~~ in a test suit or a story should be avoided.

One way to seed fewer data is to manually pass them to the _singular_ `seedEntity()` functions. For example with `ElectedCouncil`:

```ts
seedElectedCouncil({ id: '0', electedAtBlock: 1, endedAtBlock: 2 }, server)
seedElectedCouncil({ id: '1', electedAtBlock: 3, endedAtBlock: 4 }, server)
```

A drawback of this method is that: the code needs to be updated whenever the entity fields change. Like if `electedAtBlock` is rename to `electedAt`, or if a new field is added to `ElectedCouncil`. So it's important to keep most of this data in one place, like in [packages/ui/test/_mocks/server/seeds/index.ts](/packages/ui/test/_mocks/server/seeds/index.ts).

To avoid this issue, some _plural_ `seedEntities()` truncate the [raw data](/packages/ui/src/mocks/data/raw). For example:
```ts
seedMembers(server, 2)
```
Here only the first two members from the mocked [@/mocks/data/raw/members.json](/packages/ui/src/mocks/data/raw/members.json) file were added to the MirageJS database.

Finally in order to both reuse and customize mocked data. Some _plural_ `seedEntities()` can be implemented as follow:
```ts
seedCouncilCandidates(server, [{ memberId: '0' }, { memberId: '1' }])
```
Here the first two candidates from [`@/mocks/data/raw/candidates.json`](/packages/ui/src/mocks/data/raw/candidates.json) were added to the MirageJS database, but their `memberId`s where changed to match the two members previously seeded.
