import faker from 'faker'

import { ProposalVoteKind } from '../../../src/common/api/queries'
import { proposalDetails } from '../../../src/proposals/model/proposalDetails'
import { proposalActiveStatuses } from '../../../src/proposals/model/proposalStatus'
import { ProposalStatus } from '../../../src/proposals/types/proposals'

import { Mocks } from './types'
import { randomFromRange, randomFromWeightedSet, randomMarkdown, randomsFromWeightedSet } from './utils'

const MAX_PROPOSALS = 20

const MAX_VOTE = 3
const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

const VotesKind: [number, ProposalVoteKind][] = [
  [3, Approve],
  [1, Reject],
  [1, Abstain],
  [1, Slash],
]

const DECIDING: ProposalStatus = 'deciding'
const MoreVoteStatuses: ProposalStatus[] = ['dormant', 'deciding']
const VoteRoundStatuses: [number, ProposalStatus[]][] = [
  [2, []],
  [2, MoreVoteStatuses],
  [1, [...MoreVoteStatuses, ...MoreVoteStatuses]],
]
const LastStatuses: [number, ProposalStatus[]][] = [
  [3, []],
  [3, ['dormant']],
  [3, ['gracing']],
  [2, ['rejected']],
  [2, ['slashed']],
  [2, ['gracing', 'executed']],
  [1, ['gracing', 'canceledByRuntime']],
  [2, ['expired']],
  [1, ['cancelled']],
  [1, ['canceledByRuntime']],
  [1, ['vetoed']],
]

const isIntermediateStatus = (status: ProposalStatus) => proposalActiveStatuses.includes(status)

let nextId = 0
let nextVoteId = 0

const generateProposal = (mocks: Mocks) => {
  const statusHistory = [DECIDING, ...randomFromWeightedSet(VoteRoundStatuses), ...randomFromWeightedSet(LastStatuses)]

  const member = mocks.members[randomFromRange(0, mocks.members.length - 1)]
  const status = statusHistory[statusHistory.length - 1] as string
  const details = proposalDetails[randomFromRange(0, proposalDetails.length - 1)] as string

  const createdAt = faker.date.recent(20)

  const proposalStatusUpdates = statusHistory
    .filter(isIntermediateStatus)
    .map((status) => ({ newStatus: status as string, inBlock: 0 }))

  const createdInEvent = { inBlock: 0 }

  const description = randomMarkdown()
  const voteKinds = randomsFromWeightedSet(VotesKind, randomFromRange(0, MAX_VOTE)) as string[]
  const votes = voteKinds.map((voteKind) => ({
    id: nextVoteId++,
    voteKind,
    network: 'OLYMPIA',
    createdAt: new Date().toJSON(),
    voterId: member.id,
    inBlock: randomFromRange(1000, 2000),
    rationale: randomMarkdown(),
  }))

  return {
    id: String(nextId++),
    title: faker.random.words(4),
    status,
    statusSetAtBlock: 0,
    statusSetAtTime: faker.date.between(createdAt, new Date()).toISOString(),
    details,
    creatorId: member.id,
    createdAt: createdAt.toISOString(),
    createdInEvent,
    description,
    votes,
    proposalStatusUpdates,
  }
}

export type ProposalMock = ReturnType<typeof generateProposal>

export const generateProposals = (mocks: Mocks): ProposalMock[] => {
  return Array.from({ length: MAX_PROPOSALS }).map(() => generateProposal(mocks))
}
