import { BlockFieldsFragment, MemberFieldsFragment } from '../queries'

import { Block, MemberInternal } from './memberships'

export * from './memberships'

export const asBlock = (block: BlockFieldsFragment): Block => {
  return {
    ...block,
  }
}

export const asMember = (data: MemberFieldsFragment): MemberInternal => {
  return {
    id: data.id,
    handle: data.handle,
    name: data.name ?? undefined,
    avatar: data.avatarUri ?? undefined,
    inviteCount: data.inviteCount,
    isFoundingMember: data.isVerified,
    isVerified: data.isVerified,
    rootAccount: data.rootAccount,
    controllerAccount: data.controllerAccount,
    roles: [],
  }
}
