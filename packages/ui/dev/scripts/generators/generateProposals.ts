import faker from 'faker'

import { proposalStatuses } from '../../../src/proposals/model/status'
import { proposalTypes } from '../../../src/proposals/model/type'

import { Mocks } from './types'
import { randomFromRange } from './utils'

const MAX_PROPOSALS = 20

let nextId = 0

const generateProposal = (mocks: Mocks) => {
  const member = mocks.members[randomFromRange(0, mocks.members.length - 1)]
  const status = proposalStatuses[randomFromRange(0, proposalStatuses.length - 1)]
  const details = proposalTypes[randomFromRange(0, proposalTypes.length - 1)]

  const createdAt = faker.date.recent(20)

  return {
    id: String(nextId++),
    title: faker.random.words(4),
    status,
    statusSetAtTime: faker.date.between(createdAt, new Date()),
    details,
    creatorId: member.id,
    createdAt,
  }
}

export type ProposalMock = ReturnType<typeof generateProposal>

export const generateProposals = (mocks: Mocks): ProposalMock[] => {
  return Array.from({ length: MAX_PROPOSALS }).map(() => generateProposal(mocks))
}
