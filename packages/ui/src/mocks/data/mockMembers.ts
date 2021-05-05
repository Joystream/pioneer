import { MemberFieldsFragment } from '@/memberships/queries'

import rawMembers from './raw/members.json'

export type MockMember = Omit<MemberFieldsFragment, '__typename' | 'metadata'> & {
  metadata: {
    name: string
    about: string
  }
}

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => {
  return {
    ...rawMember,
    roles: [],
  }
})

export const seedMember = (member: MockMember, server: any) => {
  const temporary: any = { ...member }

  return server.schema.create('Membership', {
    ...temporary,
    metadata: server.schema.create('MemberMetadata', member.metadata),
  })
}

export const seedMembers = (server: any) => {
  mockMembers.map((member) => seedMember(member, server))
}
