import rawWorkingGroups from './raw/workingGroups.json'

interface RawWorkingGroupMock {
  id: string
  name: string
  workers?: string[]
  leaderId?: string
  status: {
    name: string
    message: string
    about: string
    description: string
  }
}

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

  for (const membershipId of group.workers ?? []) {
    const membership = server.schema.find('Membership', membershipId)

    const worker = server.schema.create('Worker', {
      group: workingGroup,
      membership,
    })

    memberToWorker.set(membershipId, worker.id)
  }

  if (group.leaderId) {
    workingGroup.leaderId = memberToWorker.get(group.leaderId)
    workingGroup.save()
  }

  return workingGroup
}

export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
