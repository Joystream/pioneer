const faker = require('faker')

const rawWorkers = require('../../../src/mocks/data/raw/workers.json')

const { randomFromRange } = require('./utils')

let nextRewardPaidEventId = 0
let nextBudgetSpendingEventId = 0

const generateRewardPaidEvent = () => {
  const worker = rawWorkers[randomFromRange(0, rawWorkers.length - 1)]

  return {
    id: (nextRewardPaidEventId++).toString(),
    createdAt: faker.date.recent(30),
    groupId: worker.groupId.toString(),
    workerId: worker.id.toString(),
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    amount: Number(randomFromRange(0, 10000)),
    type: 'REGULAR',
  }
}

const generateBudgetSpending = () => {
  const worker = rawWorkers[randomFromRange(0, rawWorkers.length - 1)]

  return {
    id: (nextBudgetSpendingEventId++).toString(),
    createdAt: faker.date.recent(30),
    groupId: worker.groupId.toString(),
    workerId: worker.id.toString(),
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    amount: Number(randomFromRange(0, 10000)),
    reciever: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  }
}

const generateAllEvents = () => {
  const rewardPaidEvents = Array.from({ length: 10 }).map(generateRewardPaidEvent)
  const budgetSpendingEvents = Array.from({ length: 10 }).map(generateBudgetSpending)

  return {
    rewardPaidEvents,
    budgetSpendingEvents,
  }
}

module.exports = { generateAllEvents }
