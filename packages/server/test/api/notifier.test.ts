import { createAuthToken } from '@/auth/model/token'
import { prisma } from '@/common/prisma'

import { createMember } from '../_mocks/notifier/createMember'
import { clearDb } from '../setup'

import { authApi, gql } from './utils'

describe('API: notifier', () => {
  const ALICE = { id: 1, name: 'Alice' }
  const authToken = createAuthToken(ALICE.id)

  beforeAll(async () => {
    await clearDb()
    await createMember(ALICE.id, ALICE.name)
  })

  it('Default General Subscriptions', async () => {
    const generalSubscriptionsQuery = gql`
      query {
        generalSubscriptions {
          id
          kind
          shouldNotify
          shouldNotifyByEmail
        }
      }
    `
    const res = await authApi(generalSubscriptionsQuery, authToken)
    expect(res).toEqual({ generalSubscriptions: expect.any(Array) })

    const generalSubscriptions = res?.generalSubscriptions

    expect(generalSubscriptions).toContainEqual(
      expect.objectContaining({ kind: 'FORUM_POST_ALL', shouldNotify: false })
    )
    expect(generalSubscriptions).toContainEqual(
      expect.objectContaining({ kind: 'FORUM_POST_MENTION', shouldNotify: true })
    )

    // Because all subscriptions should be default ones, each id should be null
    expect(generalSubscriptions).not.toContainEqual(expect.objectContaining({ id: expect.anything() }))
  })

  it('Default Entity Subscriptions', async () => {
    const entitySubscriptionsQuery = gql`
      query {
        entitySubscriptions {
          id
          kind
          entityId
          status
        }
      }
    `
    expect(await authApi(entitySubscriptionsQuery, authToken)).toEqual({ entitySubscriptions: [] })
  })

  it('Customize General Subscriptions', async () => {
    const wrongMutation1 = gql`
      mutation {
        generalSubscriptions(data: [{ kind: FORUM_POST_ALL, entityId: "1" }]) {
          id
        }
      }
    `
    // expectFailure = true already checks for errors
    expect(await authApi(wrongMutation1, authToken, true)).toBeFalsy()

    const wrongMutation2 = gql`
      mutation {
        generalSubscriptions(data: [{ kind: FORUM_THREAD_ENTITY_POST }]) {
          id
        }
      }
    `
    // expectFailure = true already checks for errors
    expect(await authApi(wrongMutation2, authToken, true)).toBeFalsy()

    const generalSubscriptionsMutation = gql`
      mutation {
        generalSubscriptions(
          data: [{ kind: FORUM_POST_ALL }, { kind: FORUM_POST_MENTION, shouldNotify: false, shouldNotifyByEmail: true }]
        ) {
          id
          kind
        }
      }
    `
    expect(await authApi(generalSubscriptionsMutation, authToken)).toEqual({
      generalSubscriptions: [
        { id: expect.any(Number), kind: 'FORUM_POST_ALL' },
        { id: expect.any(Number), kind: 'FORUM_POST_MENTION' },
      ],
    })

    const generalSubscriptionsQuery = gql`
      query {
        generalSubscriptions {
          id
          kind
          shouldNotify
          shouldNotifyByEmail
        }
      }
    `
    const res = await authApi(generalSubscriptionsQuery, authToken)
    expect(res).toEqual({ generalSubscriptions: expect.any(Array) })

    const generalSubscriptions = res?.generalSubscriptions

    expect(generalSubscriptions).toEqual(
      expect.arrayContaining([
        { id: expect.any(Number), kind: 'FORUM_POST_ALL', shouldNotify: true, shouldNotifyByEmail: true },
        { id: expect.any(Number), kind: 'FORUM_POST_MENTION', shouldNotify: false, shouldNotifyByEmail: true },
        expect.objectContaining({ id: null, kind: expect.any(String) }),
      ])
    )
    expect(generalSubscriptions).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          kind: expect.not.stringMatching(/FORUM_POST_ALL|FORUM_POST_MENTION/),
        }),
      ])
    )
  })

  it('Customize Entity Subscriptions', async () => {
    const wrongMutation1 = gql`
      mutation {
        entitySubscription(kind: FORUM_POST_ALL, entityId: "1", status: WATCH) {
          id
        }
      }
    `
    // expectFailure = true already checks for errors
    expect(await authApi(wrongMutation1, authToken, true)).toBeFalsy()

    const wrongMutation2 = gql`
      mutation {
        entitySubscription(kind: FORUM_THREAD_ENTITY_POST, entityId: null, status: WATCH) {
          id
        }
      }
    `
    // expectFailure = true already checks for errors
    expect(await authApi(wrongMutation2, authToken, true)).toBeFalsy()

    const watchThreadMutation = (id: string) => gql`
        mutation {
          entitySubscription(kind: FORUM_THREAD_ENTITY_POST, entityId: ${id}, status: WATCH) {
            id
            kind
            entityId
            status
          }
        }
      `
    expect(await authApi(watchThreadMutation('1'), authToken)).toEqual({
      entitySubscription: {
        id: expect.any(Number),
        kind: 'FORUM_THREAD_ENTITY_POST',
        entityId: '1',
        status: 'WATCH',
      },
    })

    const unWatchThreadMutation = (id: string) => gql`
        mutation {
          entitySubscription(kind: FORUM_THREAD_ENTITY_POST, entityId: ${id}, status: DEFAULT) {
            id
            kind
            entityId
            status
          }
        }
      `
    expect(await authApi(unWatchThreadMutation('2'), authToken)).toEqual({
      entitySubscription: {
        id: null,
        kind: 'FORUM_THREAD_ENTITY_POST',
        entityId: '2',
        status: 'DEFAULT',
      },
    })

    const muteCategoryMutation = (id: string) => gql`
        mutation {
          entitySubscription(kind: FORUM_CATEGORY_ENTITY_POST, entityId: ${id}, status: MUTE) {
            id
            kind
            entityId
            status
          }
        }
      `
    expect(await authApi(muteCategoryMutation('1'), authToken)).toEqual({
      entitySubscription: {
        id: expect.any(Number),
        kind: 'FORUM_CATEGORY_ENTITY_POST',
        entityId: '1',
        status: 'MUTE',
      },
    })

    const entitySubscriptionsQuery = gql`
      query {
        entitySubscriptions {
          id
          kind
          entityId
          status
        }
      }
    `
    expect(await authApi(entitySubscriptionsQuery, authToken)).toEqual({
      entitySubscriptions: [
        { id: expect.any(Number), kind: 'FORUM_THREAD_ENTITY_POST', entityId: '1', status: 'WATCH' },
        { id: expect.any(Number), kind: 'FORUM_CATEGORY_ENTITY_POST', entityId: '1', status: 'MUTE' },
      ],
    })

    expect(await authApi(unWatchThreadMutation('1'), authToken)).toEqual({
      entitySubscription: {
        id: expect.any(Number),
        kind: 'FORUM_THREAD_ENTITY_POST',
        entityId: '1',
        status: 'DEFAULT',
      },
    })

    expect(await authApi(entitySubscriptionsQuery, authToken)).toEqual({
      entitySubscriptions: [
        { id: expect.any(Number), kind: 'FORUM_CATEGORY_ENTITY_POST', entityId: '1', status: 'MUTE' },
      ],
    })
  })

  it('Notifications Query', async () => {
    const notificationQuery = gql`
      query {
        notifications {
          id
          kind
          eventId
          entityId
          emailStatus
          isRead
        }
      }
    `
    expect(await authApi(notificationQuery, authToken)).toEqual({ notifications: [] })

    await prisma.notification.createMany({
      data: [
        {
          kind: 'FORUM_POST_ALL',
          eventId: 'post_creation:1',
          entityId: 'post:1',
          isRead: false,
          memberId: ALICE.id,
        },
      ],
    })

    expect(await authApi(notificationQuery, authToken)).toEqual({
      notifications: [
        {
          id: expect.any(Number),
          kind: 'FORUM_POST_ALL',
          eventId: 'post_creation:1',
          entityId: 'post:1',
          emailStatus: 'PENDING',
          isRead: false,
        },
      ],
    })
  })
})
