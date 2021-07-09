import { MemberFieldsFragment } from '@/memberships/queries'

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
}

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => rawMember)

export const seedMember = (member: MockMember, server: any) => {
  const temporary: any = { ...member }

  return server.schema.create('Membership', {
    ...temporary,
    metadata: server.schema.create('MemberMetadata', member.metadata),
  })
}

export const seedMembers = (server: any, howMany?: number) => {
  mockMembers.slice(0, howMany).map((member) => seedMember(member, server))
}
