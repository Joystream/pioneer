import { Server } from 'miragejs'

import { MemberFieldsFragment } from '../../../src/api/queries'
import { alice, aliceStash, bob, bobStash } from '../keyring'

export type Members = 'Alice' | 'Bob'

export const getMember = (name: Members): MemberFieldsFragment => {
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

export const createMember = (server: Server, memberOrName: MemberFieldsFragment | Members) => {
  let member: MemberFieldsFragment

  if (typeof memberOrName !== 'string') {
    member = memberOrName
  } else {
    member = getMember(memberOrName)
  }

  return server.schema.create('Membership', {
    ...member,
    __typename: 'Membership',
  } as any)
}

const aliceMember: MemberFieldsFragment = {
  __typename: 'Membership',
  id: '0',
  name: 'Alice Member',
  handle: 'alice_handle',
  about: '',
  avatarUri: '',
  rootAccount: '',
  controllerAccount: '',
  // isFoundingMember: true,
  isVerified: true,
  inviteCount: 5,
}

const bobMember: MemberFieldsFragment = {
  __typename: 'Membership',
  id: '1',
  name: 'Bob Member',
  handle: 'bob_handle',
  about: '',
  avatarUri: '',
  rootAccount: '',
  controllerAccount: '',
  // isFoundingMember: false,
  isVerified: false,
  inviteCount: 5,
}
