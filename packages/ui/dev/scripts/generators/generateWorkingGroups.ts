import faker from 'faker'

import { randomMarkdown, randomFromRange } from './utils'

export const WORKING_GROUPS = [
  'forumWorkingGroup',
  'storageWorkingGroup',
  'contentDirectoryWorkingGroup',
  'membershipWorkingGroup',
]

const generateWorkingGroup = (groupName: string) => ({
  id: groupName,
  name: groupName,
  workers: [],
  leaderId: null,
  budget: randomFromRange(1000, 5000),
  metadata: {
    name: faker.lorem.words(2),
    message: faker.lorem.words(randomFromRange(2, 5)),
    about: faker.lorem.words(randomFromRange(30, 50)),
    description: randomMarkdown(),
    setAtTime: '2021-03-09T10:28:04.155Z',
    status: faker.lorem.words(randomFromRange(0, 2)),
    statusMessage: randomMarkdown(),
  },
})

export type WorkingGroupMock = ReturnType<typeof generateWorkingGroup>

export const generateWorkingGroups = () => {
  return WORKING_GROUPS.map(generateWorkingGroup)
}
