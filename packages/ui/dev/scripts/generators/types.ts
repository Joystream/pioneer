import { Member } from './generateMembers'
import { Opening, UpcomingOpening } from './generateOpeningsAndUpcomingOpenings'
import { Worker } from './generateWorkers'
import { WorkingGroup } from './generateWorkingGroups'

export interface Mocks {
  members: Member[]
  workingGroups: WorkingGroup[]
  openings: Opening[]
  upcomingOpenings: UpcomingOpening[]
  workers: Worker[]
}
