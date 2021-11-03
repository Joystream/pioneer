# Testing

The testing strategy:

1. [storybook](#the-storybook) for simple components & manual tests
2. [automated tests](#integration-tests) for business logic

## The storybook

The project's [storybook](https://storybook.js.org/) is build by the CI and available at [https://pioneer-2-storybook.netlify.app/](https://pioneer-2-storybook.netlify.app/).

To run the local instance (project root or `packages/ui` directory):

```bash
yarn run storybook
```

For more complex components, the stories might need a [query-node mocks](mocks.md#query-node-mocks) in order to fetch data.

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

## Integration tests

Pioneer 2 use [jest](https://jestjs.io/) to run automated tests and [testing-library](https://testing-library.com/) as testing utilities. The [query-node mocks](mocks.md#query-node-mocks) uses the same setup as the front-end mocks.

### Polkadot.js API stubs

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

The other stubs help with creating balances, `api.query.*` responses, etc.

### Specific helpers & mocks

- To interact with dropdowns use `selectFromDropdown()` helper
- To interact with Pioneer 2 buttons use `getButton()` test helper which is optimized for [test speed](#slow-tests).
- Don't run the CKEditor inside tests (JSDom is not compatible with contenteditable)
  ```ts
  jest.mock('@/common/components/CKEditor', () => ({
    CKEditor: (props: CKEditorProps) => mockCKEditor(props),
  }))

  describe('Component with CKEditor inside', () => {})
  ```

Additionally, the below node modules are always mocked (see `packages/ui/tests/__mocks__`):

* `@polkadot/extension-dapp` – used by the `useSignAndSendTransaction()` hook

### Slow tests

If you experience a slow test:

- Reduce number of mocked data. The default `seedEntities()` methods loads all the date (with related tables) while most of the tests needs only one or two entities (see [Speeding up MirageJS seeding](mocks.md#speeding-up-miragejs-seeding)).
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
