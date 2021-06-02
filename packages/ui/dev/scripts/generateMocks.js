const fs = require('fs')
const path = require('path')

const { generateBlocks } = require('./generators/generateBlocks')
const { generateAllEvents } = require('./generators/generateEvents')
const { generateMembers } = require('./generators/generateMembers')
const { generateOpeningsAndApplications } = require('./generators/generateOpeningsAndApplications')
const { generateWorkers } = require('./generators/generateWorkers')
const { generateWorkingGroups } = require('./generators/generateWorkingGroups')

const saveFile = (name, contents) => {
  const pathName = path.join(__dirname, '..', '..', 'src', 'mocks', 'data', 'raw', name + '.json')
  fs.writeFileSync(pathName, JSON.stringify(contents, null, 2))
}

const main = () => {
  const mocks = {
    members: generateMembers(),
    blocks: generateBlocks(),
    workingGroups: generateWorkingGroups(),
    workers: generateWorkers(),
    ...generateOpeningsAndApplications(),
    ...generateAllEvents(),
  }

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
