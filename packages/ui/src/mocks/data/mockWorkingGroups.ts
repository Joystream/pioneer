import rawWorkingGroups from './raw/workingGroups.json'

interface RawWorkingGroupMock {
  id: string
  name: string
  workers?: number[]
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
  }

  const workingGroup = server.schema.create('WorkingGroup', groupData)

  for (const membershipId of group.workers ?? []) {
    const membership = server.schema.find('Membership', membershipId)

    server.schema.create('Worker', {
      group: workingGroup,
      membership,
    })
  }

  return workingGroup
}

export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
