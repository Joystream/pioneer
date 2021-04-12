import { WorkingGroup } from '../../working-groups/types'

import rawWorkingGroups from './raw/workingGroups.json'

export const mockWorkingGroups: WorkingGroup[] = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = async (group: WorkingGroup, server: any) => {
  const wg = await server.schema.create('WorkingGroup', group)

  const member = await server.schema.find('Membership', '1')

  await server.schema.create('Worker', {
    group: wg,
    membership: member,
  })

  return wg
}
export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
