import { Member } from '@/memberships/types'

export const unknownMember: Member = {
  id: '-1',
  handle: 'Unknown member',
  rootAccount: '',
  controllerAccount: '',
  inviteCount: 0,
  roles: [],
  isVerified: false,
  isFoundingMember: false,
  isCouncilMember: false,
  createdAt: '',
}
