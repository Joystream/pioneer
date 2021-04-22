import { Worker } from '../../common/api/queries'

import rawWorkingGroups from './raw/workingGroups.json'

type WorkerStatus = 'active' | 'left' | 'terminated'

interface WorkerMock {
  membershipId: string
  status: string
}

interface RawWorkingGroupMock {
  id: string
  name: string
  workers?: WorkerMock[]
  leaderId?: string
  status: {
    name: string
    message: string
    about: string
    description: string
  }
}

export type MockWorker = Worker & { groupId: string; memberId: string }

export const mockWorkingGroups = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = (group: RawWorkingGroupMock, server: any) => {
  const groupData = {
    ...group,
    workers: null,
    status: server.schema.create('WorkingGroupStatus', group.status),
    leaderId: null,
  }

  const workingGroup = server.schema.create('WorkingGroup', groupData)

  const memberToWorker = new Map()

  for (const { membershipId, status } of group.workers ?? []) {
    const membership = server.schema.find('Membership', membershipId)

    const worker = server.schema.create('Worker', {
      group: workingGroup,
      membership,
      status: seedWorkerStatus(status as WorkerStatus, server),
    })

    memberToWorker.set(membershipId, worker.id)
  }

  if (group.leaderId) {
    workingGroup.leaderId = memberToWorker.get(group.leaderId)
    workingGroup.save()
  }

  return workingGroup
}

const seedWorkerStatus = (status: WorkerStatus, server: any) => {
  switch (status) {
    case 'active':
      return server.schema.create('WorkerStatusActive', {})
    case 'left':
      return server.schema.create('WorkerStatusLeft', {})
    default:
      return server.schema.create('WorkerStatusTerminated', {})
  }
}

export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
