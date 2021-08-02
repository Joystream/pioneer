import { MemberFieldsFragment } from '@/memberships/queries'
import { BlockFieldsMock } from '@/mocks/data/common'

import rawMembers from './raw/members.json'

export interface MockRole {
  group: { name: string }
  isLead: boolean
}

export type MockMember = Omit<MemberFieldsFragment, '__typename' | 'metadata' | 'roles'> & {
  metadata: {
    name: string
    about: string
  }
  entry: {
    __typename: string
    membershipBoughtEvent: BlockFieldsMock
  }
}

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => rawMember)

const seedMembershipEntry = (member: MockMember, server: any) => {
  const membershipBoughtEvent = server.schema.create('MembershipBoughtEvent', member.entry.membershipBoughtEvent)

  return server.schema.create('MembershipEntryPaid', { membershipBoughtEvent })
}

export const seedMember = (member: MockMember, server: any) => {
  const temporary: any = { ...member }

  return server.schema.create('Membership', {
    ...temporary,
    metadata: server.schema.create('MemberMetadata', member.metadata),
    entry: seedMembershipEntry(member, server),
  })
}

export const seedMembers = (server: any, howMany?: number) => {
  mockMembers.slice(0, howMany).map((member) => seedMember(member, server))
}
