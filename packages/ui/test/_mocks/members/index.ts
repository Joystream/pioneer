import { MemberInternal } from '../../../src/memberships/types'
import { mockMembers } from '../../../src/mocks/data'

export type Members = 'alice' | 'bob'

export const getMember = (handle: Members): MemberInternal => {
  const member = { ...(mockMembers.find((m) => m.handle == handle) || mockMembers[0]) } as any
  delete member.registeredAtBlockId
  delete member.registeredAtTime
  delete member.invitedById
  delete member.about
  return member
}
