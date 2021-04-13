import { Address } from '../../common/types'
type ID = string

export type NetworkType = 'BABYLON' | 'ALEXANDRIA' | 'ROME' | 'OLYMPIA'

export interface Block {
  id: string
  block: number
  network: NetworkType
}

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

export interface DetailedMember extends Member {
  about?: string
  registeredAtBlock: Block
  registeredAtTime: 'string'
  invitees: Member[]
}
