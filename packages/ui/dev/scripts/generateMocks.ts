import yargs from 'yargs'

import { eventsModule } from './generateEventMocks'
import { generateAllEvents } from './generators/generateEvents'
import { generateMembers } from './generators/generateMembers'
import { generateOpeningsAndUpcomingOpenings } from './generators/generateOpeningsAndUpcomingOpenings'
import { generateProposals } from './generators/generateProposals'
import { generateWithdrawnApplications, generateWorkers } from './generators/generateWorkers'
import { generateWorkingGroups } from './generators/generateWorkingGroups'
import { Mocks } from './generators/types'
import { saveFile } from './helpers/saveFile'

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

const allModule = {
  command: 'all',
  describe: 'Generate all mocks',
  handler: main,
}

yargs(process.argv.slice(2))
  .usage('yarn node-mocks [<command>]')
  .scriptName('')
  .command(allModule)
  .command(eventsModule)
  .demandCommand().argv
