import { Server } from 'miragejs/server'
import { MemberFieldsFragment } from '../../../src/api/queries'
import { aliceSigner, bobSigner } from '../keyring'

type MockMember = Omit<MemberFieldsFragment, '__typename' | 'id'>

type Members = 'Alice' | 'Bob'

export const getMember = async (name: Members) => {
  if (name === 'Alice') {
    return { ...aliceMember, rootAccount: (await aliceSigner()).address }
  }

  return { ...bobMember, rootAccount: (await bobSigner()).address }
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
  name: 'Alice Member',
  handle: 'alice_handle',
  rootAccount: '',
  controllerAccount: '',
  isFoundingMember: true,
  isVerified: true,
  inviteCount: 5,
}

const bobMember: MockMember = {
  name: 'Bob Member',
  handle: 'bob_handle',
  rootAccount: '',
  controllerAccount: '',
  isFoundingMember: false,
  isVerified: false,
  inviteCount: 5,
}
