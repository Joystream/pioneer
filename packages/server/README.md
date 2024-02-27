# Pioneer backend

> [!NOTE]
> For a more general Pioneer documentation see [Dev Readme](/docs/README.md).

## Overview

A backend for the [Pioneer UI](../ui).

Currently it only handles email notifications by checking for each registered member whether they should be notified of something, and email them if necessary. Additional functionalities will be added later on.

It is composed of 3 parts:

- A script which aggregate notifications for each registered member based on events available in the [query node](https://query.joystream.org/graphql). Then email the notifications to the associated members.
- A GraphQL API server to register members in the database, customize the default notification behavior, check members notifications...
- A PostgreSQL database which maps existing Joystream memberships by id to a name, an email, subscription preferences, and notifications. It also keeps tracks of the latest query node event processed by the notify script.

## Table of content

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Production CLI usage](#production-cli-usage)
- [API usage](#api-usage)
  - [Authentication](#authentication)
  - [General subscriptions](#general-subscriptions)
  - [Entity subscriptions](#entity-subscriptions)
  - [Notifications](#notifications)
- [Development](#development)
  - [Run locally](#run-locally)
  - [Some other useful scripts](#some-other-useful-scripts)
  - [Adding support for more QN events](#adding-support-for-more-qn-events)
- [Roadmap](#roadmap)

## Quick Start

### Run with docker

```shell
yarn workspace server docker:up
```

This runs the api on: http://localhost:3000

Configurations are available in `packages/server/.env`.

To run the notification script:
```shell
yarn workspace server docker:notify
```

### Demo deployment

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Joystream/pioneer/tree/backend-dev-blueprint)

> [!IMPORTANT]
> This deployments will require to go through the [render.com](https://render.com/) registration, which includes providing a payment method due to the [cron job cost](https://render.com/pricing#cronjobs).
>
> The [render.com database free tier](https://render.com/docs/free#free-postgresql-databases) ends after 90 days.
>
> In order to receive notification emails a [SendGrid](https://sendgrid.com/) API key is required. Otherwise the notifications will only be available in the API.

Mapping existing Joystream memberships id to a name and an email address in the `INITIAL_MEMBERSHIPS` variable, is enough to start getting notified regarding these memberships.

```json
[
  { "id": 1, "name": "Alice", "email": "alice@example.com" },
  { "id": 2, "name": "Bob", "email": "bob@example.com" }
]
```

In order to customize the default notification behavior with the GraphQL API, an authorization token can be found for each membership in the "Logs" section.

### Production

To deploy a production instance check the [admin documentation](docs/admin.md#deploying-the-pioneer-notification-back-end)

## Production CLI usage

> [!NOTE]
> The following commands are ran from the `server` directory. To run them from the monorepos root: `yarn` should be replaced by `yarn workspace server`.

- `yarn start:api`: starts the API server.
- `yarn notify`: run the notify job.
- `yarn start:all`: for environments where cron is not available, starts both the API server, and schedule the notify job every 10 minutes via [`node-cron`](https://www.npmjs.com/package/node-cron).

## API usage

### Authentication

Most queries require a Bearer authentication, HTTP header examples:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MiwidHlwZSI6MCwiZXhwIjoxNjg2MjM5MTA2Mzc4LCJpYXQiOjE2Nzg0NjMxMDZ9.C8aTeJzadlY-FGQTKD3K-UpVbN7dRbo4mh_CxdqrZiQ"
}
```

![Setting the authorization header in the playground](https://user-images.githubusercontent.com/6571453/228556900-9cfab773-c79f-4146-a6f4-51b461385246.png)

This token is returns by both the `signup` and `signin` mutations:

```gql
signup(memberId: String! signature: String! timestamp: BigInt! name: String! email: String): String
signin(memberId: String! signature: String! timestamp: BigInt!): String
```

The `signature` parameter consist of a `MEMBERSHIP_ID:TIMESTAMP` signed with the membership controller account.

To check the validity of an authorization token:

```gql
query {
  me {
    id
    name
    email
  }
}
```

When ran with a correct `Authorization` header, it returns the authorized member data. Otherwise it returns unauthorized error. The email field will be `null' if the member email address has not yet been verified.

To check that a member is registered in the API:

```gql
query {
  memberExist(id: Int!)
}
```

This returns `true` if the member is registered and `false` otherwise. This query does not require an authorization token.

### General subscriptions

Many actions on the Joystream chain are subscribed to by defaults e.g: notify me when I was mentioned in a post or notify me when a new election starts. These can be unsubscribed from. Other actions can be subscribed to, e.g: notify me when any new post is created.

To list these general subscriptions - for the authenticated member - run:

```gql
query {
  generalSubscriptions {
    kind
    shouldNotify
    shouldNotifyByEmail
  }
}
```

This query returns for each notification kind whether or not the authenticated member is subscribed to it.

To subscribe or unsubscribe to some notification kind run:

```gql
mutation {
  generalSubscriptions(
    data: [{ kind: FORUM_THREAD_CREATOR, shouldNotify: false, shouldNotifyByEmail: false }, { kind: FORUM_THREAD_ALL }]
  ) {
    kind
  }
}
```

This mutation unsubscribed from notifications due to post in threads created by the authenticated member, and subscribe to receive notification every time a new thread is created.

### Entity subscriptions

Specific entities like forum threads, categories, or proposals can be subscribed to or "muted". This behavior is controlled with entity subscriptions.

```gql
mutation {
  subscribeToEntity(kind: FORUM_CATEGORY_ENTITY_POST, entityId: "3", status: WATCH) {
    id
  }
}
```

This mutation subscribes the authenticated member to get notified of any new post in the forum category 3.

```gql
mutation {
  subscribeToEntity(kind: FORUM_THREAD_ENTITY_POST, entityId: "123", status: MUTE) {
    id
  }
}
```

This mutes all notification from the thread 123 (even when the authenticated member is mentioned).

To cancel entity subscriptions:

```gql
mutation {
  entitySubscription(kind: FORUM_THREAD_ENTITY_POST, entityId: "123", status: DEFAULT) {
    id
  }
}
```

To list entity subscriptions:

```gql
query {
  entitySubscriptions {
    kind
    entityId
    status
  }
}
```

### Notifications

To list the authenticated member notifications:

```gql
query {
  notifications {
    kind
    entityId
    status
  }
}
```

## Development

### Run locally

> [!NOTE]
> The following commands are ran from the monorepos root.

To run the API to develop locally:

1. `yarn --immutable`: Install the dependencies.
2. Create and configure a `packages/server/.env`.
3. Prepare the database and generate the code by running either:
    - `yarn workspace server dev:db:build`: To use docker for the db.
    - Otherwise `yarn workspace dev:build`: Once the configured db is running.
4. `yarn workspace server dev:api`: Start the server.
5. `yarn workspace server dev:notify`: Run the notifier with `nodemon`.

### Some other useful scripts

- `yarn workspace server test`: Run tests.
- `yarn workspace server dev:notify`: Run the notifier `nodemon` and `ts-node`.
- `yarn workspace server dev:db:reset`: Clear the database data and re-synchronize its schema.
- `yarn workspace server dev:emails`: Run live development preview for emails.
- `yarn workspace server dev:mockEmail email [notificationKind]`: Send mock email.
- `yarn workspace server codegen`: Run `graphql-codegen`.
- [`yarn workspace server prisma studio`][prisma studio]: Launch an administration GUI for the database.
- [`yarn workspace server prisma db push`][prisma db:push]: Synchronize `schema.prisma` with the database schema.
- [`yarn workspace server prisma migrate dev`][prisma migrate]: Create a database migration based on the changes to `schema.prisma`.
- [`yarn workspace server prisma generate`][prisma generate]: Generate the Prisma clients.
- `yarn workspace server dev:authtoken`: Generate an authentication token for the provided member.
- `yarn workspace server lint:fix`: Fix some code formatting issue.
- `yarn workspace server docker:yarn`: To regenerate the `yarn.lock` used to build the docker image.
- `yarn workspace server docker build pioneer-api`: To build the `joystream/pioneer-backend` image.

### Adding support for more QN events

As an example see [this commit](https://github.com/Joystream/pioneer/pull/4210/commits/d9d537aaa485f8710879a6610133c14ece612412) which adds support for notifications based on the `ThreadCreatedEvent`

#### Front-end settings to QN events relation

##### General

- [ ] Subscribe to all notifications (implementation TBD)

##### Council

- [ ] All council notifications (default):

  | Notification kind           | QN event                     |
  | --------------------------- | ---------------------------- |
  | ELECTION_ANNOUNCING_STARTED | AnnouncingPeriodStartedEvent |
  | ELECTION_VOTING_STARTED     | VotingPeriodStartedEvent     |
  | ELECTION_REVEALING_STARTED  | ReferendumStartedEvent       |
  | ELECTION_COUNCIL_ELECTED    | NewCouncilElectedEvent       |

##### Proposals

- [ ] All proposals notifications:

  | Notification kind    | QN event                   |
  | -------------------- | -------------------------- |
  | PROPOSAL_CREATED_ALL | ProposalCreatedEvent       |
  | PROPOSAL_STATUS_ALL  | ProposalStatusUpdatedEvent |
  | PROPOSAL_VOTE_ALL    | ProposalVotedEvent         |

- [ ] Updates in proposals I created (default):

  | Notification kind           | QN event                           |
  | --------------------------- | ---------------------------------- |
  | PROPOSAL_STATUS_CREATOR     | ProposalStatusUpdatedEvent         |
  | PROPOSAL_VOTE_CREATOR       | ProposalVotedEvent                 |
  | PROPOSAL_DISCUSSION_CREATOR | ProposalDiscussionPostCreatedEvent |

- [ ] Proposal discussion thread I posted to (default):

  | Notification kind               | QN event                           |
  | ------------------------------- | ---------------------------------- |
  | PROPOSAL_DISCUSSION_CONTRIBUTOR | ProposalDiscussionPostCreatedEvent |

- [ ] Direct mentions in the posts (default):

  | Notification kind           | QN event                           |
  | --------------------------- | ---------------------------------- |
  | PROPOSAL_DISCUSSION_MENTION | ProposalDiscussionPostCreatedEvent |

##### Working groups

- [ ] All working groups notifications:

  | Notification kind     | QN event                  |
  | --------------------- | ------------------------- |
  | WG_OPENING_ALL        | OpeningAddedEvent         |
  | WG_APPLICATION_ALL    | AppliedOnOpeningEvent     |
  | WG_NEW_WORKER_ALL     | OpeningFilledEvent        |
  | WG_BUDGET_UPDATE_ALL  | BudgetUpdatedEvent        |
  | WG_NEW_BUDGET_ALL     | BudgetSetEvent            |
  | WG_SPENDING_ALL       | BudgetSpendingEvent       |
  | WG_NEW_LEAD_ALL       | LeaderSetEvent            |
  | WG_LEAD_EXIT_ALL      | LeaderUnsetEvent          |
  | WG_WORKER_LEAVING_ALL | WorkerStartedLeavingEvent |
  | WG_WORKER_EXIT_ALL    | WorkerExitedEvent         |

- [ ] Working groups notifications where I have a role (default):

  | Notification kind        | QN event                  |
  | ------------------------ | ------------------------- |
  | WG_OPENING_WORKER        | OpeningAddedEvent         |
  | WG_APPLICATION_WORKER    | AppliedOnOpeningEvent     |
  | WG_NEW_WORKER_WORKER     | OpeningFilledEvent        |
  | WG_BUDGET_UPDATE_WORKER  | BudgetUpdatedEvent        |
  | WG_NEW_BUDGET_WORKER     | BudgetSetEvent            |
  | WG_SPENDING_WORKER       | BudgetSpendingEvent       |
  | WG_NEW_LEAD_WORKER       | LeaderSetEvent            |
  | WG_LEAD_EXIT_WORKER      | LeaderUnsetEvent          |
  | WG_WORKER_LEAVING_WORKER | WorkerStartedLeavingEvent |
  | WG_WORKER_EXIT_WORKER    | WorkerExitedEvent         |

##### Forum

- [x] Direct mentions (default):

  | Notification kind    | QN event           |
  | -------------------- | ------------------ |
  | FORUM_THREAD_MENTION | ThreadCreatedEvent |
  | FORUM_POST_MENTION   | PostAddedEvent     |

##### Forum / Threads

- [x] Every new thread created:

  | Notification kind | QN event           |
  | ----------------- | ------------------ |
  | FORUM_THREAD_ALL  | ThreadCreatedEvent |

- [x] All posts in thread I created (default):

  | Notification kind    | QN event       |
  | -------------------- | -------------- |
  | FORUM_THREAD_CREATOR | PostAddedEvent |

- [x] All posts and replies in thread I posted in (default):

  | Notification kind        | QN event       |
  | ------------------------ | -------------- |
  | FORUM_THREAD_CONTRIBUTOR | PostAddedEvent |

##### Forum / Posts

- [x] Every new post where I am mentioned (alread done in "Direct mentions" ☝️)

- [x] Replies to my posts (default):

  | Notification kind | QN event       |
  | ----------------- | -------------- |
  | FORUM_POST_REPLY  | PostAddedEvent |

## Roadmap

### MVP (Forum direct mentions and council election stages update)

- [x] Forum direct mentions
- [ ] Election stage change events (ref #4086)
- [ ] Write nicer html emails
- [ ] Allow retrying sending email when it fails and replace `isSent` by `emailStatus` enum which accounts for failure
- [ ] Add backend email tests
- [ ] Add backend API tests
- [ ] Add a change email member API mutation

### V1.1 Customising different notifications

- [ ] Proposal status update notifications
- [ ] Proposal votes notifications
- [ ] Proposal discussion events notifications

### V1.2

- [ ] Auto publish (via CI) a backend docker image with only prod dependencies
- [ ] Set `Access-Control-Allow-Origin` in an env variable
- [ ] Make `shouldNotifyByEmail` independent from `shouldNotify` and rename `shouldNotify` to `shouldNotifyInApp`
- [ ] Support multiple email providers

### V1.3

#### Role based

- [ ] Councilor: proposal getting into deciding stage
- [ ] WG Lead: notifications
- [ ] WG worker: notifications (see: Front-end settings to QN events relation: Working groups section)
- [ ] Only notify voters about revealing stage

#### Last day before event x

- [ ] Councillor: 1 day on proposal to vote
- [ ] Add last day to vote on a proposal notification
- [ ] Add last day to announce candidacy notification
- [ ] Add last day to vote on a candidates notification

#### Segment of accounts based on pre-condition

- [ ] Add notifications for multiple accounts for revealing stage (accounts I care about)

[prisma studio]: https://www.prisma.io/studio
[prisma migrate]: https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#development-environments
[prisma db:push]: https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push
[prisma generate]: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client
