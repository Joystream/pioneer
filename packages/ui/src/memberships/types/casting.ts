import { BlockFieldsFragment, MemberFieldsFragment } from '../queries'

import { Block, Membership } from './memberships'

export const asBlock = (block: BlockFieldsFragment): Block => {
  return {
    ...block,
  }
}

export const asMember = (data: MemberFieldsFragment): Membership => {
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
