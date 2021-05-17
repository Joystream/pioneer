import { Address, asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'
import { WorkerFieldsFragment } from '@/working-groups/queries'
import { WorkingGroup } from '@/working-groups/types/WorkingGroup'

export interface Worker {
  id: string
  membership: Pick<Member, 'id'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  status: string
}

export interface WorkerWithDetails extends Worker {
  membership: Pick<Member, 'id'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  isLeader: boolean
  rewardPerBlock: number
  earnedTotal: number
  stake: number
  status: string
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
  },
  status: fields.status.__typename,
})

export const asWorkerWithDetails = (fields: WorkerFieldsFragment): WorkerWithDetails => ({
  ...asWorker(fields),
  rewardPerBlock: fields.rewardPerBlock,
  earnedTotal: 1000,
  stake: fields.stake,
  isLeader: fields.isLead,
  roleAccount: fields.roleAccount,
  rewardAccount: fields.rewardAccount,
  stakeAccount: fields.stakeAccount,
  hiredAtBlock: asBlock(fields.hiredAtBlock),
})
