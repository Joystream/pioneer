import { Worker } from '@/common/api/queries'

import rawWorkers from './raw/workers.json'

type WorkerStatus = 'active' | 'left' | 'terminated'

export interface RawWorker {
  id: string
  applicationId: number
  membershipId: number
  status: string
  groupId: number
  rewardPerBlock: number
  earnedTotal: number
  stake: number
  nextPaymentAt: string
  missingRewardAmount: number
}

export type MockWorker = Worker & { groupId: string; memberId: string; applicationId: string }

export const mockWorkers = rawWorkers.map((rawGroup) => ({ ...rawGroup }))

export const seedWorker = (worker: RawWorker, server: any) => {
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
      return server.schema.create('WorkerStatusActive', { phantom: 0 })
    case 'left':
      return server.schema.create('WorkerStatusLeft', { phantom: 0 })
    default:
      return server.schema.create('WorkerStatusTerminated', { phantom: 0 })
  }
}

export const seedWorkers = (server: any) => mockWorkers.map((worker) => seedWorker(worker, server))
