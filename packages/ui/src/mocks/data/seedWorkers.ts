import { Worker } from '@/common/api/queries'

import rawWorkers from './raw/workers.json'

type WorkerStatus = 'active' | 'left' | 'terminated'

interface RawWorker {
  membershipId: string
  status: string
  workingGroupId: number
}

export type MockWorker = Worker & { groupId: string; memberId: string }

export const mockWorkers = rawWorkers.map((rawGroup) => ({ ...rawGroup }))

const seedWorker = ({ membershipId, workingGroupId, status }: RawWorker, server: any) => {
  return server.schema.create('Worker', {
    groupId: workingGroupId,
    membershipId: membershipId,
    status: seedWorkerStatus(status as WorkerStatus, membershipId + '_' + workingGroupId, server),
  })
}

const seedWorkerStatus = (status: WorkerStatus, id: string, server: any) => {
  switch (status) {
    case 'active':
      return server.schema.create('WorkerStatusActive', {})
    case 'left':
      return server.schema.create('WorkerStatusLeft', { workerStartedLeavingEventId: id })
    default:
      return server.schema.create('WorkerStatusTerminated', { terminatedWorkerEventId: id })
  }
}

export const seedWorkers = (server: any) => mockWorkers.map((worker) => seedWorker(worker, server))
