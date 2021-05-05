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
    workers: group.workers?.map(asWorker) ?? [],
    leaderId: group.leader?.membership.id,
    budget: new BN(group.budget),
  }
}
