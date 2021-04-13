import { WorkingGroup } from '../../working-groups/types'

import rawWorkingGroups from './raw/workingGroups.json'

export const mockWorkingGroups: WorkingGroup[] = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = (group: WorkingGroup, server: any) => {
  const wg = server.schema.create('WorkingGroup', group)

  server.schema.create('Worker', {
    group: wg,
    membership: server.schema.find('Membership', 0),
  })

  return wg
}

export const seedWorkingGroups = (server: any) =>
  mockWorkingGroups.map((group) => {
    return seedWorkingGroup(group, server)
  })
