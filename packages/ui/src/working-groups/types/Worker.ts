import { Address, asBlock, Block } from '@/common/types'
import { asMember, Member } from '@/memberships/types'
import { WorkerDetailedFieldsFragment, WorkerFieldsFragment } from '@/working-groups/queries'
import { asWorkingGroupName, WorkingGroup } from '@/working-groups/types/WorkingGroup'

import { getReward } from '../model/getReward'

import { Reward } from './Reward'

export interface WorkerBaseInfo {
  member: Member
  applicationId: string
}

export interface Worker {
  id: string
  membership: Pick<Member, 'id' | 'controllerAccount'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  status: string
  isLeader: boolean
  reward: Reward
  owedReward: number
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
  minStake: number
}

export type WorkerStatus = 'active' | 'left' | 'terminated'
export const WorkerStatusTypename: Record<WorkerStatus, WorkerFieldsFragment['status']['__typename']> = {
  active: 'WorkerStatusActive',
  left: 'WorkerStatusLeft',
  terminated: 'WorkerStatusTerminated',
}

export const asWorkerBaseInfo = (fields: WorkerFieldsFragment): WorkerBaseInfo => ({
  member: asMember(fields.membership),
  applicationId: fields.applicationId,
})

export const asWorker = (fields: WorkerFieldsFragment): Worker => ({
  id: fields.id,
  group: {
    id: fields.group.id,
    name: asWorkingGroupName(fields.group.name),
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
  owedReward: fields.missingRewardAmount,
})

export const asWorkerWithDetails = (fields: WorkerDetailedFieldsFragment): WorkerWithDetails => ({
  ...asWorker(fields),
  applicationId: fields.application.id,
  openingId: fields.application.openingId,
  roleAccount: fields.roleAccount,
  rewardAccount: fields.rewardAccount,
  stakeAccount: fields.stakeAccount,
  minStake: fields.application.opening.stakeAmount,
  hiredAtBlock: asBlock(),
})
