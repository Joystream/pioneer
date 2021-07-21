import faker from 'faker'

import { ProposalVoteKind } from '../../../src/common/api/queries'
import { repeat } from '../../../src/common/utils'
import { proposalDetails } from '../../../src/proposals/model/proposalDetails'
import { proposalActiveStatuses } from '../../../src/proposals/model/proposalStatus'
import { ProposalStatus, ProposalType } from '../../../src/proposals/types/proposals'

import { generateOpeningMetadata } from './generateOpeningsAndUpcomingOpenings'
import { Mocks } from './types'
import {
  randomFromRange,
  randomFromWeightedSet,
  randomMarkdown,
  randomMessage,
  randomsFromWeightedSet,
  shuffle,
} from './utils'

const { arrayElement } = faker.random

const proposalTypes = shuffle([...proposalDetails])

const COUNCIL_SIZE = 3
const { Approve, Reject, Slash, Abstain } = ProposalVoteKind
const NONE = 'not voted'
const randomvotesKind = randomsFromWeightedSet<string>([3, Approve], [1, Reject], [1, Abstain], [1, Slash], [1, NONE])

const DECIDING: ProposalStatus = 'deciding'
const MoreVoteStatuses: ProposalStatus[] = ['dormant', 'deciding']
const randomVoteRoundStatuses = randomFromWeightedSet([3, []], [2, MoreVoteStatuses])
const randomLastStatuses = randomFromWeightedSet<ProposalStatus[]>(
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
  [1, ['vetoed']]
)
const isIntermediateStatus = (status: ProposalStatus) => proposalActiveStatuses.includes(status)

const MAX_MESSAGES = 8

let nextId = 0
let nextVoteId = 0

const generateProposal = (type: ProposalType, mocks: Mocks) => {
  const proposalId = String(nextId++)
  const statusHistory = [DECIDING, ...randomVoteRoundStatuses(), ...randomLastStatuses()]

  const member = arrayElement(mocks.members)
  const status = statusHistory[statusHistory.length - 1] as string
  const details = generateProposalDetails(type, mocks)

  const createdAt = faker.date.recent(20)

  const proposalStatusUpdates = statusHistory
    .filter(isIntermediateStatus)
    .map((status) => ({ newStatus: status as string, inBlock: 0 }))

  const createdInEvent = { inBlock: 0 }

  const description = randomMarkdown()

  const decidingCount = statusHistory.filter((status) => status === 'deciding').length
  const voteCount = COUNCIL_SIZE * decidingCount
  const virtualVotes = randomvotesKind(voteCount).map((voteKind, index) => ({
    id: String(nextVoteId++),
    voteKind,
    network: 'OLYMPIA',
    createdAt: new Date().toJSON(),
    voterId: member.id,
    inBlock: randomFromRange(1000, 2000),
    rationale: randomMarkdown(),
    votingRound: Math.floor(index / COUNCIL_SIZE),
  }))

  const messageCount = randomFromWeightedSet([1, 0], [2, 1], [4, 2], [1, randomFromRange(3, MAX_MESSAGES)])()
  const discussionPosts = repeat(randomMessage, messageCount).map((text, index) => ({
    id: `${proposalId}:${index}`,
    createdInEvent: { inBlock: 0 },
    ...(Math.random() > 0.5 ? { updatedAt: faker.date.recent(20).toISOString() } : {}),
    authorId: arrayElement(mocks.members).id,
    text,
    ...(index > 0 && Math.random() > 0.3 ? { repliesToId: `${proposalId}:${randomFromRange(0, index - 1)}` } : {}),
  }))

  return {
    id: proposalId,
    title: faker.random.words(4),
    status,
    statusSetAtBlock: 0,
    statusSetAtTime: faker.date.between(createdAt, new Date()).toISOString(),
    details,
    creatorId: member.id,
    createdAt: createdAt.toISOString(),
    createdInEvent,
    description,
    votes: virtualVotes.filter(({ voteKind }) => voteKind !== NONE),
    proposalStatusUpdates,
    discussionThread: {
      discussionPosts,
      mode: `ProposalDiscussionThreadMode${arrayElement(['Open', 'Closed'])}`,
    },
  }
}

export type ProposalMock = ReturnType<typeof generateProposal>

export const generateProposals = (mocks: Mocks): ProposalMock[] => {
  return proposalTypes.map((type) => generateProposal(type, mocks))
}

const generateProposalDetails = (type: ProposalType, mocks: Mocks) => {
  const details = ProposalDetailsGenerator[type]?.(mocks)
  return details ?? { type }
}

const ProposalDetailsGenerator: Partial<Record<ProposalType, (mocks: Mocks) => any>> = {
  fundingRequest: () => ({
    type: 'fundingRequest',
    data: {
      destinationsList: {
        destinations: [
          {
            account: '5GETSBUMwbLJgUTWMQgU8B2CP7E8kDHR8NoNNZh5tqums9AF',
            amount: randomFromRange(1, 10) * 1000,
          },
        ],
      },
    },
  }),
  createWorkingGroupLeadOpening: (mocks) => ({
    type: 'createWorkingGroupLeadOpening',
    data: {
      metadata: generateOpeningMetadata(),
      stakeAmount: randomFromRange(1, 5) * 1000,
      unstakingPeriod: randomFromRange(1, 3) * 14400,
      rewardPerBlock: randomFromRange(5, 15),
      groupId: mocks.workingGroups[randomFromRange(0, mocks.workingGroups.length - 1)].id,
    },
  }),
  decreaseWorkingGroupLeadStake: (mocks) => ({
    type: 'decreaseWorkingGroupLeadStake',
    data: getLeadStakeData(mocks),
  }),
  slashWorkingGroupLead: (mocks) => ({
    type: 'slashWorkingGroupLead',
    data: getLeadStakeData(mocks),
  }),
  runtimeUpgrade: () => ({
    type: 'runtimeUpgrade',
    data: {
      bytecode: '0x0061736d'
    }
  })
}

const getLeadStakeData = (mocks: Mocks) => ({
  leadId: mocks.workers[randomFromRange(0, mocks.workers.length - 1)]?.id,
  amount: randomFromRange(1, 10) * 1000,
})
