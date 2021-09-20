import { Address, Block } from '../../common/types'

type ID = string

export interface MemberRole {
  id: string
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
  createdAt: string
}

export type GenesisEntry = {
  type: 'genesis'
}

export type InvitedEntry = {
  type: 'invited'
  block: Block
}

export type PaidEntry = {
  type: 'paid'
  block: Block
}

export type MemberEntry = GenesisEntry | InvitedEntry | PaidEntry
// Temporary fix for: https://github.com/Joystream/pioneer/issues/1493
export type InvitedMember = Member // & { entry: InvitedEntry }

export interface MemberWithDetails extends Member {
  about?: string
  entry: MemberEntry
  invitees: InvitedMember[]
}
