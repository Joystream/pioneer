import { cryptoWaitReady } from '@polkadot/util-crypto'
import { isUndefined } from 'lodash'

import { prisma } from '@/common/prisma'

import { clearDb, mockRequest, mockEmailProvider } from '../setup'

import { api, authApi, gql, jwtRegex, keyring, Member, signWith, verifyEmailLinkRegex } from './utils'

describe('API: Authentication', () => {
  let ALICE: Member
  let BOB: Member

  beforeAll(async () => {
    await clearDb()
    await cryptoWaitReady()
    ALICE = { id: 1, name: 'Alice', email: 'alice@example.com', controller: keyring.addFromUri('//Alice') }
    BOB = { id: 2, name: 'Bob', email: 'bob@example.com', controller: keyring.addFromUri('//Bob') }
  })

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
    mockEmailProvider.reset()
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

    expect(mockEmailProvider.sentEmails.length).toBe(1)
    expect(mockEmailProvider.sentEmails).toContainEqual(
      expect.objectContaining({
        to: ALICE.email,
        subject: 'Confirm your email for Pioneer',
        html: expect.stringMatching(verifyEmailLinkRegex),
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
    const wrongSig1 = await signin({ signature: signWith(ALICE, `123:${timestamp}`) })
    expect(wrongSig1).toEqual({ signin: null })

    // Wrong signature
    const wrongSig2 = await signin({ signature: signWith(ALICE, `${ALICE.id}:${timestamp - 1}`) })
    expect(wrongSig2).toEqual({ signin: null })

    // Outdated old timestamp
    const oldTimestamp = await signin({ signature: signWith(ALICE, `${ALICE.id}:1`), timestamp: 1 })
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
