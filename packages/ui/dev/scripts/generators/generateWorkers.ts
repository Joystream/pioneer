import faker from 'faker'

import { MAX_MEMBERS } from './generateMembers'
import { WORKING_GROUPS } from './generateWorkingGroups'
import { randomUniqueArrayFromRange, randomFromRange } from './utils'

export const generateWorkers = () => {
  let nextId = 0

  const generateWorker = (type: string, groupId: number) => (memberId: number) => ({
    id: String(nextId++),
    membershipId: memberId,
    groupId: groupId,
    applicationId: randomFromRange(0, 100),
    status: type,
    rewardPerBlock: randomFromRange(1, 2) * 100,
    earnedTotal: randomFromRange(10, 40) * 100,
    missingRewardAmount: randomFromRange(0, 20) * 100,
    stake: randomFromRange(3, 8) * 1000,
    nextPaymentAt: faker.date.soon(randomFromRange(1, 10)).toJSON(),
    hiredAtBlockId: randomFromRange(20, 100),
  })

  const generateAllWorkers = (groupName: string, id: number) => {
    const workersIds = [0, 1, ...randomUniqueArrayFromRange(randomFromRange(2, 7), 2, MAX_MEMBERS)]
    const terminatedIds = randomUniqueArrayFromRange(randomFromRange(0, 10), 0, MAX_MEMBERS)
    const leftIds = randomUniqueArrayFromRange(randomFromRange(0, 20), 0, MAX_MEMBERS)

    return [
      ...workersIds.map(generateWorker('active', id)),
      ...terminatedIds.map(generateWorker('terminated', id)),
      ...leftIds.map(generateWorker('left', id)),
    ].sort((a, b) => a.membershipId - b.membershipId)
  }

  return WORKING_GROUPS.map(generateAllWorkers).flatMap((a: any) => a)
}
