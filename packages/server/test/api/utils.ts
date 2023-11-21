import { JOYSTREAM_ADDRESS_PREFIX } from '@joystream/types'
import { Keyring } from '@polkadot/keyring'
import { KeyringPair } from '@polkadot/keyring/types'
import { u8aToHex } from '@polkadot/util'
import { ExpressContext } from 'apollo-server-express'
import { isUndefined, zipWith } from 'lodash'

import { createAuthToken } from '@/auth/model/token'
import { server } from '@/common/api'

export type Member = { id: number; name: string; email: string; controller: KeyringPair }

// Fake gql tag just to make the queries easier to read on som IDE
export const gql = (strings: TemplateStringsArray, ...values: any[]): string =>
  zipWith(strings, values, (s, v) => s + (isUndefined(v) ? '' : JSON.stringify(v))).join('')

export const keyring = new Keyring({
  type: 'sr25519',
  ss58Format: JOYSTREAM_ADDRESS_PREFIX,
})

export const api = async (query: string, headers?: Record<string, string>, expectFailure = false) => {
  const req = headers && { get: (prop: string) => headers[prop] }
  const ctx = req && ({ req, res: {} } as ExpressContext)
  const res = await server.executeOperation({ query }, ctx)

  if (expectFailure) {
    expect(res.errors).toBeDefined()
  } else {
    expect(res.errors).toBeUndefined()
  }

  return res.data
}

export const authApi = async (query: string, authToken: string, expectFailure = false) => {
  if (!expectFailure) {
    const unAuthorized1 = await api(query, {}, true)
    expect(Object.values(unAuthorized1 ?? {})).not.toContainEqual(expect.anything())

    const unAuthorized2 = await api(query, { Authorization: 'foo' }, true)
    expect(Object.values(unAuthorized2 ?? {})).not.toContainEqual(expect.anything())

    const unAuthorized3 = await api(query, { Authorization: `Bearer ${createAuthToken(1234)}` }, true)
    expect(Object.values(unAuthorized3 ?? {})).not.toContainEqual(expect.anything())
  }

  return await api(query, { Authorization: `Bearer ${authToken}` }, expectFailure)
}

export const signWith = (member: Member, value: string) => u8aToHex(member.controller.sign(value))

export const jwtRegex = /^ey[\w-]+\.[\w-]+\.[\w-]+$/
export const verifyEmailLinkRegex = RegExp(
  String.raw`\b/#/settings\?emailVerificationToken=(${jwtRegex.source.slice(1, -1)})\b`,
  's'
)
