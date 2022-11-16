import BN from 'bn.js'

import { GroupIdToGroupParam } from '@/working-groups/constants'
import { getAverageStake } from '@/working-groups/model/getAverageStake'

import { WorkingGroupDetailedFieldsFragment, WorkingGroupFieldsFragment } from '../queries'

export type GroupIdName = keyof typeof GroupIdToGroupParam

export interface WorkingGroup {
  id: GroupIdName
  name: string
  image?: string
  about?: string
  leadId?: string
  status?: string
  description?: string
  statusMessage?: string
  budget?: BN
  averageStake?: BN
  isActive?: boolean
}

export interface DetailedWorkingGroup extends WorkingGroup {
  leadWorker?: {
    id: string
    runtimeId: number
    stake: BN
    rewardPerBlock: BN
  }
}

export const asWorkingGroup = (group: WorkingGroupFieldsFragment): WorkingGroup => {
  return {
    id: group.id as GroupIdName,
    image: undefined,
    name: asWorkingGroupName(group.name),
    about: group.metadata?.about ?? '',
    description: group.metadata?.description ?? '',
    status: group.metadata?.status ?? '',
    statusMessage: group.metadata?.statusMessage ?? '',
    budget: new BN(group.budget),
    averageStake: getAverageStake(group.workers),
    leadId: group.leader?.membershipId,
    isActive: group.leader?.isActive ?? false,
  }
}

export const asDetailedWorkingGroup = (group: WorkingGroupDetailedFieldsFragment): DetailedWorkingGroup => ({
  ...asWorkingGroup(group),
  ...(group.leader
    ? {
        leadWorker: {
          id: group.leader.id,
          runtimeId: group.leader.runtimeId,
          stake: new BN(group.leader.stake),
          rewardPerBlock: new BN(group.leader.rewardPerBlock),
        },
      }
    : {}),
})

export const asWorkingGroupName = (name: string) =>
  name
    .replace('WorkingGroup', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^[a-z]/, (match) => match.toUpperCase())
