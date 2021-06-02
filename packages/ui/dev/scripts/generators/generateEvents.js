const faker = require('faker')

const { randomFromRange } = require('./utils')

let nextBaseEventId = 0
let nextRewardPaidEventId = 0

const mapGroupId = (workerId) => {
  if (workerId < 18) return 0

  if (workerId < 34) return 1

  if (workerId < 68) return 2

  return 3
}

const generateBaseEvent = () => {
  return {
    id: (nextBaseEventId++).toString(),
    createdAt: faker.date.recent(40),
    type: 'RewardPaid',
  }
}

const generateBaseEvents = () => {
  return Array.from({ length: 10 }).map(generateBaseEvent)
}

const generateRewardPaidEvent = (baseEvent) => {
  const workerId = randomFromRange(0, 60)
  const groupId = mapGroupId(workerId)

  return {
    id: (nextRewardPaidEventId++).toString(),
    createdAt: baseEvent.createdAt,
    eventId: baseEvent.id,
    groupId: groupId.toString(),
    workerId: workerId.toString(),
    rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    amount: Number(randomFromRange(0, 10000)),
    type: 'REGULAR',
  }
}

const generateAllEvents = () => {
  const events = generateBaseEvents()
  const rewardPaidEvents = events.map((event) => generateRewardPaidEvent(event))

  return {
    events,
    rewardPaidEvents,
  }
}

module.exports = { generateAllEvents }
