import faker from 'faker'

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

export const seedWorker = (rawWorker: RawWorker, server: any) => {
  const member = server.schema.find('Membership', rawWorker.membershipId)
  const group = server.schema.find('WorkingGroup', rawWorker.groupId)

  const worker = server.schema.create('Worker', {
    roleAccount: member.controllerAccount,
    stakeAccount: member.rootAccount,
    rewardAccount: member.rootAccount,
    ...rawWorker,
    status: null,
    isLead: group.leaderId === rawWorker.id,
  })
  worker.update({ status: seedWorkerStatus(worker, rawWorker.status as WorkerStatus, server) })
}

const seedWorkerStatus = (worker: any, status: WorkerStatus, server: any) => {
  switch (status) {
    case 'active':
      return server.schema.create('WorkerStatusActive', { phantom: 0 })
    case 'left':
      return server.schema.create('WorkerStatusLeft', { phantom: 0 })
    case 'leaving':
      return server.schema.create('WorkerStatusLeaving', {
        workerStartedLeavingEvent: server.schema.create('WorkerStartedLeavingEvent', {
          createdAt: faker.date.recent(1),
          group: worker.group,
          worker: worker,
        }),
      })
    default:
      return server.schema.create('WorkerStatusTerminated', { phantom: 0 })
  }
}

export const seedWorkers = (server: any) => mockWorkers.map((worker) => seedWorker(worker, server))
