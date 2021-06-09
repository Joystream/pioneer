import faker from 'faker'

import { Opening } from './generateOpeningsAndUpcomingOpenings'
import { WORKING_GROUPS } from './generateWorkingGroups'
import { Mocks } from './types'
import { randomFromRange, randomUniqueArrayFromRange } from './utils'

let nextId = 0

const generateWorker = (type: string, groupId: string, applications: Application[], opening?: Opening) => (
  memberId: number
) => {
  if (!opening) {
    return
  }
  const runtimeId = nextId++

  const application = extracted(opening, 'filled')(String(memberId))
  applications.push(application)

  return {
    id: `${groupId}-${runtimeId}`,
    runtimeId,
    membershipId: memberId,
    groupId,
    applicationId: application.id,
    status: type,
    rewardPerBlock: randomFromRange(1, 2) * 100,
    earnedTotal: randomFromRange(10, 40) * 100,
    missingRewardAmount: randomFromRange(0, 20) * 100,
    stake: randomFromRange(3, 8) * 1000,
    nextPaymentAt: faker.date.soon(randomFromRange(1, 10)).toJSON(),
  }
}

export type Worker = ReturnType<ReturnType<typeof generateWorker>>

let nextApplicationId = 0
function extracted(opening: Opening, status = 'pending') {
  return (applicantId: string) => {
    const runtimeId = nextApplicationId++

    return {
      id: `${opening.groupId}-${runtimeId}`,
      runtimeId,
      openingId: opening.id,
      applicantId,
      answers: opening.metadata.applicationFormQuestions.map((question) => ({
        questionId: question.id,
        answer: faker.lorem.words(randomFromRange(5, 10)),
      })),
      status,
    }
  }
}

type Application = ReturnType<ReturnType<typeof extracted>>

export const generateApplications = (openings: Opening[], mocks: Mocks) => {
  return openings.map((opening) => {
    const applicantsIds = randomUniqueArrayFromRange(8, 0, mocks.members.length - 1).map(
      (index) => mocks.members[index].id
    )

    return applicantsIds.map(extracted(opening))
  })
}

export const generateWorkers = (mocks: Mocks) => {
  const applications: Application[] = []

  const findOpening = (group: string, status: string) => {
    return mocks.openings.find((opening) => opening.groupId === group && opening.status === status)
  }

  const generateAllWorkers = (groupName: string) => {
    const workersIds = [0, 1, ...randomUniqueArrayFromRange(randomFromRange(2, 7), 2, mocks.members.length - 1)]
    const terminatedIds = randomUniqueArrayFromRange(randomFromRange(2, 8), 0, mocks.members.length - 1)
    const leftIds = randomUniqueArrayFromRange(randomFromRange(2, 14), 0, mocks.members.length - 1)

    return [
      ...workersIds.map(generateWorker('active', groupName, applications, findOpening(groupName, 'filled'))),
      ...terminatedIds.map(generateWorker('terminated', groupName, applications, findOpening(groupName, 'filled'))),
      ...leftIds.map(generateWorker('left', groupName, applications, findOpening(groupName, 'filled'))),
    ]
  }

  const workers = WORKING_GROUPS.map(generateAllWorkers).flatMap((a: any) => a)

  return {
    workers,
    applications,
  }
}
