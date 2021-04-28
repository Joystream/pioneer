import { Address, Block } from '../../common/types'

type ID = string

type MemberRole = 'SL' | 'SP' | 'FL'

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

export interface Membership extends Member {
  kind?: 'MyMember'
}

export interface OtherMember extends Member {
  kind: 'Member'
  isConcilMember?: boolean
  totalBalance?: number
  totalStacked?: number
}

export interface DetailedMember extends Member {
  about?: string
  registeredAtBlock: Block
  registeredAtTime: 'string'
  invitees: Member[]
}
