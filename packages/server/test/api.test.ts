import { cryptoWaitReady } from '@polkadot/util-crypto'
import { isUndefined } from 'lodash'

import { createAuthToken } from '@/auth/model/token'
import { prisma } from '@/common/prisma'

import { createMember } from './_mocks/notifier/createMember'
import { mockRequest, mockSendEmail } from './setup'
import { api, authApi, clearDb, gql, jwtRegex, keyring, Member, signWith, verifyEmailLinkRegex } from './utils'

describe('API', () => {
  let ALICE: Member
  let BOB: Member

  beforeAll(async () => {
    await clearDb()
    await cryptoWaitReady()
    ALICE = { id: 1, name: 'Alice', email: 'alice@example.com', controller: keyring.addFromUri('//Alice') }
    BOB = { id: 2, name: 'Bob', email: 'bob@example.com', controller: keyring.addFromUri('//Bob') }
  })

  describe('API: Authentication', () => {
    let authToken: string

    it('Member does not exist', async () => {
      const memberExistQuery = gql`
        query {
          memberExist(id: 1)
        }
      `
      expect(await api(memberExistQuery)).toEqual({ memberExist: false })
    })

    it('Member signs up ', async () => {
      mockSendEmail.mockReset()
      mockRequest.mockReset()
      mockRequest.mockReturnValue({ membershipByUniqueInput: { controllerAccount: ALICE.controller.address } })

      const timestamp = Date.now()

      const signup = (input: { memberId?: number; signature?: string; timestamp?: number }) => {
        const memberId = isUndefined(input.memberId) ? ALICE.id : input.memberId
        const t = isUndefined(input.timestamp) ? timestamp : input.timestamp
        const signature = isUndefined(input.signature) ? signWith(ALICE, `${memberId}:${t}`) : input.signature

        const mutation = gql`
          mutation {
            signup(
              memberId: ${memberId}
              name: ${ALICE.name}
              email: ${ALICE.email}
              signature: ${signature}
              timestamp: ${t}
            )
          }
        `
        return api(mutation)
      }

      // Empty signature
      const emptySignature = await signup({ signature: '' })
      expect(emptySignature).toEqual({ signup: null })

      // Wrong signature
      const wrongSig1 = await signup({ signature: signWith(ALICE, `${ALICE.id + 1}:${timestamp}`) })
      expect(wrongSig1).toEqual({ signup: null })

      // Wrong signature
      const wrongSig2 = await signup({ signature: signWith(ALICE, `${ALICE.id}:${timestamp + 1}`) })
      expect(wrongSig2).toEqual({ signup: null })

      // Outdated old timestamp
      const oldTimestamp = await signup({ signature: signWith(ALICE, `${ALICE.id}:${1}`), timestamp: 1 })
      expect(oldTimestamp).toEqual({ signup: null })

      // Signed with the wrong controller account
      const wrongController = await signup({ signature: signWith(BOB, `${ALICE.id}:${timestamp}`), memberId: ALICE.id })
      expect(wrongController).toEqual({ signup: null })

      // Membership not in the QN
      const unknownMember = await signup({ signature: signWith(BOB, `${BOB.id}:${timestamp}`), memberId: BOB.id })
      expect(unknownMember).toEqual({ signup: null })

      // No member should have been created
      expect(await prisma.member.count({ where: { id: { in: [ALICE.id, BOB.id] } } })).toBe(0)

      // This one should succeed
      const success = await signup({ signature: signWith(ALICE, `${ALICE.id}:${timestamp}`), memberId: ALICE.id })

      expect(success).toEqual({ signup: expect.stringMatching(jwtRegex) })
      expect(await prisma.member.count({ where: { id: ALICE.id } })).toBe(1)

      authToken = success?.signup

      expect(mockSendEmail).toHaveBeenCalledTimes(1)
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: ALICE.email,
          subject: 'Confirm your email for Pioneer',
          text: expect.stringMatching(verifyEmailLinkRegex),
        })
      )
    })

    it('Member exist', async () => {
      const memberExistQuery = gql`
        query {
          memberExist(id: 1)
        }
      `
      expect(await api(memberExistQuery)).toEqual({ memberExist: true })
    })

    it('Member query', async () => {
      const memberQuery = gql`
        query {
          member {
            id
            name
            email
          }
        }
      `
      expect(await authApi(memberQuery, authToken)).toEqual({ member: { id: ALICE.id, name: ALICE.name, email: null } })
    })

    it('Member sign in', async () => {
      mockRequest.mockReset()
      mockRequest.mockImplementation((_, __, variables: { id: string }) => ({
        membershipByUniqueInput: {
          controllerAccount: [ALICE, BOB].find(({ id }) => id === Number(variables.id))?.controller.address,
        },
      }))

      const timestamp = Date.now()
      const memberQuery = gql`
        query {
          member {
            id
          }
        }
      `

      const signin = (input: { memberId?: number; signature?: string; timestamp?: number }) => {
        const memberId = isUndefined(input.memberId) ? ALICE.id : input.memberId
        const t = isUndefined(input.timestamp) ? timestamp : input.timestamp
        const signature = isUndefined(input.signature) ? signWith(ALICE, `${memberId}:${t}`) : input.signature

        const mutation = gql`
          mutation {
            signin(
              memberId: ${memberId}
              signature: ${signature}
              timestamp: ${t}
            )
          }
        `
        return api(mutation)
      }

      // Empty signature
      const emptySignature = await signin({ signature: '' })
      expect(emptySignature).toEqual({ signin: null })

      // Wrong signature
      const wrongSig1 = await signin({ signature: signWith(ALICE, `${ALICE.id + 1}:${timestamp}`) })
      expect(wrongSig1).toEqual({ signin: null })

      // Wrong signature
      const wrongSig2 = await signin({ signature: signWith(ALICE, `${ALICE.id}:${timestamp + 1}`) })
      expect(wrongSig2).toEqual({ signin: null })

      // Outdated old timestamp
      const oldTimestamp = await signin({ signature: signWith(ALICE, `${ALICE.id}:${1}`), timestamp: 1 })
      expect(oldTimestamp).toEqual({ signin: null })

      // Signed with the wrong controller account
      const wrongController = await signin({ signature: signWith(BOB, `${ALICE.id}:${timestamp}`), memberId: ALICE.id })
      expect(wrongController).toEqual({ signin: null })

      // Membership not registered (will returned a valid token but without access to an existing member)
      const unknownMember = await signin({ signature: signWith(BOB, `${BOB.id}:${timestamp}`), memberId: BOB.id })
      expect(unknownMember).toEqual({ signin: expect.stringMatching(jwtRegex) })
      const unknownMemberToken = (unknownMember as any).signin
      expect(await api(memberQuery, { Authorization: `Bearer ${unknownMemberToken}` })).toEqual({ member: null })

      // This one should succeed
      const success = await signin({ signature: signWith(ALICE, `${ALICE.id}:${timestamp}`), memberId: ALICE.id })

      expect(success).toEqual({ signin: expect.stringMatching(jwtRegex) })

      const signInToken = (success as any).signin

      expect(signInToken).not.toBe(authToken)

      const authorized = await api(memberQuery, { Authorization: `Bearer ${signInToken}` })
      expect(authorized).toEqual({ member: { id: ALICE.id } })
    })
  })

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
          }
        }
      `
      expect(await authApi(entitySubscriptionsQuery, authToken)).toEqual({ entitySubscriptions: [] })
    })

    it('Customize General Subscriptions', async () => {
      const generalSubscriptionsMutation = gql`
        mutation {
          generalSubscriptions(
            data: [
              { kind: FORUM_POST_ALL }
              { kind: FORUM_POST_MENTION, shouldNotify: false, shouldNotifyByEmail: true }
            ]
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

    it('Notifications Query', async () => {
      const notificationQuery = gql`
        query {
          notifications {
            id
            kind
            eventId
            entityId
            isSent
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
            isSent: false,
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
            isSent: false,
            isRead: false,
          },
        ],
      })
    })
  })
})
