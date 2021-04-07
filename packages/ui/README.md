# Directory structure

The application is divided to 3 types of building blocks:

* `common` - commonly used components & utilities not tied to specific domain
* A domain/use-case specific:
    * `accounts`
    * `memberships`
    * `workingGroup`
    * ...
* `app` Application specific: routing, pages, etc.

Packages should not import anything from more specific. So code inside `common` cannot import from `accounts` or `app`.

Domain specific code can import from other domains and `common` as you can display account select component when creating membership.

The app folder describes how the application is wired-up.

The common and domain specific code is split by functionality:

* `hooks` - Contains react hooks
* `components` - Contains React components
* `modals` - Contains specific modals
* `model` - Contains business logic like validation, helpers, etc.
* `queries` - Contains domain specific queries
