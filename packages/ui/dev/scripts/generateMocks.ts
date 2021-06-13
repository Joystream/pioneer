import fs from 'fs'
import path from 'path'

import { generateAllEvents } from './generators/generateEvents'
import { generateMembers } from './generators/generateMembers'
import { generateOpeningsAndUpcomingOpenings } from './generators/generateOpeningsAndUpcomingOpenings'
import { generateProposals } from './generators/generateProposals'
import { generateWorkers } from './generators/generateWorkers'
import { generateWorkingGroups } from './generators/generateWorkingGroups'
import { Mocks } from './generators/types'

const saveFile = (name: string, contents: any) => {
  const pathName = path.join(__dirname, '..', '..', 'src', 'mocks', 'data', 'raw', name + '.json')
  fs.writeFileSync(pathName, JSON.stringify(contents, null, 2) + '\n')
}

const main = () => {
  const mocks: Mocks = {
    members: [],
    workingGroups: [],
    openings: [],
    upcomingOpenings: [],
    workers: [],
    proposals: [],
  }

  mocks.members = generateMembers()
  mocks.workingGroups = generateWorkingGroups()
  Object.assign(mocks, generateOpeningsAndUpcomingOpenings(mocks))
  Object.assign(mocks, generateWorkers(mocks))
  Object.assign(mocks, generateAllEvents(mocks))
  mocks.proposals = generateProposals(mocks)

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
