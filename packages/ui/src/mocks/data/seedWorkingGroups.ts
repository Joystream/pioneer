import rawWorkingGroups from './raw/workingGroups.json'

interface RawWorkingGroupMock {
  id: string
  name: string
  leaderId?: string | null
  metadata: {
    name: string
    message: string
    about: string
    description: string
    status: string
    statusMessage: string
  }
}

export const mockWorkingGroups = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = (group: RawWorkingGroupMock, server: any) => {
  const groupData = {
    ...group,
    workers: null,
    metadata: server.schema.create('WorkingGroupMetadata', group.metadata),
  }

  return server.schema.create('WorkingGroup', groupData)
}

export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
