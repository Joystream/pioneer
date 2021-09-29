# Pioneer 2 architecture & concepts

## Directory structure

The application is divided to 3 types of building blocks:

* `common` - commonly used components & utilities not tied to specific domain
* A domain/use-case specific:
    * `accounts` – domain of Polkadot's accounts handling, transfering tokens, balances, etc
    * `council` – [council governance](https://joystream.gitbook.io/joystream-handbook/governance/council)
    * `forum` - [forum subsystem](https://joystream.gitbook.io/joystream-handbook/subsystems/forum)
    * `memberships` - [memberships management](https://joystream.gitbook.io/joystream-handbook/subsystems/membership)
    * `working-groups` – [working group governance](https://joystream.gitbook.io/joystream-handbook/governance/working-groups)
    * `proposals` – [proposal system](https://joystream.gitbook.io/joystream-handbook/governance/proposals)
* `app` – Anything related to the application
  * assets
  * routing
  * pages
  * global providers
* `mocks` Application specific: routing, pages, etc.

Some rules/hints:

- Packages should not import anything from more specific. So code inside `common` cannot import from `accounts` or `app`.
- Domain specific code can import from other domains and `common` as you can display account select component when creating membership.
- The app folder describes how the application is wired-up.

The common and domain specific code is split by functionality:

* `components` - Contains React components
* `hooks` - Contains react hooks
* `modals` - Contains specific modals
* `model` - Contains business logic like validation, helpers, etc.
* `queries` - Contains domain specific queries
* `types` - TypeScript types
* `providers` - React context providers

