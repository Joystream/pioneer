import { MemberFieldsFragment } from '@/memberships/queries'
import { BlockFieldsMock } from '@/mocks/data/common'

import rawMembers from './raw/members.json'

export interface MockRole {
  group: { name: string }
  isLead: boolean
}

type Entry = {
  __typename: string
  membershipBoughtEvent?: BlockFieldsMock
  memberInvitedEvent?: BlockFieldsMock
}

export type MockMember = Omit<MemberFieldsFragment, '__typename' | 'metadata' | 'roles'> & {
  metadata: {
    name: string
    about: string
  }
  entry: Entry
}

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => rawMember)

const seedMembershipEntry = (member: MockMember, server: any) => {
  const isBoughtEvent = !!member.entry.membershipBoughtEvent
  const entryTypeName = isBoughtEvent ? 'MembershipEntryPaid' : 'MembershipEntryInvited'
  const eventType = isBoughtEvent ? 'MembershipBoughtEvent' : 'MemberInvitedEvent'
  const event = server.schema.create(
    eventType,
    isBoughtEvent ? member.entry.membershipBoughtEvent : member.entry.memberInvitedEvent
  )
  const data = isBoughtEvent ? { membershipBoughtEvent: event } : { memberInvitedEvent: event }

  return server.schema.create(entryTypeName, data)
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
