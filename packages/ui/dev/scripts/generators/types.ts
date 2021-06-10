import { Member } from './generateMembers'
import { Worker } from './generateWorkers'
import { WorkingGroup } from './generateWorkingGroups'

export interface Mocks {
  members: Member[]
  workingGroups: WorkingGroup[]
  workers: Worker[]
}
