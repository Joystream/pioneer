import { MemberWithDetailsFragment } from '@/memberships/queries'
import { asMember } from '@/memberships/types/casting'

import { Address, asBlock, Block } from '../../common/types'

type ID = string

export interface MemberRole {
  groupName: string
  createdAt?: string
  isLead: boolean
}

export interface Member {
  id: ID
  handle: string
  rootAccount: Address
  controllerAccount: Address
  name?: string
  avatar?: string
  inviteCount: number
  roles: MemberRole[]
  isVerified: boolean
  isFoundingMember: boolean
  invitedBy?: ID
  referredBy?: ID
}

type GenesisEntry = {
  type: 'genesis'
}

type InvitedEntry = {
  type: 'invited'
  block: Block
}

type PaidEntry = {
  type: 'paid'
  block: Block
}
export type MemberEntry = GenesisEntry | InvitedEntry | PaidEntry

export interface DetailedMember extends Member {
  about?: string
  entry: MemberEntry
  invitees: Member[]
}

const asMemberEntry = (entry: MemberWithDetailsFragment['entry']): MemberEntry => {
  if (entry.__typename === 'MembershipEntryPaid' && entry.membershipBoughtEvent) {
    return { type: 'paid', block: asBlock(entry.membershipBoughtEvent) }
  } else if (entry.__typename === 'MembershipEntryInvited' && entry.memberInvitedEvent) {
    return { type: 'invited', block: asBlock(entry.memberInvitedEvent) }
  }

  return { type: 'genesis' }
}

export const asMemberWithDetails = (data: MemberWithDetailsFragment): DetailedMember => {
  const entry = data.entry

  return {
    ...asMember(data),
    about: data.metadata.about ?? undefined,
    invitedBy: '',
    entry: asMemberEntry(entry),
    invitees: [],
  }
}
