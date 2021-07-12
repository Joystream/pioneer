import faker from 'faker'

import { Mocks } from './types'
import { randomFromRange } from './utils'

let nextRewardPaidEventId = 0
let nextBudgetSpendingEventId = 0
let nextAppliedOnOpeningEventId = 0
let nextApplicationWithdrawnEventId = 0

const generateRewardPaidEvent = (mocks: Mocks) => {
  return () => {
    const worker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]

    return {
      id: (nextRewardPaidEventId++).toString(),
      createdAt: faker.date.recent(30),
      groupId: worker?.groupId,
      workerId: worker?.id.toString(),
      rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      amount: randomFromRange(100, 1000) * 10,
      type: 'REGULAR',
    }
  }
}

const generateBudgetSpending = (mocks: Mocks) => () => {
  const worker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]

  return {
    id: (nextBudgetSpendingEventId++).toString(),
    createdAt: faker.date.recent(30),
    groupId: worker?.groupId,
    workerId: worker?.id.toString(),
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    amount: randomFromRange(0, 10000),
    reciever: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  }
}

const generateAppliedOnOpeningEvent = (mocks: Mocks) => () => {
  const application = mocks.applications[randomFromRange(0, mocks.applications.length - 1)]
  const opening = mocks.openings.find(opening => opening.id == application.openingId)

  return {
    id: (nextAppliedOnOpeningEventId++).toString(),
    createdAt: faker.date.recent(30),
    applicationId: application.id,
    openingId: application.openingId,
    groupId: opening?.groupId,
  }
}

const generateApplicationWithdrawnEvent = (mocks: Mocks) => () => {
  const withdrawnApplications = mocks.applications.filter(application => application.status === 'withdrawn')
  const application = withdrawnApplications[randomFromRange(0, withdrawnApplications.length - 1)]
  const opening = mocks.openings.find(opening => opening.id == application.openingId)

  return {
    id: (nextApplicationWithdrawnEventId++).toString(),
    createdAt: faker.date.recent(20),
    applicationId: application.id,
    groupId: opening?.groupId,
  }
}

const generateStakeChanged = (mocks: Mocks) => () => {
  const worker = mocks.workers[randomFromRange(0, mocks.workers.length -1)]
  return {
    createdAt: faker.date.recent(7),
    groupId: worker?.groupId,
    workerId: worker?.id,
    amount: randomFromRange(100, 10000)
  }
}

const generateStakeSlashedEvent = (mocks: Mocks) => () => {
  const worker = mocks.workers[randomFromRange(0, mocks.workers.length -1)]
  return {
    createdAt: faker.date.recent(7),
    groupId: worker?.groupId,
    workerId: worker?.id,
    requestedAmount: 1000,
    slashedAmount: 1000,
    rationale: 'rationale',
  }
}

const generateOpeningFilledEvent = (mocks: Mocks) => () => {
  const filled = mocks.openings.filter(o => o.status === 'filled')
  const opening = filled[randomFromRange(0, filled.length - 1)]
  const workers = mocks.workers.filter(w => w && w.groupId === opening.groupId)
  return {
    createdAt: faker.date.recent(7),
    groupId: opening.groupId,
    openingId: opening.id,
    workersHiredIds: Array.from({ length: opening.metadata.hiringLimit })
      .map(() => workers[randomFromRange(0, workers.length - 1)]?.id)
  }
}

const generateWorkerLeavingEvent = (mocks: Mocks, leftAlready?: boolean) => () => {
  const status = leftAlready ? 'left' : 'active'
  const workers = mocks.workers.filter(worker => worker && worker.status === status)
  const worker = workers[randomFromRange(0, workers.length - 1)]
  return {
    createdAt: faker.date.recent(7),
    groupId: worker?.groupId,
    workerId: worker?.id,
  }
}

const generateStatusTextChangedEvents = (mocks: Mocks) => {
  const groups = mocks.workingGroups
  const openings = mocks.upcomingOpenings
  return groups.map(group => ({
    createdAt: faker.date.recent(7),
    groupId: group.id,
    upcomingworkinggroupopeningcreatedInEventIds: [openings.find(opening => opening.groupId == group.id)?.id],
    // assuming this controls the "status updated" activity, just the array being empty or non-empty matters
    workinggroupmetadatasetInEventIds: Math.random() > .5 ? ['1'] : [],
  }))
}

