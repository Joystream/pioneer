import fs from 'fs'
import path from 'path'

import { generateAllEvents } from './generators/generateEvents'
import { generateMembers } from './generators/generateMembers'
import { generateOpeningsAndApplications } from './generators/generateOpeningsAndApplications'
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
    workers: [],
  }

  mocks.members = generateMembers()
  mocks.workingGroups = generateWorkingGroups()
  mocks.workers = generateWorkers(mocks)

  Object.assign(mocks, generateOpeningsAndApplications(mocks))
  Object.assign(mocks, generateAllEvents(mocks))

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
