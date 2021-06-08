import faker from 'faker'

import { randomMarkdown, randomFromRange } from './utils'

export const WORKING_GROUPS = ['forum', 'storage', 'content', 'membership']

const generateWorkingGroup = (groupName: string, id: number) => ({
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
    status: faker.lorem.words(randomFromRange(0, 2)),
    statusMessage: randomMarkdown(),
  },
})

export type WorkingGroup = ReturnType<typeof generateWorkingGroup>

export const generateWorkingGroups = () => {
  return WORKING_GROUPS.map(generateWorkingGroup)
}
