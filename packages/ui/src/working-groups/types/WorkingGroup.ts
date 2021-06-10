import BN from 'bn.js'

import { WorkingGroupFieldsFragment } from '../queries'

export interface WorkingGroup {
  id: string
  name: string
  image?: string
  about?: string
  leaderId?: string
  workerIds?: string[]
  status?: string
  description?: string
  statusMessage?: string
  budget: BN
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
    workerIds: group.workers.map((w) => w.id) ?? [],
    leaderId: group.leader?.membership.id,
    budget: new BN(group.budget),
  }
}

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
