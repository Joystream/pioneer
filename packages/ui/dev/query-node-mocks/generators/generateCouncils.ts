import faker from 'faker'

import {
  RawCouncilCandidateMock,
  RawCouncilElectionMock,
  RawCouncilMock,
  RawCouncilorMock,
  RawCouncilVoteMock,
} from '@/mocks/data/seedCouncils'
import { RawNewMissedRewardLevelReachedEvent, RawProposalVotedEvent } from '@/mocks/data/seedEvents'

import { ALICE, ALICE_STASH, BOB, BOB_STASH, CHARLIE } from '../../node-mocks/data/addresses'
import { saveFile } from '../helpers/saveFile'

import { MemberMock } from './generateMembers'
import { ProposalMock } from './generateProposals'
import { WorkerMock } from './generateWorkers'
import { memberAt, randomBlock, randomFromRange, randomInlineBlockData, randomMember, repeat } from './utils'

const COUNCILS = 5

interface MocksForCouncil {
  proposals: ProposalMock[]
  workers: WorkerMock[]
  members: MemberMock[]
}

export const generateCouncils = (mocks?: MocksForCouncil) => {
  if (!mocks) {
    mocks = {
      proposals: require('../../../src/mocks/data/raw/proposals.json'),
      workers: require('../../../src/mocks/data/raw/workers.json'),
      members: require('../../../src/mocks/data/raw/members.json'),
    }
  }

  return Array.from({ length: COUNCILS }).reduce(generateCouncil(mocks), {
    councils: [],
    councilors: [],
    electionRounds: [],
    candidates: [],
    votes: [],
    proposalVotedEvents: [],
    newMissedRewardLevelReachedEvents: [],
  })
}

interface CouncilData {
  councils: RawCouncilMock[]
  councilors: RawCouncilorMock[]
  electionRounds: RawCouncilElectionMock[]
  candidates: RawCouncilCandidateMock[]
  votes: RawCouncilVoteMock[]
  proposalVotedEvents: RawProposalVotedEvent[]
  newMissedRewardLevelReachedEvents: RawNewMissedRewardLevelReachedEvent[]
}

