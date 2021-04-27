import { Address } from '../../common/types'

type ID = string

export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'OLYMPIA'

export interface Block {
  id: string
  block: number
  network: NetworkType
}

type MemberRole = 'SL' | 'SP' | 'FL'

type MemberItemType = 'Membership' | 'Members'

interface MemberCommon {
  type?: MemberItemType
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

export interface Membership extends MemberCommon {
  type?: 'Membership'
}

export interface MMember extends MemberCommon {
  type: 'Members'
  isConcilMember: boolean
  totalBalanced: number
  totalStacked: number
}

export type Member = Membership | MMember
export type Members = Membership[] | MMember[]

export interface DetailedMember extends Membership {
  about?: string
  registeredAtBlock: Block
  registeredAtTime: 'string'
  invitees: Member[]
}
