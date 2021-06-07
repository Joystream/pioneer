import BN from 'bn.js'

import { getTypeFilter } from '@/working-groups/hooks/useOpenings'
import { getWorkersFilter } from '@/working-groups/hooks/useWorkers'
import { asWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types/WorkingGroupOpening'

import { Member } from '../../memberships/types'
import { WorkerFieldsFragment, WorkingGroupFieldsFragment } from '../queries'

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

type WorkerFields = { __typename: 'Worker' } & WorkerFieldsFragment

const asWorker = (worker: WorkerFields) => ({
  membership: worker.membership,
})

export const asWorkingGroup = (group: WorkingGroupFieldsFragment): WorkingGroup => {
  return {
    id: group.id,
    image: undefined,
    name: group.name,
    about: group.metadata?.about ?? '',
    description: group.metadata?.description ?? '',
    status: group.metadata?.status ?? '',
    statusMessage: group.metadata?.statusMessage ?? '',
    workers: group.workers?.filter(getWorkersFilter(['active'])).map(asWorker) ?? [],
    openings: group.openings?.map(asWorkingGroupOpening).filter(getTypeFilter('open')) ?? [],
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
