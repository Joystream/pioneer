# Pioneer dev documentation

## Tools/libraries:

- React
  - styled components
- TypeScript
- ESLint, Prettier
- GraphQL to access Hydra query-node
  - [Mirage JS](https://miragejs.com/) for mocking query-node data
  - [Apollo Client](https://www.apollographql.com/docs/react/) for accessing GraphQL
- Storybook

### Code generation

Some GraphQL related tools use code generation to scaffold types and react hooks from GraphQL schemas and queries.

After updating `packages/ui/src/api` any of `*.graphql` files run `yarn queries:generated` script in the UI package.

## Dependencies

The package.json entries for `@polkadot/*` packages must be set to the exact versions in order to match Joystream dependencies. See `resolutions` in [package.json](/package.json) for details.
