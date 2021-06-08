import fs from 'fs'
import path from 'path'

import { generateAllEvents } from './generators/generateEvents'
import { generateMembers } from './generators/generateMembers'
import { generateOpeningsAndApplications } from './generators/generateOpeningsAndApplications'
import { generateWorkers } from './generators/generateWorkers'
import { generateWorkingGroups } from './generators/generateWorkingGroups'

const saveFile = (name: string, contents: any) => {
  const pathName = path.join(__dirname, '..', '..', 'src', 'mocks', 'data', 'raw', name + '.json')
  fs.writeFileSync(pathName, JSON.stringify(contents, null, 2))
}

const main = () => {
  const mocks = {
    members: generateMembers(),
    workingGroups: generateWorkingGroups(),
    workers: generateWorkers(),
    ...generateOpeningsAndApplications(),
    ...generateAllEvents(),
  }

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
