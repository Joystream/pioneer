import { Address, asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'
import { WorkerFieldsFragment } from '@/working-groups/queries'
import { WorkingGroup } from '@/working-groups/types/WorkingGroup'
import { asApplication, WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

export interface Worker {
  id: string
  membership: Pick<Member, 'id' | 'controllerAccount'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  status: string
  isLeader: boolean
  rewardPerBlock: number
  earnedTotal: number
  stake: number
}

export interface WorkerWithDetails extends Worker {
  application: WorkingGroupApplication
  roleAccount: Address
  rewardAccount: Address
  stakeAccount: Address
  hiredAtBlock: Block
}

export const asWorker = (fields: WorkerFieldsFragment): Worker => ({
  id: fields.id,
  group: {
    id: fields.group.id,
    name: fields.group.name,
  },
  membership: {
    id: fields.membership.id,
    controllerAccount: fields.membership.controllerAccount
  },
  status: fields.status.__typename,
  isLeader: fields.isLead,
  rewardPerBlock: fields.rewardPerBlock,
  earnedTotal: 1000,
  stake: fields.stake,
})

export const asWorkerWithDetails = (fields: WorkerFieldsFragment): WorkerWithDetails => ({
  ...asWorker(fields),
  application: asApplication(fields.application),
  roleAccount: fields.roleAccount,
  rewardAccount: fields.rewardAccount,
  stakeAccount: fields.stakeAccount,
  hiredAtBlock: asBlock(fields.hiredAtBlock),
})
