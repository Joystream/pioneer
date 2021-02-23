import { MemberFieldsFragment } from '../../api/queries'
import rawMembers from './raw/members.json'

export type MockMember = MemberFieldsFragment

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => {
  return {
    ...rawMember,
    __typename: 'Member',
  }
})
