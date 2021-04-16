import BN from 'bn.js'

import { Member } from '../../memberships/types'

import { WorkingGroupOpening } from './WorkingGroupOpening'

export interface WorkingGroupApplication {
  id: string
  opening: WorkingGroupOpening
  applicant: Member
  roleAccount?: string
  rewardAccount?: string
  stakingAccount?: string
  answers?: [any]
  status?: any
  createdAtBlock?: BN
  createdAtTime?: string
}
