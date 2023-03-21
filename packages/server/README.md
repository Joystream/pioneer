# Pioneer backend

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Joystream/pioneer/tree/feature/backend-poc)

**Note**
The authorizations tokens of the members provided with the `INITIAL_MEMBERSHIPS` variable, are available in the logs.

## Overview

Currently the backend is composed of 3 parts:

- A PostgreSQL database which maps Joystream members to a name email, subscription preferences and notifications.
- A GraphQL API sever to register members in the database save their preferences, check there notifications...
- The notify script which checks for each registered members new notifications, and email them if necessary.

## Production CLI usage

**Note**
The following commands are run from the sever directory. To run from the monorepos root `yarn` should be replaced by `yarn workspace server`.

`yarn start:api`: starts the API server
`yarn notify`: run the notify job by checking for new notification for every registered members, and emailing them if necessary.
`yarn start:all`: for environments where cron is not available, starts both the API server, and schedule notifier job every 30 minutes via [`node-cron`](https://www.npmjs.com/package/node-cron).

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

```
mutation {
  generalSubscriptions(data: [
    { kind: FORUM_THREAD_CREATOR, shouldNotify: false, shouldNotifyByEmail: false },
    { kind: FORUM_THREAD_ALL }
  ]) {
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

## Development

### Run locally

**Note**
The following commands are ran from the monorepos root.

To run the api to develop locally:

1. Install the dependencies: `yarn --frozen-lockfile`
2. Create and configure a `packages/server/.env`
3. Launch the Postgres database. If docker is installed: `yarn workspace server dev:db`
4. Generate Prisma client: `yarn workspace server prisma generate`
5. Run `graphql-codegen`: `yarn workspace server codegen`
6. Start the server: `yarn workspace server dev:api`

### Add support for more QN events

TODO: add a link to a future commit adding support for `ThreadCreatedEvent`

## Roadmap

TODO
