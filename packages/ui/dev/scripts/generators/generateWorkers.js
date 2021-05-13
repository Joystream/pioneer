const faker = require('faker')

const { MAX_MEMBERS } = require('./generateMembers')
const { WORKING_GROUPS } = require('./generateWorkingGroups')
const { randomUniqueArrayFromRange, randomFromRange } = require('./utils')

const generateWorkers = () => {
  const generateWorker = (type, groupId) => (memberId) => ({
    membershipId: memberId,
    groupId: groupId,
    status: type,
    rewardPerBlock: randomFromRange(1, 2) * 100,
    earnedTotal: randomFromRange(10, 40) * 100,
    stake: randomFromRange(1, 2) * 1000,
    nextPaymentAt: faker.date.soon(randomFromRange(1, 10)).toJSON(),
  })

  const generateAllWorkers = (groupName, id) => {
    const workersIds = randomUniqueArrayFromRange(randomFromRange(2, 7), 0, MAX_MEMBERS)
    const terminatedIds = randomUniqueArrayFromRange(randomFromRange(0, 10), 0, MAX_MEMBERS)
    const leftIds = randomUniqueArrayFromRange(randomFromRange(0, 20), 0, MAX_MEMBERS)

    return [
      ...workersIds.map(generateWorker('active', id)),
      ...terminatedIds.map(generateWorker('terminated', id)),
      ...leftIds.map(generateWorker('left', id)),
    ].sort((a, b) => a.membershipId.localeCompare(b.membershipId))
  }

  return WORKING_GROUPS.map(generateAllWorkers).flatMap((a) => a)
}

module.exports = { generateWorkers }
