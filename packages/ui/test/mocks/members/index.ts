import { Server } from 'miragejs/server'
import { MemberFieldsFragment } from '../../../src/api/queries'

type MockMember = Omit<MemberFieldsFragment, '__typename' | 'id'>

export const createMember = (server: Server, member: MockMember) => {
  server.create('Member', member as any)
}

export const aliceMember: MockMember = {
  name: 'Alice Member',
  handle: 'alice_handle',
  rootAccount: 'aa',
  controllerAccount: 'bb',
  isFoundingMember: true,
  isVerified: true,
  inviteCount: 5,
}

export const bobMember: MockMember = {
  name: 'Bob Member',
  handle: 'bob_handle',
  rootAccount: 'aa',
  controllerAccount: 'bb',
  isFoundingMember: false,
  isVerified: false,
  inviteCount: 5,
}
