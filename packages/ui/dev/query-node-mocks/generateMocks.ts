import yargs from 'yargs'

import { eventsModule } from './generateEventMocks'
import { forumModule, generateForum } from './generators/forum/generateForumMocks'
import { bountyModule, generateBounties } from './generators/generateBounties'
import { councilModule, generateCouncils } from './generators/generateCouncils'
import { generateAllEvents } from './generators/generateEvents'
import { generateMembers } from './generators/generateMembers'
import { generateOpeningsAndUpcomingOpenings } from './generators/generateOpeningsAndUpcomingOpenings'
import { generateProposals, proposalsModule } from './generators/generateProposals'
import { generateWithdrawnApplications, generateWorkers } from './generators/generateWorkers'
import { generateWorkingGroups, getWorkingGroupsWithLead } from './generators/generateWorkingGroups'
import { saveFile } from './helpers/saveFile'

const generateAll = () => {
  const mocks: any = {
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
  mocks.workingGroups = getWorkingGroupsWithLead(mocks)
  mocks.applications = [...mocks.applications, ...generateWithdrawnApplications(mocks)]
  Object.assign(mocks, generateAllEvents(mocks))
  mocks.proposals = generateProposals(mocks)
  Object.assign(mocks, generateCouncils(mocks))
  Object.assign(mocks, generateForum(mocks))
  Object.assign(mocks, generateBounties(mocks))

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

const membersModule = {
  command: 'members',
  describe: 'Generate members',
  handler: () => saveFile('members', generateMembers()),
}

const allModule = {
  command: 'all',
  describe: 'Generate all mocks',
  handler: generateAll,
}

yargs(process.argv.slice(2))
  .usage('yarn query-node-mocks [<command>]')
  .scriptName('')
  .command(allModule)
  .command(membersModule)
  .command(eventsModule)
  .command(proposalsModule)
  .command(forumModule)
  .command(councilModule)
  .command(bountyModule)
  .demandCommand().argv
