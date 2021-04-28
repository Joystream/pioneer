import { MemberFieldsFragment } from '../queries'

import { Member } from './memberships'

export const asMember = (data: MemberFieldsFragment): Member => {
  return {
    id: data.id,
    handle: data.handle,
    name: data.name ?? undefined,
    avatar: data.avatarUri ?? undefined,
    inviteCount: data.inviteCount,
    isFoundingMember: data.isFoundingMember,
    isVerified: data.isVerified,
    rootAccount: data.rootAccount,
    controllerAccount: data.controllerAccount,
    roles: [],
  }
}
