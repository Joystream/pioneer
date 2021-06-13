import faker from 'faker'

import { proposalStatuses } from '../../../src/proposals/model/status'
import { proposalDetails } from '@/proposals/model/details'

import { Mocks } from './types'
import { randomFromRange } from './utils'

const MAX_PROPOSALS = 20

let nextId = 0

const generateProposal = (mocks: Mocks) => {
  const member = mocks.members[randomFromRange(0, mocks.members.length - 1)]
  const status = proposalStatuses[randomFromRange(0, proposalStatuses.length - 1)]
  const details = proposalDetails[randomFromRange(0, proposalDetails.length - 1)]

  const createdAt = faker.date.recent(20)

  return {
    id: String(nextId++),
    title: faker.random.words(4),
    status,
    statusSetAtTime: faker.date.between(createdAt, new Date()).toISOString(),
    details,
    creatorId: member.id,
    createdAt: createdAt.toISOString(),
  }
}

export type ProposalMock = ReturnType<typeof generateProposal>

export const generateProposals = (mocks: Mocks): ProposalMock[] => {
  return Array.from({ length: MAX_PROPOSALS }).map(() => generateProposal(mocks))
}
