import { Worker } from '@/common/api/queries'

import rawWorkers from './raw/workers.json'

type WorkerStatus = 'active' | 'left' | 'leaving' | 'terminated'

export interface RawWorker {
  id: string
  runtimeId: number
  applicationId: string
  membershipId: number
  status: string
  groupId: string
  rewardPerBlock: number
  earnedTotal: number
  stake: number
  nextPaymentAt: string
  missingRewardAmount: number
  createdAt: string
}

export type MockWorker = Worker & { groupId: string; memberId: string; applicationId: string }

export const mockWorkers = rawWorkers.map((rawGroup) => ({ ...rawGroup }))

export const seedWorker = (worker: RawWorker, server: any) => {
  const member = server.schema.find('Membership', worker.membershipId)
  const group = server.schema.find('WorkingGroup', worker.groupId)

  return server.schema.create('Worker', {
    roleAccount: member.controllerAccount,
    stakeAccount: member.rootAccount,
    rewardAccount: member.rootAccount,
    ...worker,
    isLead: group.leaderId === worker.id,
    status: seedWorkerStatus(worker.status as WorkerStatus, worker.membershipId + '_' + worker.groupId, server),
  })
}

const seedWorkerStatus = (status: WorkerStatus, id: string, server: any) => {
  switch (status) {
    case 'active':
      return server.schema.create('WorkerStatusActive', { phantom: 0 })
    case 'left':
      return server.schema.create('WorkerStatusLeft', { phantom: 0 })
    case 'leaving':
      return server.schema.create('WorkerStatusLeaving')
    default:
      return server.schema.create('WorkerStatusTerminated', { phantom: 0 })
  }
}

export const seedWorkers = (server: any) => mockWorkers.map((worker) => seedWorker(worker, server))
