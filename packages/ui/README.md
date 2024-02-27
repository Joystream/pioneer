# Pioneer front-end App

> [!NOTE]
> For a more general Pioneer documentation see [Dev Readme](/docs/README.md).

## Table of content

- [Quick Start](#quick-start)
- [Tech stack](#tech-stack)
   - [Libraries](#libraries)
   - [Build tools](#build-tools)
- [Directory structure](#directory-structure)
- [Concepts](#concepts)
  - [Modals](#modals)
      - [Modals with steps](#modals-with-steps)
      - [Transactions](#transactions)
   - [Query Node](#query-node)
       - [Adding queries](#adding-queries)
       - [Code generation](#code-generation)
   - [ProxyApi](#proxyapi)
- [Tips & Tricks](#tips--tricks)
   - [Using well-known accounts with Polkadot-js extension](#using-well-known-accounts-with-polkadot-js-extension)
   - [Using custom Joystream networks](#using-custom-joystream-networks)
      - [Auto-configure at runtime](#auto-configure-at-runtime)
      - [Custom network settings](#custom-network-settings)
      - [Configure at build time](#configure-at-build-time)

## Quick Start

After clonning the project, to run a developpment instance of Pioneer simply run:

```shell
yarn start
```

## Tech stack

Pioneer is built using [React 17](https://reactjs.org/). The React development assumes:

- [TypeScript](https://www.typescriptlang.org/) 5.x – using `strict:true`
- Function components & [hooks](https://reactjs.org/docs/hooks-intro.html)
- [styled components](https://styled-components.com/docs) for CSS

### Libraries

- [Apollo client](https://www.apollographql.com/docs/react/) - to interact with GraphQL
- [@polkadot/api](https://polkadot.js.org/docs/api) - to interact with the RPC node
- [RxJS](https://rxjs.dev/) to subscribe to the Polkadot API
- [CKEditor 5](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/overview.html) as Markdown editor
- [xstate](https://xstate.js.org/) state management for complex flows in modals
- [Yup](https://github.com/jquense/yup#api) validation (partially)
- [date-fns](https://date-fns.org/docs/Getting-Started) to interact with dates
- [Lodash](https://lodash.com/) helper functions
- React libraries for: routing, pagination, breadcrumbs, dropzone, etc (see package.json)

### Build tools

The build scripts uses Webpack directly (no CRA) as it integrates better with custom Webpack extensions (build CKEditor, etc.).

As the Storybook uses Babel a [shared Webpack configuration](/packages/ui/dev/webpack.shared.js) for both webpack and storybook was introduced.

To build the project in a development mode using Webpack dev server:

```shell
yarn start
```

To build a production ready version:

```shell
yarn build
```


## Directory structure

The application is divided to 4 types of building blocks (located in the `src` directory):

* `common` - commonly used components & utilities not tied to specific domain
* A domain/use-case specific:
  * `accounts` – domain of Polkadot's accounts handling, transferring tokens, balances, etc
  * `api` – domain containing Joystream's API specific code: hooks, providers, utilities, etc
  * `council` – [council governance](https://joystream.gitbook.io/joystream-handbook/governance/council)
  * `forum` - [forum subsystem](https://joystream.gitbook.io/joystream-handbook/subsystems/forum)
  * `memberships` – [memberships management](https://joystream.gitbook.io/joystream-handbook/subsystems/membership)
  * `working-groups`
    – [working group governance](https://joystream.gitbook.io/joystream-handbook/governance/working-groups)
  * `proposals` – [proposal system](https://joystream.gitbook.io/joystream-handbook/governance/proposals)
  * `bounty`, `financials`, `overview`: are domains which are not available yet but coming soon.
  * `services` – Contains internationalization utilities.
* `app` – Anything related to the application
  * assets
  * routing
  * pages
  * global providers
* `ProxyApi` – [A service calling the Joystream API from a web worker instead of on the main thread])(#ProxyApi)
* `mocks` – Utilities and data used for both the deprecated Query-node mocks and the new Storybook mocks.

Some rules/hints:

- More general packages should not import anything from more specific packages. So code inside `common` cannot import
  from `accounts` or `app`.
- Domain specific code can import from other domains and `common` as you can display account select component when
  creating membership.
- The app folder describes how the application is wired-up.

The common and domain specific code is split by functionality:

* `components` - Contains React components
* `hooks` - Contains react hooks
* `modals` - Contains specific modals
* `model` - Contains business logic like validation, helpers, etc.
* `queries` - Contains domain specific queries
* `types` - TypeScript types
* `providers` - React context providers

## Concepts

Most of the Pioneer uses common React app coding patterns. Some however, requires additional explanation.

### Modals

The modals can be created as:

- locally included component
- or by requesting to show a global modal using `useModal()` hook:

The global modals should be included in `<GlobalModals />` component. After that can be instantiated from anywhere in
the app.

#### Modals with steps

Some modal's flows require a complex state handling. For those the Pioneer 2 app uses transitions defined using xstate
library.

To add a stepper add the proper `meta` key to the state definition:

```ts
const state = {
  id: 'state',
  meta: { isStep: true, stepTitle: 'First Step' }
}
```

If the states are nested, they will be rendered by `@/common/model/machines/getSteps()` helper as a nested steps.

Example machine that uses nested steps:

```ts
export const myMachine = createMachine<Context, Event, State>({
  initial: 'setup',
  states: {
    setup: {
      id: 'setup',
      meta: { isStep: true, stepTitle: 'Setup' },
      on: { NEXT: 'general' },
    },
    general: {
      id: 'general',
      initial: 'stakingAccount',
      meta: { isStep: true, stepTitle: 'General parameters' },
      states: {
        title: {
          meta: { isStep: true, stepTitle: 'Title' },
          on: {
            BACK: '#setup',
            NEXT: 'description'
          },
        },
        description: {
          meta: { isStep: true, stepTitle: 'Description' },
          on: {
            BACK: 'title',
            NEXT: 'end',
          },
        },
        end: {
          type: 'final',
        },
      },
      onDone: 'transaction',
    },
    tranasction: {}
  }
})
```

#### Transactions

For any transaction we use a dedicated [machine](/packages/ui/src/common/model/machines/transaction.ts)

![img.png](docs/assets/transaction-machine.png)

The transaction machine should be used as invoked actor:

```ts
// machine.ts
const machine = createMachine({
  states: {
    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        // Automatic transition to the next state
        onDone: [
          {
            target: 'success',
            // Save events to process responses & errors
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            // Transition guard
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
    canceled: { type: 'final' },
  }
})
```

The transaction machine can be used either as a standalone machine or as a child of a bigger flow.

### Query Node

To access the archival state of the chain Pioneer fetch such information from the [Query node](https://github.com/Joystream/joystream/tree/master/query-node). Read [Pioneer architecture section](/docs/README.md#pioneer-architecture-section) for more details. It is a GraphQL server that allows a convenient API for querying the data.

The following tools are used to consume GraphQL data:
- [Apollo Client](https://www.apollographql.com/docs/react/) for accessing GraphQL

#### Adding queries

To fetch the data from a GraphQL we use code generated by [GraphQL Code Generator](https://www.graphql-code-generator.com/)

To generate scripts run:

```shell
yarn run queries:generate
```

The queries are organized as below:
- The query-node schema is stored under [@/common/api/schema.graphql](/packages/ui/src/common/api/schemas/schema.graphql)
- GraphQL's queries are stored per every module, inside `@/module/queries/` folder - you only need to modify those.
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

#### Code generation

Some GraphQL related tools use code generation to scaffold types and react hooks from GraphQL schemas and queries.

After updating any of the `*.graphql` files run the `yarn queries:generated` script.

### ProxyApi

To interact with the Joystream node a [polkadot{.js} API instance as to be created](https://polkadot.js.org/docs/api/start/create). Because part of the instance creation is resource intensive it results in the App freezing on lower spec machines. In order to solve this issue Pioneer creates the API instance in a web worker and all interaction with the API are done via the web worker.

This is done seamlessly by using on the main thread a `ProxyApi` which has the same type signature than the `ApiRx` instance. The `ProxyApi` forwards the calls to the `ApiRx` created on the web worker and forward the returned data too.

This feature can be disabled by running Pioneer with `DISABLE_PROXY_API=true`.

## Tips & Tricks

### Using well-known accounts with Polkadot-js extension

When a chain is run with in development Substrate creates well-known accounts for `Alice`, `Alice_Stash`, `Bob`, `Bob_Stash`, `Charlie`, `Dave`, `Eve` and `Ferdie`. Some of these accounts will are already assigned some token.

To add these to your wallet:

1. Open extension and click plus sign
2. Select "Import account from pre-existing seed"
3. Copy this seed `bottom drive obey lake curtain smoke basket hold race lonely fit walk` as "existing mnemonic seed"
4. Open advanced and type the derivation path:
  * For `Alice`, `Bob`, `Charlie`, `Dave`, `Eve` & `Ferdie` use the name as path, e.g. `//Eve`
  * For `Alice_Stash` and `Bob_Stash` use `//stash` after name, e.g.: `//Bob//stash`

### Using custom Joystream networks

#### Auto-configure at runtime

Some networks expose JSON configuration describing their different endpoints. These configurations can be used to connect Pioneer to a network with an easy to share URL.

For example if Pioneer is running on `localhost:8080` it can connect to the "Atlas dev" playground by going to http://localhost:8080/#/settings?network-config=https://atlas-dev.joystream.org/network/config.json.

A URL such as `https://playground.test/config.json` can respond with a JSON:

```
{
  "websocket_rpc": "wss://rpc-endpoint.com:9944",
  "graphql_server": "https://joystream.app/server/graphql",
  "graphql_server_websocket": "wss://joystream.app/server/graphql",
  "member_faucet": "https://joystream.app/member-faucet/register"
}
```

By visiting pioneer with a query `network-config` as below:
```
https://pioneer.joystream.app/#/settings?network-config=https://playground.test/config.json
```

This will save the endpoints locally under the "Auto-conf" network.

#### Custom network settings

In case there is the network you wish to connect to has no JSON configuration (or the configuration is incomplete), custom endpoints can be set on the app too. In `Settings -> Select Network` pick "Custom" there the network endpoints can be defined freely.

#### Configure at build time

To use custom addresses add the `.env` file in `packages/ui` (example: `packages/ui/.env.example`) and set

1. `REACT_APP_MAINNET_NODE_SOCKET` example `wss://rpc.joystream.org:9944`
2. `REACT_APP_MAINNET_QUERY_NODE` example `https://query.joystream.org/graphql`
3. `REACT_APP_MAINNET_QUERY_NODE_SOCKET` example `wss://query.joystream.org/graphql`
4. `REACT_APP_MAINNET_MEMBERSHIP_FAUCET_URL` example `https://faucet.joystream.org/member-faucet/register`
5. `REACT_APP_MAINNET_BACKEND` example `https://api-7zai.onrender.com`

Please remember to restart the Webpack process after each change.

All the variables are required to be configured for the network to be used.

