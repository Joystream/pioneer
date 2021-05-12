import { Member } from '@/memberships/types'
import { WorkingGroup } from '@/working-groups/types/WorkingGroup'
import { WorkerFieldsFragment } from '@/working-groups/queries'

export interface Worker {
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
}

export const asWorker = (fields: WorkerFieldsFragment): Worker => ({
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
})
