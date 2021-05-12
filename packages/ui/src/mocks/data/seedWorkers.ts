import { Worker } from '@/common/api/queries'

import rawWorkers from './raw/workers.json'

type WorkerStatus = 'active' | 'left' | 'terminated'

interface RawWorker {
  membershipId: string
  status: string
  workingGroupId: number
  rewardPerBlock: number
  earnedTotal: number
  stake: number
  nextPaymentAt: string
}

export type MockWorker = Worker & { groupId: string; memberId: string }

export const mockWorkers = rawWorkers.map((rawGroup) => ({ ...rawGroup }))

const seedWorker = (worker: RawWorker, server: any) => {
  return server.schema.create('Worker', {
    rewardPerBlock: worker.rewardPerBlock,
    earnedTotal: worker.earnedTotal,
    stake: worker.stake,
    nextPaymentAt: worker.nextPaymentAt,
    groupId: worker.workingGroupId,
    membershipId: worker.membershipId,
    status: seedWorkerStatus(worker.status as WorkerStatus, worker.membershipId + '_' + worker.workingGroupId, server),
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
