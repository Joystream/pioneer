import faker from 'faker'

import { WorkerStatusType } from '@/mocks/data/seedWorkers'

import { generateTerminatedEvent, generateWorkerLeavingEvent, WorkerStatusEvent } from './generateEvents'
import { OpeningMock } from './generateOpeningsAndUpcomingOpenings'
import { WORKING_GROUPS } from './generateWorkingGroups'
import { Mocks } from './types'
import { randomFromRange, randomUniqueArrayFromRange } from './utils'

let nextId = 0

let nextApplicationId = 0

const generateApplication = (opening: OpeningMock, status = 'pending') => (applicantId: string) => {
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
    stake: randomFromRange(3, 8) * 1000,
  }
}

const StatusEventGenerators: Record<
  WorkerStatusType,
  (workerId: string, groupId: string) => WorkerStatusEvent | undefined
> = {
  WorkerStatusTerminated: generateTerminatedEvent,
  WorkerStatusLeaving: generateWorkerLeavingEvent,
  WorkerStatusLeft: generateWorkerLeavingEvent,
  WorkerStatusActive: () => undefined,
}

const generateWorkerStatus = (status: WorkerStatusType, workerId: string, groupId: string) => ({
  type: status,
  event: StatusEventGenerators[status](workerId, groupId),
})

const generateWorker = (
  type: WorkerStatusType,
  groupId: string,
  applications: ApplicationMock[],
  opening?: OpeningMock
) => (memberId: number) => {
  if (!opening) {
    return
  }
  const runtimeId = nextId++

  const application = generateApplication(opening, 'filled')(String(memberId))
  const applicationPending = generateApplication(opening)(String(memberId))
  applications.push(application, applicationPending)
  const id = `${groupId}-${runtimeId}`

  return {
    id,
    runtimeId,
    membershipId: memberId,
    groupId,
    applicationId: application.id,
    status: generateWorkerStatus(type, id, groupId),
    rewardPerBlock: randomFromRange(1, 2) * 100,
    earnedTotal: randomFromRange(10, 40) * 100,
    missingRewardAmount: randomFromRange(0, 20) * 100,
    stake: randomFromRange(3, 8) * 1000,
    nextPaymentAt: faker.date.soon(randomFromRange(1, 10)).toJSON(),
    createdAt: faker.date.recent(30),
  }
}

export type WorkerMock = ReturnType<ReturnType<typeof generateWorker>>

export type ApplicationMock = ReturnType<ReturnType<typeof generateApplication>>

export const generateWithdrawnApplications = (mocks: Mocks): ApplicationMock[] => {
  return mocks.openings
    .map((opening) => {
      const applicantsIds = randomUniqueArrayFromRange(2, 0, mocks.members.length - 1).map(
        (index) => mocks.members[index].id
      )

      return applicantsIds.map(generateApplication(opening, 'withdrawn'))
    })
    .flat()
}

export const generateWorkers = (mocks: Mocks) => {
  const applications: ApplicationMock[] = []

  const findOpening = (group: string, status: string) => {
    return mocks.openings.find((opening) => opening.groupId === group && opening.status === status)
  }

  const generateAllWorkers = (groupName: string) => {
    const workersIds = [0, 1, ...randomUniqueArrayFromRange(randomFromRange(2, 7), 2, mocks.members.length - 1)]
    const terminatedIds = randomUniqueArrayFromRange(randomFromRange(2, 8), 0, mocks.members.length - 1)
    const leftIds = randomUniqueArrayFromRange(randomFromRange(2, 12), 0, mocks.members.length - 1)
    const leavingIds = randomUniqueArrayFromRange(randomFromRange(2, 5), 0, mocks.members.length - 1)

    return [
      ...workersIds.map(
        generateWorker('WorkerStatusActive', groupName, applications, findOpening(groupName, 'filled'))
      ),
      ...terminatedIds.map(
        generateWorker('WorkerStatusTerminated', groupName, applications, findOpening(groupName, 'filled'))
      ),
      ...leftIds.map(generateWorker('WorkerStatusLeft', groupName, applications, findOpening(groupName, 'filled'))),
      ...leavingIds.map(
        generateWorker('WorkerStatusLeaving', groupName, applications, findOpening(groupName, 'filled'))
      ),
    ]
  }

  const workers = WORKING_GROUPS.map(generateAllWorkers).flatMap((a: any) => a)

  return {
    workers,
    applications,
  }
}
