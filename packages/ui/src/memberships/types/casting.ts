import { MemberFieldsFragment } from '../queries'

import { Member, MemberRole } from './memberships'

export const asMember = (data: Omit<MemberFieldsFragment, '__typename'>): Member => {
  return {
    id: data.id,
    handle: data.handle,
    name: data.metadata.name ?? undefined,
    avatar: undefined,
    inviteCount: data.inviteCount,
    isFoundingMember: data.isFoundingMember,
    isVerified: data.isVerified,
    rootAccount: data.rootAccount,
    controllerAccount: data.controllerAccount,
    roles: data.roles.map(asMemberRole),
  }
}

export const asMemberRole = (data: { group: { name: string }; isLead: boolean }): MemberRole => ({
  isLeader: data.isLead,
  groupName: data.group.name,
})
