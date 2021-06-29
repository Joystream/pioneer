import faker from 'faker'

import { ProposalVoteKind } from '../../../src/common/api/queries'
import { proposalDetails } from '../../../src/proposals/model/proposalDetails'
import { proposalStatuses } from '../../../src/proposals/model/proposalStatus'

import { Mocks } from './types'
import { randomFromRange, randomMarkdown } from './utils'

const MAX_PROPOSALS = 20

const MAX_VOTE = 3
const { Approve, Reject, Slash, Abstain } = ProposalVoteKind
const VotesKind = [Approve, Approve, Reject, Abstain, Slash]

let nextId = 0

const generateProposal = (mocks: Mocks) => {
  const member = mocks.members[randomFromRange(0, mocks.members.length - 1)]
  const status = proposalStatuses[randomFromRange(0, proposalStatuses.length - 1)] as string
  const details = proposalDetails[randomFromRange(0, proposalDetails.length - 1)] as string

  const createdAt = faker.date.recent(20)

  const description = randomMarkdown()
  const voteKinds = faker.random.arrayElements(VotesKind, randomFromRange(0, MAX_VOTE)) as string[]
  const votes = voteKinds.map((voteKind) => ({ voteKind }))

  return {
    id: String(nextId++),
    title: faker.random.words(4),
    status,
    statusSetAtTime: faker.date.between(createdAt, new Date()).toISOString(),
    details,
    creatorId: member.id,
    createdAt: createdAt.toISOString(),
    description,
    votes,
  }
}

export type ProposalMock = ReturnType<typeof generateProposal>

export const generateProposals = (mocks: Mocks): ProposalMock[] => {
  return Array.from({ length: MAX_PROPOSALS }).map(() => generateProposal(mocks))
}
