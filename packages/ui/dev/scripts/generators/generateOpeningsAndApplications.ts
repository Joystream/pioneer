import faker from 'faker'

import { Mocks } from './types'
import { randomUniqueArrayFromRange, randomFromRange, randomMarkdown } from './utils'

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

const generateMetadata = () => ({
  shortDescription: faker.lorem.sentence(randomFromRange(20, 60)),
  description: randomMarkdown(),
  hiringLimit: 1,
  applicationDetails: randomMarkdown(),
  applicationFormQuestions: getApplicationFormQuestions(),
})

const generateBaseOpening = (groupId: number) => ({
  id: String(nextOpeningId++),
  groupId: String(groupId),
  stakeAmount: randomFromRange(1, 10) * 1000,
  rewardPerBlock: randomFromRange(1, 5) * 100,
  createdAtBlockId: randomFromRange(20, 100),
  version: 1,
})

const generateOpening = (status: string, groupId: number) => () => {
  const isLeader = Math.random() > 0.9
  const isInPast = status !== 'open'
  return {
    ...generateBaseOpening(groupId),
    type: isLeader ? 'LEADER' : 'REGULAR',
    status,
    unstakingPeriod: randomFromRange(5, 10),
    metadata: {
      ...generateMetadata(),
      expectedEnding: isInPast ? faker.date.recent(90) : faker.date.soon(10),
    },
  }
}

type Opening = ReturnType<ReturnType<typeof generateOpening>>

const generateUpcomingOpening = (groupId: number) => () => {
  return {
    ...generateBaseOpening(groupId),
    expectedStart: faker.date.soon(randomFromRange(10, 30)).toJSON(),
    metadata: {
      ...generateMetadata(),
      shortDescription: 'Upcoming worker opening.' + faker.lorem.words(randomFromRange(5, 10)),
      expectedEnding: faker.date.soon(randomFromRange(40, 50)).toJSON(),
    },
  }
}

const generateOpenings = (mocks: Mocks) => {
  const generateOpeningsForGroup = (groupName: string, id: number) => {
    return [
      ...Array.from({ length: randomFromRange(1, 3) }, generateOpening('open', id)),
      ...Array.from({ length: randomFromRange(4, 8) }, generateOpening('filled', id)),
      ...Array.from({ length: randomFromRange(1, 2) }, generateOpening('cancelled', id)),
    ]
  }

  return mocks.workingGroups
    .map(({ id }) => id)
    .map(generateOpeningsForGroup)
    .flatMap((a) => a)
}

const generateApplications = (openings: Opening[], mocks: Mocks) => {
  let nextId = 0

  return openings.map((opening) => {
    const applicantsIds = randomUniqueArrayFromRange(8, 0, mocks.members.length - 1).map(
      (index) => mocks.members[index].id
    )
    const questions = opening.metadata.applicationFormQuestions

    const generateApplication = (applicantId: string) => ({
      id: String(nextId++),
      openingId: opening.id,
      applicantId,
      answers: questions.map((question) => ({
        questionId: question.id,
        answer: faker.lorem.words(randomFromRange(5, 10)),
      })),
      status: 'pending',
      createdAtBlockId: 1,
    })

    return applicantsIds.map(generateApplication)
  })
}

const generateUpcomingOpenings = (mocks: Mocks) => {
  const generateUpcomingOpeningsForGroup = (groupName: string, id: number) => {
    return [...Array.from({ length: randomFromRange(1, 3) }, generateUpcomingOpening(id))]
  }

  return mocks.workingGroups
    .map(({ id }) => id)
    .map(generateUpcomingOpeningsForGroup)
    .flatMap((a) => a)
}

export const generateOpeningsAndApplications = (mocks: Mocks) => {
  const openings = generateOpenings(mocks).flatMap((a) => a)
  const applications = generateApplications(openings, mocks).flatMap((a) => a)
  nextOpeningId = 0
  const upcomingOpenings = generateUpcomingOpenings(mocks).flatMap((a) => a)

  return {
    openings,
    applications,
    upcomingOpenings,
  }
}
