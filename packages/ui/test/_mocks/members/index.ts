import { asMember, Member } from '../../../src/memberships/types'
import { mockMembers } from '../../../src/mocks/data'

export type Members = 'alice' | 'bob'

export const getMember = (handle: Members): Member => {
  const member = { ...(mockMembers.find((m) => m.handle == handle) || mockMembers[0]) } as any
  delete member.registeredAtBlockId
  delete member.registeredAtTime
  delete member.invitedById
  delete member.about
  return asMember(member)
}
