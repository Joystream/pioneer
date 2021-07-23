import BN from 'bn.js'

import { getAverageStake } from '@/working-groups/model/getAverageStake'

import { WorkingGroupDetailedFieldsFragment, WorkingGroupFieldsFragment } from '../queries'

export interface WorkingGroup {
  id: string
  name: string
  image?: string
  about?: string
  leadId?: string
  status?: string
  description?: string
  statusMessage?: string
  budget: BN
  averageStake: BN
}

export interface DetailedWorkingGroup extends WorkingGroup {
  leadWorker?: {
    id: string
    runtimeId: number
    stake: BN
  }
}

export const asWorkingGroup = (group: WorkingGroupFieldsFragment): WorkingGroup => {
  return {
    id: group.id,
    image: undefined,
    name: asWorkingGroupName(group.name),
    about: group.metadata?.about ?? '',
    description: group.metadata?.description ?? '',
    status: group.metadata?.status ?? '',
    statusMessage: group.metadata?.statusMessage ?? '',
    budget: new BN(group.budget),
    averageStake: getAverageStake(group.workers),
    leadId: group.leader?.membershipId,
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
        },
      }
    : {}),
})

const KnownWorkingGroups = ['forum', 'storage', 'content directory', 'membership'] as const

export const asWorkingGroupName = (name: string) => {
  return name
    .replace('WorkingGroup', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
}

export type GroupName = typeof KnownWorkingGroups[number]

export const isKnownGroupName = (name: string): name is GroupName => {
  return KnownWorkingGroups.includes(name as GroupName)
}

export const GroupRewardPeriods: Record<GroupName, BN> = {
  forum: new BN(14400 + 10),
  storage: new BN(14400 + 20),
  'content directory': new BN(14400 + 30),
  membership: new BN(14400 + 40),
}
