import { Worker } from '@/common/api/queries'

import rawWorkers from './raw/workers.json'

type WorkerStatus = 'active' | 'left' | 'terminated'

interface RawWorker {
  membershipId: string
  status: string
  groupId: number
  rewardPerBlock: number
  earnedTotal: number
  stake: number
  nextPaymentAt: string
}

export type MockWorker = Worker & { groupId: string; memberId: string }

export const mockWorkers = rawWorkers.map((rawGroup) => ({ ...rawGroup }))

const seedWorker = (worker: RawWorker, server: any) => {
  const member = server.schema.find('Membership', worker.membershipId)
  return server.schema.create('Worker', {
    roleAccount: member.controllerAccount,
    stakeAccount: member.rootAccount,
    rewardAccount: member.rootAccount,
    ...worker,
    isLead: false,
    status: seedWorkerStatus(worker.status as WorkerStatus, worker.membershipId + '_' + worker.groupId, server),
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
