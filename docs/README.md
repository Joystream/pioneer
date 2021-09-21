# Developer documentation

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

- GraphQL to access Hydra query-node
  - [Mirage JS](https://miragejs.com/) for mocking query-node data
  - [Apollo Client](https://www.apollographql.com/docs/react/) for accessing GraphQL
- Storybook

### Code generation

Some GraphQL related tools use code generation to scaffold types and react hooks from GraphQL schemas and queries.

After updating `packages/ui/src/api` any of `*.graphql` files run `yarn queries:generated` script in the UI package.

## Dependencies

The package.json entries for `@polkadot/*` packages must be set to the exact versions in order to match Joystream dependencies. See `resolutions` section in [package.json](/package.json) for details.
