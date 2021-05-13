import { Address, Block } from '../../common/types'
import { WorkerWithDetails } from '@/working-groups/types'

type ID = string

export interface Member {
  id: ID
  handle: string
  rootAccount: Address
  controllerAccount: Address
  name?: string
  avatar?: string
  inviteCount: number
  roles: WorkerWithDetails[]
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
