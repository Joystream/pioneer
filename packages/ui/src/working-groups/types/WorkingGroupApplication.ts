import { asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'

import { getReward } from '../model/getReward'
import { WorkingGroupApplicationFieldsFragment } from '../queries'

import { Reward } from './Reward'
import { asWorkingGroupName } from './WorkingGroup'

export interface WorkingGroupApplication {
  id: string
  runtimeId: number
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

export const asApplication = (fields: WorkingGroupApplicationFieldsFragment): WorkingGroupApplication => ({
  id: fields.id,
  runtimeId: fields.runtimeId,
  opening: {
    id: fields.opening.id,
    type: fields.opening.type,
    groupName: asWorkingGroupName(fields.opening.group.name),
    reward: getReward(fields.opening.rewardPerBlock, fields.opening.group.name),
  },
  status: fields.status.__typename,
  stakingAccount: fields.stakingAccount,
  createdAtBlock: asBlock(fields.createdInEvent),
})
