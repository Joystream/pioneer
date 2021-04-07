import { WorkingGroup } from '../../working-groups/types'

import rawWorkingGroups from './raw/workingGroups.json'

export const mockWorkingGroups: WorkingGroup[] = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = (group: WorkingGroup, server: any) => server.schema.create('WorkingGroup', group)
export const seedWorkingGroups = (server: any) => mockWorkingGroups.map((group) => seedWorkingGroup(group, server))
