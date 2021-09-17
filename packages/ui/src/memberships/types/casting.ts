import { asBlock } from '@/common/types'
import { asWorkingGroupName } from '@/working-groups/types'

import { MemberFieldsFragment, MemberWithDetailsFieldsFragment } from '../queries'

import { Member, MemberEntry, MemberRole, MemberWithDetails } from './Member'

export const asMember = (data: Omit<MemberFieldsFragment, '__typename'>): Member => ({
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
  invitedBy: '',
  entry: asMemberEntry(fields.entry),
  invitees: fields.invitees.map((fields) => {
    return {
      ...asMember(fields),
      // See: https://github.com/Joystream/pioneer/issues/1493
      // entry: asMemberEntry(fields.entry) as InvitedEntry,
    }
  }),
})
