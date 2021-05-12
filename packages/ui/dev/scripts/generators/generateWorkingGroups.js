const faker = require('faker')

const { randomMarkdown, randomFromRange } = require('./utils')

const WORKING_GROUPS = ['forum', 'storage', 'content', 'membership']

const generateWorkingGroups = () => {
  const generateWorkingGroup = (groupName, id) => ({
    id: String(id),
    name: groupName,
    workers: [],
    leaderId: null,
    budget: randomFromRange(1000, 5000),
    metadata: {
      name: faker.lorem.words(2),
      message: faker.lorem.words(randomFromRange(2, 5)),
      about: faker.lorem.words(randomFromRange(30, 50)),
      description: randomMarkdown(),
      setAtBlockId: randomFromRange(1, 50),
      setAtTime: '2021-03-09T10:28:04.155Z',
    },
  })

  return WORKING_GROUPS.map(generateWorkingGroup)
}
module.exports = { generateWorkingGroups, WORKING_GROUPS }
