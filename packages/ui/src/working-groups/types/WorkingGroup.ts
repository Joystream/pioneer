import BN from 'bn.js'

import { BaseMember } from '../../memberships/types'
import { WorkerFieldsFragment, WorkingGroupFieldsFragment } from '../queries'

interface Worker {
  membership: Pick<BaseMember, 'id'>
}

export interface WorkingGroup {
  id: string
  name: string
  image?: string
  about?: string
  leader?: Pick<BaseMember, 'id' | 'avatarUri'>
  workers?: Worker[]
  status?: any
  description?: string
  statusMessage?: string
}

export interface WorkingGroupOpening {
  id: string
  duration: [number, string]
  title: string
  type: 'LEADER' | 'REGULAR'
  reward: {
    value: BN
    interval: number
  }
  applicants: {
    current: number
    total: number
  }
  hiring: {
    current: number
    total: number
  }
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
    about: group.status?.about ?? '',
    description: group.status?.description ?? '',
    statusMessage: group.status?.message ?? '',
    workers: group.workers?.map(asWorker) ?? [],
  }
}
