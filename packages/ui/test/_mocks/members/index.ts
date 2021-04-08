import { Server } from 'miragejs'

import { MemberFieldsFragment } from '../../../src/memberships/queries'
import { mockMembers } from '../../../src/mocks/data'

export type Members = 'alice' | 'bob'

export const getMember = (handle: Members): MemberFieldsFragment => {
  const member = { ...(mockMembers.find((m) => m.handle == handle) || mockMembers[0]) } as any
  delete member.registeredAtBlockId
  delete member.registeredAtTime
  delete member.isFoundingMember
  delete member.invitedById
  return member
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
