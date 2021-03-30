import { BaseMember } from '../../common/types'
import rawMembers from './raw/members.json'

export type MockMember = BaseMember & { registeredAtBlock: string; invitedById?: string; registeredAtTime: string }

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => {
  return {
    ...rawMember,
  }
})
