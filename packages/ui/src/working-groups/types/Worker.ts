import { Address, asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'
import { WorkerFieldsFragment } from '@/working-groups/queries'
import { WorkingGroup } from '@/working-groups/types/WorkingGroup'

import { getReward } from '../model/getReward'

import { Reward } from './Reward'

export interface Worker {
  id: string
  membership: Pick<Member, 'id' | 'controllerAccount'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  status: string
  isLeader: boolean
  reward: Reward
  earnedTotal: number
  stake: number
}

export interface WorkerWithDetails extends Worker {
  applicationId: string
  openingId: string
  roleAccount: Address
  rewardAccount: Address
  stakeAccount: Address
  hiredAtBlock: Block
  unstakingPeriod: number
}

export const asWorker = (fields: WorkerFieldsFragment): Worker => ({
  id: fields.id,
  group: {
    id: fields.group.id,
    name: fields.group.name,
  },
  membership: {
    id: fields.membership.id,
    controllerAccount: fields.membership.controllerAccount,
  },
  status: fields.status.__typename,
  isLeader: fields.isLead,
  reward: getReward(fields.rewardPerBlock, fields.group.name),
  earnedTotal: 1000,
  stake: fields.stake,
})

export const asWorkerWithDetails = (fields: WorkerFieldsFragment): WorkerWithDetails => ({
  ...asWorker(fields),
  applicationId: fields.application.id,
  openingId: fields.application.opening.id,
  roleAccount: fields.roleAccount,
  rewardAccount: fields.rewardAccount,
  stakeAccount: fields.stakeAccount,
  hiredAtBlock: asBlock(fields.hiredAtBlock),
  unstakingPeriod: fields.application.opening.unstakingPeriod,
})
