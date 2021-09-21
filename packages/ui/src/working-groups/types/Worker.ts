import { Address, asBlock, Block } from '@/common/types'
import { asMember, Member } from '@/memberships/types'
import { PastWorkerFieldsFragment, WorkerDetailedFieldsFragment, WorkerFieldsFragment } from '@/working-groups/queries'
import { asWorkingGroupName, WorkingGroup } from '@/working-groups/types/WorkingGroup'

import { getReward } from '../model/getReward'

import { Reward } from './Reward'

export interface WorkerBaseInfo {
  member: Member
  applicationId: string
}

export interface Worker {
  id: string
  runtimeId: number
  membership: Pick<Member, 'id' | 'controllerAccount'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  status: WorkerStatusTypename
  isLead: boolean
  reward: Reward
  owedReward: number
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

export interface PastWorker {
  id: string
  member: Member
  dateStarted: Block
  dateFinished: Block
}

export type WorkerStatus = 'active' | 'left' | 'leaving' | 'terminated'
export type WorkerStatusTypename = WorkerDetailedFieldsFragment['status']['__typename']
export const WorkerStatusToTypename: Record<WorkerStatus, WorkerFieldsFragment['status']['__typename']> = {
  active: 'WorkerStatusActive',
  left: 'WorkerStatusLeft',
  leaving: 'WorkerStatusLeaving',
  terminated: 'WorkerStatusTerminated',
}

export const asWorkerBaseInfo = (fields: WorkerFieldsFragment): WorkerBaseInfo => ({
  member: asMember(fields.membership),
  applicationId: fields.applicationId,
})

export const asWorker = (fields: WorkerFieldsFragment): Worker => ({
  id: fields.id,
  runtimeId: fields.runtimeId,
  group: {
    id: fields.group.id,
    name: asWorkingGroupName(fields.group.name),
  },
  membership: {
    id: fields.membership.id,
    controllerAccount: fields.membership.controllerAccount,
  },
  status: fields.status.__typename,
  isLead: fields.isLead,
  reward: getReward(fields.rewardPerBlock, fields.group.name),
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
  hiredAtBlock: asBlock(fields.entry),
})

export const asPastWorker = (fields: PastWorkerFieldsFragment): PastWorker => {
  let dateFinished: Block = asBlock(fields.entry)

  if (fields.status.__typename === 'WorkerStatusLeft' && fields.status.workerExitedEvent) {
    dateFinished = asBlock(fields.status.workerExitedEvent)
  }
  if (fields.status.__typename === 'WorkerStatusTerminated' && fields.status.terminatedWorkerEvent) {
    dateFinished = asBlock(fields.status.terminatedWorkerEvent)
  }

  return {
    id: fields.id,
    member: asMember(fields.membership),
    dateStarted: asBlock(fields.entry),
    dateFinished,
  }
}
