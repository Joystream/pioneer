import faker from 'faker'

import { Mocks } from './types'
import { randomFromRange, randomMarkdown } from './utils'

let nextQuestionId = 0
let nextOpeningId = 0

const getApplicationFormQuestions = () => [
  {
    id: String(nextQuestionId++),
    type: 'TEXT',
    question: faker.lorem.words(randomFromRange(3, 8)) + '?',
  },
  {
    id: String(nextQuestionId++),
    type: 'TEXTAREA',
    question: faker.lorem.words(randomFromRange(4, 6)) + '?',
  },
]

export const generateOpeningMetadata = () => ({
  title: faker.random.words(4),
  shortDescription: faker.lorem.sentence(randomFromRange(20, 60)),
  description: randomMarkdown(),
  hiringLimit: 1,
  applicationDetails: randomMarkdown(),
  applicationFormQuestions: getApplicationFormQuestions(),
})

const generateBaseOpening = (groupId: string) => {
  const runtimeId = nextOpeningId++

  return {
    id: `${groupId}-${runtimeId}`,
    runtimeId,
    groupId: groupId,
    stakeAmount: randomFromRange(1, 10) * 1000,
    rewardPerBlock: randomFromRange(1, 5) * 100,
    version: 1,
  }
}

const generateOpening = (status: string, groupId: string) => () => {
  const isLead = Math.random() > 0.9
  const isInPast = status !== 'open'
  return {
    ...generateBaseOpening(groupId),
    type: isLead ? 'LEADER' : 'REGULAR',
    status,
    unstakingPeriod: randomFromRange(14400, 40000),
    metadata: {
      ...generateOpeningMetadata(),
      expectedEnding: isInPast ? faker.date.recent(90) : faker.date.soon(10),
    },
  }
}

export type OpeningMock = ReturnType<ReturnType<typeof generateOpening>>

const generateUpcomingOpening = (groupId: string) => () => {
  return {
    ...generateBaseOpening(groupId),
    expectedStart: faker.date.soon(randomFromRange(10, 30)).toJSON(),
    metadata: {
      ...generateOpeningMetadata(),
      shortDescription: 'Upcoming worker opening.' + faker.lorem.words(randomFromRange(5, 10)),
      expectedEnding: faker.date.soon(randomFromRange(40, 50)).toJSON(),
    },
  }
}

const generateOpenings = (mocks: Mocks) => {
  const generateOpeningsForGroup = (groupName: string) => {
    return [
      ...Array.from({ length: randomFromRange(1, 3) }, generateOpening('open', groupName)),
      ...Array.from({ length: randomFromRange(2, 6) }, generateOpening('filled', groupName)),
      ...Array.from({ length: randomFromRange(1, 2) }, generateOpening('cancelled', groupName)),
    ]
  }

  return mocks.workingGroups
    .map(({ id }) => id)
    .map(generateOpeningsForGroup)
    .flatMap((a) => a)
}

const generateUpcomingOpenings = (mocks: Mocks) => {
  const generateUpcomingOpeningsForGroup = (groupName: string) => {
    return [...Array.from({ length: randomFromRange(1, 3) }, generateUpcomingOpening(groupName))]
  }

  return mocks.workingGroups
    .map(({ id }) => id)
    .map(generateUpcomingOpeningsForGroup)
    .flatMap((a) => a)
}

export type UpcomingOpeningMock = ReturnType<ReturnType<typeof generateUpcomingOpening>>

export const generateOpeningsAndUpcomingOpenings = (mocks: Mocks) => {
  const openings = generateOpenings(mocks).flatMap((a) => a)
  nextOpeningId = 0
  const upcomingOpenings = generateUpcomingOpenings(mocks).flatMap((a) => a)

  return {
    openings,
    upcomingOpenings,
  }
}
