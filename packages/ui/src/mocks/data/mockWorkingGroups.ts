import { WorkingGroup } from '../../common/types'
import rawWorkingGroups from './raw/workingGroups.json'

export const mockWorkingGropus: WorkingGroup[] = rawWorkingGroups.map((rawGroup) => ({ ...rawGroup }))

const seedWorkingGroup = (group: WorkingGroup, server: any) => server.schema.create('WorkingGroup', group)
export const seedWorkingGroups = (server: any) => mockWorkingGropus.map((group) => seedWorkingGroup(group, server))
