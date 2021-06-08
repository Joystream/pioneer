import BN from 'bn.js'

import { Member } from '@/memberships/types'
import { WorkingGroupOpening } from '@/working-groups/types/WorkingGroupOpening'

import { WorkingGroupFieldsFragment } from '../queries'

interface Worker {
  membership: Pick<Member, 'id'>
}

export interface WorkingGroup {
  id: string
  name: string
  image?: string
  about?: string
  leaderId?: string
  workers?: Worker[]
  openings?: WorkingGroupOpening[]
  status?: string
  description?: string
  statusMessage?: string
  budget: BN
}

export const asWorkingGroup = (group: WorkingGroupFieldsFragment): WorkingGroup => {
  return {
    id: group.id,
    image: undefined,
    name: group.name,
    about: group.metadata?.about ?? '',
    description: group.metadata?.description ?? '',
    status: group.metadata?.status ?? '',
    statusMessage: group.metadata?.statusMessage ?? '',
    leaderId: group.leader?.membership.id,
    budget: new BN(group.budget),
  }
}

const KnownWorkingGroups = ['forum', 'storage', 'content', 'membership'] as const

export type GroupName = typeof KnownWorkingGroups[number]

export const isKnownGroupName = (name: string): name is GroupName => {
  return KnownWorkingGroups.includes(name as GroupName)
}

export const GroupRewardPeriods: Record<GroupName, BN> = {
  forum: new BN(14400 + 10),
  storage: new BN(14400 + 20),
  content: new BN(14400 + 30),
  membership: new BN(14400 + 40),
}
