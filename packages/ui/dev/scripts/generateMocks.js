const fs = require('fs')
const path = require('path')

const { generateBlocks } = require('./generators/generateBlocks')
const { generateMembers } = require('./generators/generateMembers')
const { generateWorkingGroups } = require('./generators/generateWorkingGroups')
const { generateWorkers } = require('./generators/generateWorkers')
const { generateOpeningsAndApplications } = require('./generators/generateOpeningsAndApplications')

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
  }

  Object.entries(mocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
