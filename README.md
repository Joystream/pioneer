# Pioneer

Governance app for Joystream DAO

## Preview build

The preview build, deployed from the main branch, is available on [https://joystream.github.io/pioneer/](https://joystream.github.io/pioneer/).
Components preview and testing from main branch, is available on [https://pioneer-2-storybook.netlify.app/](https://pioneer-2-storybook.netlify.app/).

You can connect to a local development node (should be reachable on `127.0.0.1:9444`).

## Development

Tools/libraries:

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

## Packages

- [packages/ui](packages/ui) The Pioneer 2.0 package
- [packages/type](packages/types) Copied [@joystream/types](https://github.com/Joystream/joystream/tree/master/types) at a compatible Olympia branch.
