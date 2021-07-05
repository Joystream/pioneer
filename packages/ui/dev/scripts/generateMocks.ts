import {generateAllEvents} from './generators/generateEvents'
import {generateMembers} from './generators/generateMembers'
import {generateOpeningsAndUpcomingOpenings} from './generators/generateOpeningsAndUpcomingOpenings'
import {generateProposals} from './generators/generateProposals'
import {generateWithdrawnApplications, generateWorkers} from './generators/generateWorkers'
import {generateWorkingGroups} from './generators/generateWorkingGroups'
import {Mocks} from './generators/types'
import {saveFile} from "./helpers/saveFile";

const main = () => {
  const mocks: Mocks = {
    members: [],
    workingGroups: [],
    openings: [],
    upcomingOpenings: [],
    workers: [],
    applications: [],
    proposals: [],
  }

  mocks.members = generateMembers()
  mocks.workingGroups = generateWorkingGroups()
  Object.assign(mocks, generateOpeningsAndUpcomingOpenings(mocks))
  Object.assign(mocks, generateWorkers(mocks))
  mocks.applications = [...mocks.applications, ...generateWithdrawnApplications(mocks)]
  Object.assign(mocks, generateAllEvents(mocks))
  mocks.proposals = generateProposals(mocks)

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
