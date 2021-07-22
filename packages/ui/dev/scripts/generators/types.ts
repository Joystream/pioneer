import { MemberMock } from './generateMembers'
import { OpeningMock, UpcomingOpeningMock } from './generateOpeningsAndUpcomingOpenings'
import { ProposalMock } from './generateProposals'
import { ApplicationMock, WorkerMock } from './generateWorkers'
import { WorkingGroupMock } from './generateWorkingGroups'

export interface Mocks {
  members: MemberMock[]
  workingGroups: WorkingGroupMock[]
  openings: OpeningMock[]
  upcomingOpenings: UpcomingOpeningMock[]
  workers: WorkerMock[]
  applications: ApplicationMock[]
  proposals: ProposalMock[]
}
