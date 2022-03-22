import { Worker, WorkerStatus } from '@/common/api/queries'
import { seedRandomBlockFields } from '@/mocks/data/seedRandomBlockFields'

import { seedOverridableEntities } from '../helpers/seedEntities'

import rawWorkers from './raw/workers.json'
import { TerminatedEvent, WorkerLeavingEvent } from './seedEvents'

type WorkerStatusEvent = WorkerLeavingEvent | TerminatedEvent
export type WorkerStatusType = WorkerStatus['__typename']
interface WorkerStatusData {
  type: string
  event?: WorkerStatusEvent
}

export interface RawWorker {
  id: string
  runtimeId: number
  applicationId: string
  membershipId: number
  status: WorkerStatusData
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
  const activeStatus: WorkerStatusType[] = ['WorkerStatusActive', 'WorkerStatusLeaving']

  const worker = server.schema.create('Worker', {
    roleAccount: member.controllerAccount,
    stakeAccount: member.rootAccount,
    rewardAccount: member.rootAccount,
    ...rawWorker,
    status: null,
    isActive: activeStatus.includes(rawWorker.status.type as WorkerStatusType),
    isLead: group.leaderId === rawWorker.id,
    entry: server.schema.create('OpeningFilledEvent', {
      openingId: group.openings.models[0].id,
      ...seedRandomBlockFields(),
      groupId: rawWorker.groupId,
    }),
  })
  worker.update({
    status: seedWorkerStatus(rawWorker.status, server),
    updatedAt: rawWorker.status.event?.createdAt ?? rawWorker.createdAt,
  })
}

const seedWorkerStatus = (status: WorkerStatusData, server: any) => {
  switch (status.type as WorkerStatusType) {
    case 'WorkerStatusActive':
      return server.schema.create('WorkerStatusActive', { phantom: 0 })
    case 'WorkerStatusLeft':
      return server.schema.create('WorkerStatusLeft', {
        workerExitedEvent: server.schema.create('WorkerExitedEvent', status.event),
      })
    case 'WorkerStatusLeaving':
      return server.schema.create('WorkerStatusLeaving', {
        workerStartedLeavingEvent: server.schema.create('WorkerStartedLeavingEvent', status.event),
      })
    default:
      return server.schema.create('WorkerStatusTerminated', {
        terminatedWorkerEvent: server.schema.create('TerminatedWorkerEvent', status.event),
      })
  }
}

export const seedWorkers = seedOverridableEntities(mockWorkers, seedWorker)