const generateOpeningAddedEvent = (mocks: Mocks) => () => {
  const opening = mocks.openings[randomFromRange(0, mocks.openings.length -1)]
  const group = mocks.workingGroups.find(g => g.id === opening.groupId)
  return {
    createdAt: faker.date.recent(15),
    groupId: group?.id,
    openingId: opening.id,
  }
}

const generateOpeningCanceledEvent = (mocks: Mocks) => () => {
  const openings = mocks.openings.filter(opening => opening.status === 'cancelled')
  const opening = openings[randomFromRange(0, openings.length - 1)]
  const group = mocks.workingGroups.find(g => g.id === opening.groupId)
  return {
    createdAt: faker.date.recent(7),
    groupId: group?.id,
    openingId: opening.id,
  }
}

const generateBudgetSetEvent = (mocks: Mocks) => () => {
  const group = mocks.workingGroups[randomFromRange(0, mocks.workingGroups.length - 1)]
  return {
    createdAt: faker.date.recent(30),
    groupId: group.id,
    newBudget: 10000 * randomFromRange(1, 10),
  }
}

const generateTerminatedEvent = (mocks: Mocks) => () => {
  const workers = mocks.workers.filter(worker => worker?.status === 'terminated')
  const worker = workers[randomFromRange(0, workers.length - 1)]
  return {
    createdAt: faker.date.recent(30),
    groupId: worker?.groupId,
    workerId: worker?.id,
    penalty: 0,
  }
}

const generateWorkerRewardAccountUpdatedEvent = (mocks: Mocks) => () => {
  const worker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]
  const member = mocks.members.find(member => member.id === worker!.membershipId.toString())
  return {
    createdAt: faker.date.recent(30),
    groupId: worker?.groupId,
    workerId: worker?.id,
    newRewardAccount: member?.rootAccount,
  }
}

const generateWorkerRewardAmountUpdatedEvent = (mocks: Mocks) => () => {
  const worker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]
  return {
    createdAt: faker.date.recent(30),
    groupId: worker?.groupId,
    workerId: worker?.id,
    newRewardPerBlock: randomFromRange(1, 50),
  }
}

export const eventGenerators = {
  rewardPaidEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateRewardPaidEvent(mocks)),
  budgetSpendingEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateBudgetSpending(mocks)),
  appliedOnOpeningEvents: (mocks: Mocks) => Array.from({ length: 15 }).map(generateAppliedOnOpeningEvent(mocks)),
  applicationWithdrawnEvents: (mocks: Mocks) => Array.from({ length: 8 }).map(generateApplicationWithdrawnEvent(mocks)),
  stakeDecreasedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateStakeChanged(mocks)),
  stakeIncreasedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateStakeChanged(mocks)),
  stakeSlashedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateStakeSlashedEvent(mocks)),
  openingFilledEvents: (mocks: Mocks) => Array.from({ length: 15 }).map(generateOpeningFilledEvent(mocks)),
  workerExitedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateWorkerLeavingEvent(mocks, true)),
  workerStartedLeavingEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateWorkerLeavingEvent(mocks)),
  statusTextChangedEvents: (mocks: Mocks) => generateStatusTextChangedEvents(mocks),
  openingAddedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateOpeningAddedEvent(mocks)),
  openingCanceledEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateOpeningCanceledEvent(mocks)),
  budgetSetEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateBudgetSetEvent(mocks)),
  terminatedWorkerEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateTerminatedEvent(mocks)),
  terminatedLeaderEvents: (mocks: Mocks) => Array.from({ length: 5 }).map(generateTerminatedEvent(mocks)),
  workerRewardAccountUpdatedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateWorkerRewardAccountUpdatedEvent(mocks)),
  workerRewardAmountUpdatedEvents: (mocks: Mocks) => Array.from({ length: 10 }).map(generateWorkerRewardAmountUpdatedEvent(mocks)),
}

export const generateAllEvents = (mocks: Mocks) => {
  const newMocks: { [key: string]: any[] } = {}
  Object.entries(eventGenerators).forEach(([key, generator]) => { newMocks[key] = generator(mocks) })

  return newMocks
}
