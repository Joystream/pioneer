import { Server } from 'miragejs/server'
import { MemberFieldsFragment } from '../../../src/api/queries'
import { alice, aliceStash, bob, bobStash } from '../keyring'

export type MockMember = Omit<MemberFieldsFragment, '__typename'>

export type Members = 'Alice' | 'Bob'

export const getMember = async (name: Members): Promise<MockMember> => {
  if (name === 'Alice') {
    return {
      ...aliceMember,
      rootAccount: alice.address,
      controllerAccount: aliceStash.address,
    }
  }

  return {
    ...bobMember,
    rootAccount: bob.address,
    controllerAccount: bobStash.address,
  }
}

export const createMember = async (server: Server, memberOrName: MemberFieldsFragment | Members) => {
  let member: MockMember

  if (typeof memberOrName !== 'string') {
    member = memberOrName
  } else {
    member = await getMember(memberOrName)
  }

  return server.schema.create('Member', {
    ...member,
    __typename: 'Member',
  } as any)
}

const aliceMember: MockMember = {
  id: '0',
  name: 'Alice Member',
  handle: 'alice_handle',
  about: '',
  avatarURI: '',
  rootAccount: '',
  controllerAccount: '',
  isFoundingMember: true,
  isVerified: true,
  inviteCount: 5,
}

const bobMember: MockMember = {
  id: '1',
  name: 'Bob Member',
  handle: 'bob_handle',
  about: '',
  avatarURI: '',
  rootAccount: '',
  controllerAccount: '',
  isFoundingMember: false,
  isVerified: false,
  inviteCount: 5,
}
