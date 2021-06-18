import { Address, Block } from '../../common/types'

type ID = string

export interface MemberRole {
  groupName: string
  createdAt?: string
  isLeader: boolean
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

export interface DetailedMember extends Member {
  about?: string
  registeredAtBlock: Block
  invitees: Member[]
}
