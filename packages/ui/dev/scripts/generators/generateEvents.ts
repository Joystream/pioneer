import faker from 'faker'

import { Mocks } from './types'
import { randomFromRange } from './utils'

let nextRewardPaidEventId = 0
let nextBudgetSpendingEventId = 0

const generateRewardPaidEvent = (mocks: Mocks) => {
  return () => {
    const worker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]

    return {
      id: (nextRewardPaidEventId++).toString(),
      createdAt: faker.date.recent(30),
      groupId: worker.groupId.toString(),
      workerId: worker.id.toString(),
      rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      amount: randomFromRange(100, 1000) * 10,
      type: 'REGULAR',
    }
  }
}

const generateBudgetSpending = (mocks: Mocks) => {
  return () => {
    const worker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]

    return {
      id: (nextBudgetSpendingEventId++).toString(),
      createdAt: faker.date.recent(30),
      groupId: worker.groupId.toString(),
      workerId: worker.id.toString(),
      rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      amount: randomFromRange(0, 10000),
      reciever: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    }
  }
}

export const generateAllEvents = (mocks: Mocks) => {
  const rewardPaidEvents = Array.from({ length: 10 }).map(generateRewardPaidEvent(mocks))
  const budgetSpendingEvents = Array.from({ length: 10 }).map(generateBudgetSpending(mocks))

  return {
    rewardPaidEvents,
    budgetSpendingEvents,
  }
}
