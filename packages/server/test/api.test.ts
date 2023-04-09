import { JOYSTREAM_ADDRESS_PREFIX } from '@joystream/types'
import { Keyring } from '@polkadot/keyring'
import { u8aToHex } from '@polkadot/util'
import { ExpressContext } from 'apollo-server-express'
import { isUndefined, zipWith } from 'lodash'

import { server } from '@/common/api'
import { prisma } from '@/common/prisma'

import { mockRequest, mockSendEmail } from './setup'

const stubExpressContext = (headers: Record<string, string>) =>
  ({
    req: { get: (prop: string) => headers[prop] },
    res: new Proxy({}, {}),
  } as ExpressContext)

// Fake gql tag just to make the queries easier to read on som IDE
const gql = (strings: TemplateStringsArray, ...values: any[]): string =>
  zipWith(strings, values, (s, v) => s + (isUndefined(v) ? '' : JSON.stringify(v))).join('')

const keyring = new Keyring({
  type: 'sr25519',
  ss58Format: JOYSTREAM_ADDRESS_PREFIX,
})

const clearDb = async () => {
  await prisma.subscription.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.member.deleteMany()
}

describe('API', () => {
  const ALICE = { id: 1, name: 'Alice', email: 'alice@example.com' }

  beforeAll(clearDb)

  describe('Sign-up flow', () => {
    let authToken: string

    const memberExistQuery = gql`
      query {
        memberExist(id: 1)
      }
    `
    const memberQuery = gql`
      query {
        member {
          id
          name
          email
        }
      }
    `

    it('Member does not exist', async () => {
      const res = await server.executeOperation({ query: memberExistQuery })
      expect(res.errors).toBeUndefined()
      expect(res.data).toEqual({ memberExist: false })
    })

    it('Empty member query', async () => {
      const res = await server.executeOperation({ query: memberQuery })
      expect(res.errors).toBeUndefined()
      expect(res.data).toEqual({ member: null })
    })

    it('Member signs up ', async () => {
      mockRequest.mockReset()
      mockSendEmail.mockReset()

      const alice = keyring.addFromUri('//Alice')
      mockRequest.mockReturnValue({ membershipByUniqueInput: { controllerAccount: alice.address } })

      const timestamp = Date.now()
      const signature = u8aToHex(alice.sign(`${ALICE.id}:${timestamp}`))
      const signupMutation = gql`
        mutation {
          signup(
            memberId: ${ALICE.id}
            name: ${ALICE.name}
            email: ${ALICE.email}
            signature: ${signature}
            timestamp: ${timestamp}
          )
        }
      `
      const res = await server.executeOperation({ query: signupMutation })
      expect(res.errors).toBeUndefined()
      expect(res.data).toEqual({ signup: expect.stringMatching(/^ey[\w-]+\.[\w-]+\.[\w-]+$/) })

      authToken = res.data?.signup

      expect(mockRequest).toHaveBeenCalledTimes(1)

      expect(mockSendEmail).toHaveBeenCalledTimes(1)
      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: ALICE.email,
          subject: 'Confirm your email for Pioneer',
          text: expect.stringMatching(/\b\/#\/\?verify-email=ey[\w-]+\.[\w-]+\.[\w-]+\b/s),
        })
      )

      const members = await prisma.member.findMany()
      expect(members).toEqual([expect.objectContaining({ id: ALICE.id, name: ALICE.name, email: null })])
    })

    it('Member query', async () => {
      const ctx = stubExpressContext({ Authorization: `Bearer ${authToken}` })
      const res = await server.executeOperation({ query: memberQuery }, ctx)
      expect(res.errors).toBeUndefined()
      expect(res.data).toEqual({ member: { id: ALICE.id, name: ALICE.name, email: null } })
    })

    it('Member exist', async () => {
      const res = await server.executeOperation({ query: memberExistQuery })
      expect(res.errors).toBeUndefined()
      expect(res.data).toEqual({ memberExist: true })
    })
  })

  describe('notifier', () => {
    it.skip('TODO', () => {
      // TODO
    })
  })
})
