import { WorkingGroupMock } from '../../../dev/query-node-mocks/generators/generateWorkingGroups'

import rawWorkingGroups from './raw/workingGroups.json'

export const mockWorkingGroups = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = (group: WorkingGroupMock, server: any) => {
  const groupData = {
    ...group,
    workers: null,
    leaderId: null,
    metadata: server.schema.create('WorkingGroupMetadata', group.metadata),
  }

  return server.schema.create('WorkingGroup', groupData)
}

const updateWorkingGroup = (data: WorkingGroupMock, server: any) => {
  const leaderId = data.leadId
  const group = server.schema.find('WorkingGroup', data.id)

  return group.update({ leaderId })
}

export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
export const updateWorkingGroups = (server: any) => mockWorkingGroups.map((group) => updateWorkingGroup(group, server))
