![Pioneer](https://user-images.githubusercontent.com/247363/116713796-699da780-a9d5-11eb-82b1-a42bccd642d7.png)


# Pioneer

[![Netlify Status](https://api.netlify.com/api/v1/badges/d870546e-6452-42d6-81d2-7a625637d6a4/deploy-status)](https://app.netlify.com/sites/pioneer-2/deploys)
[![CI](https://github.com/Joystream/pioneer/actions/workflows/CI.yml/badge.svg)](https://github.com/Joystream/pioneer/actions/workflows/CI.yml)

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

## Packages & Dependencies

- [packages/ui](packages/ui) The Pioneer 2.0 package
- [packages/type](packages/types) Copied [@joystream/types](https://github.com/Joystream/joystream/tree/olympia/types) at a compatible Olympia branch.
- [packages/metadata-protobuf](packages/metadata-protobuf) Copied [@joystream/metadata-protobuf](https://github.com/Joystream/joystream/tree/olympia/metadata-protobuf) at a compatible Olympia branch.

The package.json entries for `@polkadot/*` packages must be set to the exact versions in order to match Joystream dependencies. See `resolutions` in [package.json](./package.json) for details.
