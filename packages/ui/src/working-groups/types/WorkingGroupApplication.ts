import BN from 'bn.js'

import { asBlock, Block } from '../../common/types'
import { Member } from '../../memberships/types'
import { WorkingGroupApplicationFieldsFragment } from '../queries'

export interface WorkingGroupApplication {
  id: string
  opening: {
    type: string
    groupName: string
    reward: BN
  }
  applicant?: Member
  roleAccount?: string
  rewardAccount?: string
  stakingAccount: string
  answers?: [any]
  status?: string
  createdAtBlock: Block
  createdAt: string
}

export const asApplication = (application: WorkingGroupApplicationFieldsFragment) => ({
  id: application.id,
  opening: {
    type: application.opening.type,
    groupName: application.opening.group.name,
    reward: new BN(application.opening.rewardPerBlock),
  },
  status: application.status.__typename,
  stakingAccount: application.stakingAccount,
  createdAtBlock: asBlock(application.createdAtBlock),
  createdAt: application.createdAt,
})
