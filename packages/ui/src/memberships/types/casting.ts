import { asBlock } from '@/common/types'
import { castQueryResult } from '@/common/utils/casting'
import { asWorkingGroupName } from '@/working-groups/types'

import { MemberFieldsFragment, MemberWithDetailsFieldsFragment } from '../queries'

import { BoundAccountEvent, Member, MemberEntry, MemberRole, MemberWithDetails } from './Member'

const asBoundAccountsEvent = (
  fields: NonNullable<MemberFieldsFragment['stakingaccountaddedeventmember']>[0]
): BoundAccountEvent => ({
  createdAtBlock: asBlock({
    createdAt: fields.createdAt,
    inBlock: fields.inBlock,
    network: fields.network,
  }),
  account: fields.account,
})

export const asMember = (data: Omit<MemberFieldsFragment, '__typename'>): Member => ({
  id: data.id,
  handle: data.handle,
  name: data.metadata.name ?? undefined,
  avatar: castQueryResult(data.metadata.avatar, 'AvatarUri')?.avatarUri,
  inviteCount: data.inviteCount,
  isFoundingMember: data.isFoundingMember,
  isCouncilMember: data.isCouncilMember,
  isVerified: data.isVerified,
  rootAccount: data.rootAccount,
  controllerAccount: data.controllerAccount,
  boundAccounts: data?.boundAccounts,
  boundAccountsEvents: data.stakingaccountaddedeventmember?.map(asBoundAccountsEvent) ?? [],
  roles: data.roles.map(asMemberRole),
  createdAt: data.createdAt,
})

export const asMemberRole = (data: MemberFieldsFragment['roles'][0]): MemberRole => ({
  id: data.id,
  isLead: data.isLead,
  groupName: asWorkingGroupName(data.group.name),
  createdAt: data.createdAt,
})

const asMemberEntry = (entry: MemberWithDetailsFieldsFragment['entry']): MemberEntry => {
  if (entry.__typename === 'MembershipEntryPaid' && entry.membershipBoughtEvent) {
    return { type: 'paid', block: asBlock(entry.membershipBoughtEvent) }
  } else if (entry.__typename === 'MembershipEntryInvited' && entry.memberInvitedEvent) {
    return { type: 'invited', block: asBlock(entry.memberInvitedEvent) }
  }

  return { type: 'genesis' }
}

export const asMemberWithDetails = (fields: MemberWithDetailsFieldsFragment): MemberWithDetails => ({
  ...asMember(fields),
  about: fields.metadata.about ?? undefined,
  entry: asMemberEntry(fields.entry),
  invitees: fields.invitees.map((fields) => {
    return {
      ...asMember(fields),
      // See: https://github.com/Joystream/pioneer/issues/1493
      // entry: asMemberEntry(fields.entry) as InvitedEntry,
    }
  }),
  invitedBy: fields.invitedBy ? asMember(fields.invitedBy) : undefined,
  externalResources: fields.metadata.externalResources
    ? fields.metadata.externalResources.map((resource) => ({
        source: resource.type,
        value: resource.value,
      }))
    : undefined,
})