const generateCouncil = (mocks: MocksForCouncil) => (data: CouncilData, _: any, councilIndex: number) => {
  const proposalVotedEvents: RawProposalVotedEvent[] = []
  const newMissedRewardLevelReachedEvents: RawNewMissedRewardLevelReachedEvent[] = []
  const isFinished = councilIndex !== COUNCILS - 1
  const hasEnded = councilIndex < COUNCILS - 2

  const council = {
    id: String(councilIndex),
    ...randomInlineBlockData('electedAt'),
    ...(hasEnded ? randomInlineBlockData('endedAt') : {}),
  }

  const councilors: RawCouncilorMock[] = repeat(
    (councilorIndex) => ({
      id: `${council.id}-${councilorIndex}`,
      electedInCouncilId: council.id,
      memberId: randomMember(mocks.members).id,
      unpaidReward: Math.random() < 0.5 ? 0 : randomFromRange(1000, 100000),
      accumulatedReward: Math.random() < 0.5 ? 0 : randomFromRange(1000, 100000),
      stake: randomFromRange(10000, 1000000),
    }),
    isFinished ? randomFromRange(5, 8) : 0
  )

  const candidacyStatus = ['ACTIVE', 'WITHDRAWN', 'ELECTED', 'FAILED']
  const pastCandidacyStatusType = () => faker.random.arrayElement(candidacyStatus.slice(1))
  const createCandidate = (candidateIndex: number, member = randomMember(mocks.members)) => ({
    id: `${council.id}-${candidateIndex}`,
    memberId: isFinished ? councilors[candidateIndex].memberId : member.id,
    electionRoundId: council.id,
    stake: isFinished ? councilors[candidateIndex].stake : randomFromRange(10000, 1000000),
    stakingAccountId: member.controllerAccount,
    rewardAccountId: member.rootAccount,
    status: isFinished ? pastCandidacyStatusType() : candidacyStatus[0],
    note: faker.lorem.words(10),
    votePower: '0',
    votesReceived: [],
    noteMetadata: {
      header: faker.lorem.words(4),
      bulletPoints: Array.from({ length: 3 }).map(() => faker.lorem.words(8)),
      bannerImageUri: 'https://picsum.photos/500/300',
      description: faker.lorem.words(10),
    },
  })

  const candidates: RawCouncilCandidateMock[] = repeat(
    createCandidate,
    isFinished ? councilors.length : randomFromRange(5, 8)
  )

  // Add Alice as the last candidate of the on going election
  if (!isFinished) {
    candidates.push(createCandidate(candidates.length, memberAt(mocks.members, 0)))
    candidates.push(createCandidate(candidates.length, memberAt(mocks.members, 1)))
    candidates.push(createCandidate(candidates.length, memberAt(mocks.members, 2)))
  }

  const voteKinds = ['APPROVE', 'REJECT', 'SLASH', 'ABSTAIN']
  if (hasEnded) {
    councilors.map((councilor) => {
      proposalVotedEvents.push({
        id: `${council.id}-${proposalVotedEvents.length}`,
        voterId: councilor.memberId,
        ...{ ...randomBlock(), inBlock: randomFromRange(council.electedAtBlock, council.endedAtBlock as number) },
        proposalId: mocks.proposals[randomFromRange(0, mocks.proposals.length - 1)].id,
        voteKind: voteKinds[randomFromRange(0, 3)],
        votingRound: 1,
      })
    })

    newMissedRewardLevelReachedEvents.push(
      ...repeat((eventIndex) => {
        const randomWorker = mocks.workers[randomFromRange(0, mocks.workers.length - 1)]

        return {
          id: `${council.id}-${eventIndex}`,
          groupId: randomWorker?.groupId as string,
          workerId: randomWorker?.id as string,
          newMissedRewardAmount: randomFromRange(0, 10000),
          ...{ ...randomBlock(), inBlock: randomFromRange(council.electedAtBlock, council.endedAtBlock as number) },
        }
      }, randomFromRange(2, 6))
    )
  }

  const electionRound: RawCouncilElectionMock = {
    id: council.id,
    cycleId: Number(council.id),
    isFinished,
    ...(isFinished ? randomInlineBlockData('endedAt') : {}),
    electedCouncilId: council.id,
  }

  const createVote = (voteIndex: number, override: Partial<RawCouncilVoteMock> = {}): RawCouncilVoteMock => ({
    electionRoundId: council.id,
    stake: randomFromRange(1, 10) * 1000,
    stakeLocked: isFinished ? Math.random() > 0.5 : true,
    castBy: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    voteForId: Math.random() > 0.5 ? candidates[randomFromRange(0, candidates.length - 1)].id : null,
    commitment: '0x0000000000000000000000000000000000000000000000000000000000000000',
    voteCastEvent: randomBlock(),
    ...override,
  })

  const votes: RawCouncilVoteMock[] = [
    ...repeat(createVote, randomFromRange(10, 20)),
    createVote(21, { castBy: ALICE_STASH }),

    ...(isFinished
      ? [createVote(22, { castBy: ALICE }), createVote(23, { castBy: BOB_STASH })]
      : [
          // Add a revealable votes (matching the local storage entry below) on the on going election
          // key: votes:4
          // value:
          // [
          //   {"salt":"0x0000000000000000000000000000000000000000000000000000000000000001","accountId":"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY","optionId":"0"},
          //   {"salt":"0x0000000000000000000000000000000000000000000000000000000000000001","accountId":"5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty","optionId":"1"},
          //   {"salt":"0x0000000000000000000000000000000000000000000000000000000000000001","accountId":"5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y","optionId":"2"},
          // ]
          createVote(22, {
            castBy: ALICE,
            commitment: '0xff2d0daf33420d47e5b4ee2d6e1fafc27cd180633425dd0a4377ef50efd359b6',
            voteForId: undefined,
          }),
          createVote(23, {
            castBy: BOB,
            commitment: '0x9d7b93be695fd0916af9373560b70dd0cf95ac7dde779577b1be3db6ba9ef93d',
            voteForId: undefined,
          }),
          createVote(24, {
            castBy: CHARLIE,
            commitment: '0x5ca3c389f3318da883951507c808924f07ac7844b8b1b4b81b1919f7f444dddb',
            voteForId: undefined,
          }),
        ]),
  ]

  return {
    councils: [...data.councils, council],
    councilors: [...data.councilors, ...councilors],
    electionRounds: [...data.electionRounds, electionRound],
    candidates: [...data.candidates, ...candidates],
    votes: [...data.votes, ...votes],
    proposalVotedEvents: [...data.proposalVotedEvents, ...proposalVotedEvents],
    newMissedRewardLevelReachedEvents: [
      ...data.newMissedRewardLevelReachedEvents,
      ...newMissedRewardLevelReachedEvents,
    ],
  }
}

export const councilModule = {
  command: 'council',
  describe: 'Generate council from other mocks',
  handler: () => Object.entries(generateCouncils()).forEach(([fileName, contents]) => saveFile(fileName, contents)),
}
