import faker from 'faker'

import { Mocks } from './types'
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

export interface WorkingGroupMock {
  id: string
  name: string
  workers: never[]
  leaderId: string | null
  budget: number
  metadata: ReturnType<typeof generateWorkingGroup>['metadata']
}

export const generateWorkingGroups = () => {
  return WORKING_GROUPS.map(generateWorkingGroup)
}

export const getWorkingGroupsWithLeader = (mocks: Mocks) => {
  const getLeader = (groupId: string) => {
    if (groupId === 'membershipWorkingGroup') {
      return null
    }

    const workers = mocks.workers.filter((worker) => worker?.groupId === groupId)

    return workers[randomFromRange(0, workers.length - 1)]?.id as string
  }

  return mocks.workingGroups.map((group) => ({
    ...group,
    leaderId: getLeader(group.id),
  }))
}
