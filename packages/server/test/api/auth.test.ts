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
  let emailVerifyToken: string

  it('Member does not exist', async () => {
    const memberExistQuery = gql`
      query {
        memberExist(id: 1)
      }
    `
    expect(await api(memberExistQuery)).toEqual({ memberExist: false })
  })

  const extractEmailToken = (emailRecipient: string) => {
    expect(mockEmailProvider.sentEmails.length).toBe(1)
    expect(mockEmailProvider.sentEmails).toContainEqual(
      expect.objectContaining({
        to: emailRecipient,
        subject: 'Confirm your email for Pioneer',
        html: expect.stringMatching(verifyEmailLinkRegex),
      })
    )

    const emailVerifyToken = verifyEmailLinkRegex.exec(mockEmailProvider.sentEmails[0].html)?.[1] ?? ''
    expect(emailVerifyToken).toMatch(jwtRegex)
    return emailVerifyToken
  }

  it('Member signs up ', async () => {
    mockEmailProvider.reset()
    mockRequest.mockReset()
    mockRequest.mockReturnValue({ membershipByUniqueInput: { controllerAccount: ALICE.controller.address } })

    const timestamp = Date.now()

    const signup = (
      input: { memberId?: number; signature?: string; timestamp?: number; email?: string },
      expectFailure = false
    ) => {
      const memberId = isUndefined(input.memberId) ? ALICE.id : input.memberId
      const email = isUndefined(input.email) ? ALICE.email : input.email
      const t = isUndefined(input.timestamp) ? timestamp : input.timestamp
      const signature = isUndefined(input.signature) ? signWith(ALICE, `${memberId}:${t}`) : input.signature

      const mutation = gql`
          mutation {
            signup(
              memberId: ${memberId}
              name: ${ALICE.name}
              email: ${email}
              signature: ${signature}
              timestamp: ${t}
            )
          }
        `
      return api(mutation, undefined, expectFailure)
    }

    // Empty signature
    const emptySignature = await signup({ signature: '' }, true)
    expect(emptySignature).toEqual({ signup: null })

    // Wrong signature
    const wrongSig1 = await signup({ signature: signWith(ALICE, `${ALICE.id + 1}:${timestamp}`) }, true)
    expect(wrongSig1).toEqual({ signup: null })

    // Wrong signature
    const wrongSig2 = await signup({ signature: signWith(ALICE, `${ALICE.id}:${timestamp + 1}`) }, true)
    expect(wrongSig2).toEqual({ signup: null })

    // Outdated old timestamp
    const oldTimestamp = await signup({ signature: signWith(ALICE, `${ALICE.id}:${1}`), timestamp: 1 }, true)
    expect(oldTimestamp).toEqual({ signup: null })

    // Signed with the wrong controller account
    const wrongController = await signup(
      { signature: signWith(BOB, `${ALICE.id}:${timestamp}`), memberId: ALICE.id },
      true
    )
    expect(wrongController).toEqual({ signup: null })

    // Invalid email
    const invalidEmail = await signup({ email: 'foo' }, true)
    expect(invalidEmail).toEqual({ signup: null })

    // Membership not in the QN
    const unknownMember = await signup({ signature: signWith(BOB, `${BOB.id}:${timestamp}`), memberId: BOB.id }, true)
    expect(unknownMember).toEqual({ signup: null })

    // No member should have been created
    expect(await prisma.member.count({ where: { id: { in: [ALICE.id, BOB.id] } } })).toBe(0)

    // This one should succeed
    const success = await signup({ signature: signWith(ALICE, `${ALICE.id}:${timestamp}`), memberId: ALICE.id })

    // Second signup for the same member should fail
    const secondSuccess = await signup(
      { signature: signWith(ALICE, `${ALICE.id}:${timestamp}`), memberId: ALICE.id },
      true
    )

    expect(success).toEqual({ signup: expect.stringMatching(jwtRegex) })
    expect(secondSuccess).toEqual({ signup: null })
    expect(await prisma.member.count({ where: { id: ALICE.id } })).toBe(1)

    authToken = success?.signup
    emailVerifyToken = extractEmailToken(ALICE.email)
  })

  it('Member exist', async () => {
    const memberExistQuery = gql`
      query {
        memberExist(id: 1)
      }
    `
    expect(await api(memberExistQuery)).toEqual({ memberExist: true })
  })

  it('Me query', async () => {
    const meQuery = gql`
      query {
        me {
          id
          name
          email
          unverifiedEmail
        }
      }
    `
    expect(await authApi(meQuery, authToken)).toEqual({
      me: { id: ALICE.id, name: ALICE.name, email: null, unverifiedEmail: ALICE.email },
    })
  })

  it('Member sign in', async () => {
    mockRequest.mockReset()
    mockRequest.mockImplementation((_, __, variables: { id: string }) => ({
      membershipByUniqueInput: {
        controllerAccount: [ALICE, BOB].find(({ id }) => id === Number(variables.id))?.controller.address,
      },
    }))

    const timestamp = Date.now()
    const meQuery = gql`
      query {
        me {
          id
        }
      }
    `

    const signin = (input: { memberId?: number; signature?: string; timestamp?: number }, expectFailure = false) => {
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
      return api(mutation, undefined, expectFailure)
    }

    // Empty signature
    const emptySignature = await signin({ signature: '' }, true)
    expect(emptySignature).toEqual({ signin: null })
    // Wrong signature
    const wrongSig1 = await signin({ signature: signWith(ALICE, `123:${timestamp}`) }, true)
    expect(wrongSig1).toEqual({ signin: null })

    // Wrong signature
    const wrongSig2 = await signin({ signature: signWith(ALICE, `${ALICE.id}:${timestamp - 1}`) }, true)
    expect(wrongSig2).toEqual({ signin: null })

    // Outdated old timestamp
    const oldTimestamp = await signin({ signature: signWith(ALICE, `${ALICE.id}:1`), timestamp: 1 }, true)
    expect(oldTimestamp).toEqual({ signin: null })

    // Signed with the wrong controller account
    const wrongController = await signin(
      { signature: signWith(BOB, `${ALICE.id}:${timestamp}`), memberId: ALICE.id },
      true
    )
    expect(wrongController).toEqual({ signin: null })

    // Membership not registered (will returned a valid token but without access to an existing member)
    const unknownMember = await signin({ signature: signWith(BOB, `${BOB.id}:${timestamp}`), memberId: BOB.id })
    expect(unknownMember).toEqual({ signin: expect.stringMatching(jwtRegex) })
    const unknownMemberToken = (unknownMember as any).signin
    expect(await api(meQuery, { Authorization: `Bearer ${unknownMemberToken}` }, true)).toEqual({ me: null })

    // This one should succeed
    const success = await signin({ signature: signWith(ALICE, `${ALICE.id}:${timestamp}`), memberId: ALICE.id })

    expect(success).toEqual({ signin: expect.stringMatching(jwtRegex) })

    const signInToken = (success as any).signin

    expect(signInToken).not.toBe(authToken)

    const authorized = await api(meQuery, { Authorization: `Bearer ${signInToken}` })
    expect(authorized).toEqual({ me: { id: ALICE.id } })
  })

  const verifyEmail = (emailToken: string, expectFailure = false) => {
    const verifyEmailMutation = gql`
      mutation {
        verifyEmail(token: ${emailToken}) {
          id
          name
          email
        }
      }
    `
    return api(verifyEmailMutation, undefined, expectFailure)
  }

  it('Member verifies email', async () => {
    // Empty token
    expect(await verifyEmail('', true)).toEqual({ verifyEmail: null })

    // Wrong token
    expect(await verifyEmail('foo', true)).toEqual({ verifyEmail: null })

    // Invalid token
    expect(await verifyEmail('foo.bar.baz', true)).toEqual({ verifyEmail: null })

    // Valid token
    expect(await verifyEmail(emailVerifyToken)).toEqual({
      verifyEmail: { id: ALICE.id, name: ALICE.name, email: ALICE.email },
    })

    // Email should be updated
    expect(await prisma.member.findUnique({ where: { id: ALICE.id } })).toEqual(
      expect.objectContaining({ email: ALICE.email, unverifiedEmail: null })
    )
  })

  it('Member changes email', async () => {
    mockEmailProvider.reset()

    const changeEmail = (newEmail: string, token: string, expectFailure = false) => {
      const mutation = gql`
        mutation {
          updateMember(email: ${newEmail}) {
            unverifiedEmail
          }
        }
      `
      return api(
        mutation,
        {
          Authorization: `Bearer ${token}`,
        },
        expectFailure
      )
    }

    // Not authenticated
    expect(await changeEmail('foo', '', true)).toEqual({
      updateMember: null,
    })

    // Invalid email
    expect(await changeEmail('foo', authToken, true)).toEqual({
      updateMember: null,
    })

    const newAliceEmail = 'alice-new@example.com'

    // Valid email
    expect(await changeEmail(newAliceEmail, authToken)).toEqual({ updateMember: { unverifiedEmail: newAliceEmail } })
    emailVerifyToken = extractEmailToken(newAliceEmail)

    // Email should not be updated yet
    expect(await prisma.member.findUnique({ where: { id: ALICE.id } })).toEqual(
      expect.objectContaining({ email: ALICE.email, unverifiedEmail: newAliceEmail, receiveEmails: true })
    )

    // Verify new email
    expect(await verifyEmail(emailVerifyToken)).toEqual({
      verifyEmail: { id: ALICE.id, name: ALICE.name, email: newAliceEmail },
    })

    // Email should be updated
    expect(await prisma.member.findUnique({ where: { id: ALICE.id } })).toEqual(
      expect.objectContaining({ email: newAliceEmail, unverifiedEmail: null })
    )
  })
})
