import { MemberFieldsFragment } from '../../api/queries'
import rawMembers from './raw/members.json'

export type MockVideo = MemberFieldsFragment

export const mockMembers: MockVideo[] = rawMembers.map((rawMember) => {
  return {
    ...rawMember,
    __typename: 'Member',
  }
})
