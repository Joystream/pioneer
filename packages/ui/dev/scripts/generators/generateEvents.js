const faker = require('faker')

const rawWorkers = require('../../../src/mocks/data/raw/workers.json')

const { randomFromRange } = require('./utils')

let nextBaseEventId = 0
let nextRewardPaidEventId = 0
let nextBudgetSpendingEventId = 0

const generateBaseEvent = () => {
  return {
    id: (nextBaseEventId++).toString(),
    createdAt: faker.date.recent(30),
    type: 'RewardPaid',
  }
}

const generateBaseEvents = () => {
  return Array.from({ length: 10 }).map(generateBaseEvent)
}

const generateRewardPaidEvent = (baseEvent) => {
  const worker = rawWorkers[randomFromRange(0, rawWorkers.length - 1)]

  return {
    id: (nextRewardPaidEventId++).toString(),
    createdAt: baseEvent.createdAt,
    eventId: baseEvent.id,
    groupId: worker.groupId.toString(),
    workerId: worker.id.toString(),
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    amount: Number(randomFromRange(0, 10000)),
    type: 'REGULAR',
  }
}

const generateBudgetSpending = (baseEvent) => {
  const worker = rawWorkers[randomFromRange(0, rawWorkers.length - 1)]

  return {
    id: (nextBudgetSpendingEventId++).toString(),
    createdAt: baseEvent.createdAt,
    eventId: baseEvent.id,
    groupId: worker.groupId.toString(),
    workerId: worker.id.toString(),
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    amount: Number(randomFromRange(0, 10000)),
    reciever: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY'
  }
}

const generateAllEvents = () => {
  const events = generateBaseEvents()
  const rewardPaidEvents = events.map(generateRewardPaidEvent)
  const budgetSpendingEvents = events.map(generateBudgetSpending)

  return {
    events,
    rewardPaidEvents,
    budgetSpendingEvents
  }
}

module.exports = { generateAllEvents }
