# Testing

The testing strategy now relies entirely on [Storybook](https://pioneer-2-storybook-joystream.vercel.app). First all pages should be accessible through in Storybook so they can be easily viewed and interacted with. Secondly [interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing) are added to these pages stories in order to continuously test the pages business logic via the CI.

In addition some [non storybook test suites](#integration-tests) now deprecated but not replaced yet. They are still part of the codebase and Ran by the CI.

## Storybook

The project's [storybook](https://storybook.js.org/) is build by the CI and available at [https://pioneer-2-storybook-joystream.vercel.app](https://pioneer-2-storybook-joystream.vercel.app).

To run the local instance (project root or `packages/ui` directory):

```bash
yarn storybook
```

Stories are written on files write next to the component they are rendering. E.g for `packages/ui/src/app/pages/Proposals/ProposalPreview.tsx` the stories are in `packages/ui/src/app/pages/Proposals/ProposalPreview.stories.tsx`.

The Pioneer Storybook has 3 type of stories:
- Component which don't require any mocks. These are used to document Pioneer reusable building blocks.
- The pages and App stories which do not have a `play` method. These have 2 main utilities:
   1. They make it easy to develop, visualize, and interact with any configuration of a page by relying on the mocks.
   2. They serve as smoke tests for the CI. Meaning that if a page breaks in due to change it should be reported by the CI.
- The pages and App which have `play` functions. These are tests they rely on slightly modified versions of Jest and the Testing Library.

> [!NOTE]
> Some stories currently do not fit in any of these 3 categories. They are single components but which rely on Query node mocks to run. These stories should be progressively removed.

One of the main advantage of having tests done in the stories is that the same mocks are used to both write the stories (and often to also create the page itself) and to write the tests. It also makes it easier to debug the tests by providing a visual feed back of everything it does.

> [!IMPORTANT]
> Read how to mock data in the pages stories and tests [here](mocks.md#storybook-mocks)

## Integration tests

> [!WARNING]
> These tests are now deprecated they should be progressively be replaced by [Storybook interaction tests](#storybook).

Pioneer use [jest](https://jestjs.io/) to run automated tests and [testing-library](https://testing-library.com/) as testing utilities. The [query-node mocks](mocks.md#query-node-mocks) uses the same setup as the front-end mocks.

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
- The application preview on Vercel
- The storybook preview on Vercel

> [!NOTE]
> Only the PRs that pass CI check can be merged to the `dev` branch.
