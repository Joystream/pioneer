import BN from 'bn.js'

import { Member } from '../../memberships/types'
import { WorkerFieldsFragment, WorkingGroupFieldsFragment } from '../queries'

interface Worker {
  membership: Pick<Member, 'id'>
}

export interface WorkingGroup {
  name: string
  image?: string
  about?: string
  leader?: Pick<Member, 'id' | 'avatar'>
  workers?: Worker[]
  status?: any
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
    image: undefined,
    name: group.name,
    about: group.status?.about ?? '',
    workers: group.workers?.map(asWorker) ?? [],
  }
}
