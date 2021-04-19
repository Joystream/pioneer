import BN from 'bn.js'

import { Member } from '../../memberships/types'

export interface WorkingGroupApplication {
  id: string
  opening: {
    type: string
    groupName: string
  }
  applicant?: Member
  roleAccount?: string
  rewardAccount?: string
  stakingAccount?: string
  answers?: [any]
  status?: any
  createdAtBlock?: BN
  createdAtTime?: string
}
