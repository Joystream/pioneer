import { asBlock, Block } from '../../common/types'
import { Member } from '../../memberships/types'
import { getReward } from '../model/getReward'
import { WorkingGroupApplicationFieldsFragment } from '../queries'

import { Reward } from './Reward'

export interface WorkingGroupApplication {
  id: string
  opening: {
    id: string
    type: string
    groupName: string
    reward: Reward
  }
  applicant?: Member
  roleAccount?: string
  rewardAccount?: string
  stakingAccount: string
  answers?: [any]
  status?: string
  createdAtBlock: Block
}

export const asApplication = (application: WorkingGroupApplicationFieldsFragment) => ({
  id: application.id,
  opening: {
    id: application.opening.id,
    type: application.opening.type,
    groupName: application.opening.group.name,
    reward: getReward(application.opening.rewardPerBlock, application.opening.group.name),
  },
  status: application.status.__typename,
  stakingAccount: application.stakingAccount,
  createdAtBlock: asBlock(),
})
