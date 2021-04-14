import BN from 'bn.js'

import { Member } from '../../memberships/types'
import { WorkerFieldsFragment, WorkingGroupFieldsFragment, WorkingGroupOpeningFieldsFragment } from '../queries'

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
  status?: any
  description?: string
  statusMessage?: string
}

type WorkingGroupOpeningType = 'LEADER' | 'REGULAR'

export interface WorkingGroupOpening {
  id: string
  duration: [number, string]
  title: string
  type: WorkingGroupOpeningType
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

export const asWorkingGroupOpening = (fields: WorkingGroupOpeningFieldsFragment): WorkingGroupOpening => ({
  id: fields.id,
  applicants: {
    current: 0,
    total: fields.applications?.length || 0,
  },
  type: fields.type as WorkingGroupOpeningType,
  reward: fields.rewardPerBlock,
  duration: fields.metadata.expectedEnding,
  hiring: {
    current: 0,
    total: fields.metadata.hiringLimit,
  },
  title: fields.metadata.shortDescription,
})

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
    leaderId: group.leader?.membership.id,
  }
}
