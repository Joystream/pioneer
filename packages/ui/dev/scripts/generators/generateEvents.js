const faker = require('faker')

const { randomFromRange } = require('./utils')

let nextBaseEventId = 0

const generateBaseEvent = () => {
  return {
    id: (nextBaseEventId++).toString(),
    createdAt: faker.date.recent(40),
    createdById: randomFromRange(0, 51),
    type: 'RewardPaid',
  }
}

const generateBaseEvents = () => {
  return Array.from({ length: 10 }).map(generateBaseEvent)
}

const generateAllEvents = () => {
  const events = generateBaseEvents()
  console.log(events)
  // const rewardPaidEvents = generateApplications(openings).flatMap((a) => a)

  return {
    events,
    // rewardPaidEvents
  }
}

module.exports = { generateAllEvents }
