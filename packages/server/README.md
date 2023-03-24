# Pioneer backend

## Overview

Currently the backend is meant to checks for each registered member whether they should be notified of something, and email them if necessary.
Additional functionalities will be added later on.

It is composed of 3 parts:

- A script which aggregate notifications for each registered member based on events available in the [query node](https://query.joystream.org/graphql). Then email the notifications to the associated members.
- A GraphQL API server to register members in the database, customize the default notification behavior, check members notifications...
- A PostgreSQL database which maps existing Joystream memberships by id to a name, an email, subscription preferences, and notifications. It also keeps tracks of the latest query node event processed by the notify script.

## Quick Start

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Joystream/pioneer/tree/feature/backend-poc)

> **Warning**
>
> In addition to the [render.com](https://render.com/) registration flow, this deployment requires a [SendGrid](https://sendgrid.com/) API key.

> **Warning**
>
> The [render.com database free tier](https://render.com/docs/free#free-postgresql-databases) ends after 90 days.

Mapping existing Joystream memberships id to a name and an email address in the `INITIAL_MEMBERSHIPS` variable, is enough to start getting notified regarding these memberships.

```json
[
  { "id": 1, "name": "Alice", "email": "alice@example.com" },
  { "id": 2, "name": "Bob", "email": "bob@example.com" }
]
```

In order to customize the default notification behavior with the GraphQL API, an authorization token can be found for each membership in the "Logs" section.

## Production CLI usage

> **Note**
>
> The following commands are ran from the `server` directory. To run them from the monorepos root: `yarn` should be replaced by `yarn workspace server`.

- `yarn start:api`: starts the API server.
- `yarn notify`: run the notify job.
- `yarn start:all`: for environments where cron is not available, starts both the API server, and schedule the notify job every 30 minutes via [`node-cron`](https://www.npmjs.com/package/node-cron).

## API usage

### Authentication

Most queries require a Bearer authentication, HTTP header examples:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MiwidHlwZSI6MCwiZXhwIjoxNjg2MjM5MTA2Mzc4LCJpYXQiOjE2Nzg0NjMxMDZ9.C8aTeJzadlY-FGQTKD3K-UpVbN7dRbo4mh_CxdqrZiQ"
}
```

This token is returns by both the `signup` and `signin` mutations:

```gql
signup(memberId: String! signature: String! timestamp: Int! name: String! email: String): String
signin(memberId: String! signature: String! timestamp: Int!): String
```

The `signature` parameter consist of a `MEMBERSHIP_ID:TIMESTAMP` signed with the membership controller account.

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
  subscribeToEntity(kind: FORUM_WATCHED_CATEGORY_POST, entityId: "3", shouldNotify: true) {
    id
  }
}
```

This mutation subscribes the authenticated member to get notified of any new post in the forum category 3.

```gql
mutation {
  subscribeToEntity(kind: FORUM_WATCHED_THREAD, entityId: "123", shouldNotify: false) {
    id
  }
}
```

This mutes all notification from the thread 123 (even when the authenticated member is mentioned).

To cancel entity subscriptions:

```gql
mutation {
  unsubscribeToEntity(kind: FORUM_WATCHED_THREAD, entityId: "123") {
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
    shouldNotify
    shouldNotifyByEmail
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
    isSent
  }
}
```

## Development

### Run locally

> **Note**
>
> The following commands are ran from the monorepos root.

To run the API to develop locally:

1. `yarn --frozen-lockfile`: Install the dependencies.
2. Create and configure a `packages/server/.env`.
3. Launch the Postgres database. `yarn workspace server dev:db`: If docker is installed.
4. `yarn workspace server prisma generate`: Generate Prisma client.
5. `yarn workspace server codegen`: Run `graphql-codegen`.
6. `yarn workspace server dev`: Start the server.

### Some other useful scripts

- `yarn workspace server test`: Run tests.
- `yarn workspace server dev:db:clean`: Bring down and reset the database.
- [`yarn workspace server prisma studio`][prisma studio]: Launch an administration GUI for the database.
- [`yarn workspace server prisma migrate dev`][prisma migrate]: Synchronize `schema.prisma` with the database schema.
- [`yarn workspace server prisma db push`][prisma db:push]: Does the same but without creating a migration.
- `yarn workspace server authtoken [member id]`: Generate an authentication token for the provided member.
- `yarn workspace server lint:fix`: Fix some code formatting issue.

### Add support for more QN events

As an example see [this commit](https://github.com/Joystream/pioneer/pull/4210/commits/d9d537aaa485f8710879a6610133c14ece612412) which adds support for notifications based on the `ThreadCreatedEvent`

## Roadmap

TODO

[prisma studio]: https://www.prisma.io/studio
[prisma migrate]: https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#development-environments
[prisma db:push]: https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push
