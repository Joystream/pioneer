import BN from 'bn.js'

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
  status?: any
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
    about: group.status?.about ?? '',
    description: group.status?.description ?? '',
    statusMessage: group.status?.message ?? '',
    workers: group.workers?.map(asWorker) ?? [],
    leaderId: group.leader?.membership.id,
    budget: new BN(group.budget),
  }
}
