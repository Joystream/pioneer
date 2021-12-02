import faker from 'faker'

import {
  RawCouncilCandidateMock,
  RawCouncilElectionMock,
  RawCouncilMock,
  RawCouncilorMock,
  RawCouncilReferendumResultMock,
  RawCouncilVoteMock,
} from '@/mocks/data/seedCouncils'
import { RawNewMissedRewardLevelReachedEvent, RawProposalVotedEvent } from '@/mocks/data/seedEvents'

import { ALICE, ALICE_STASH, BOB_STASH } from '../../node-mocks/data/addresses'
import { saveFile } from '../helpers/saveFile'

import { MemberMock } from './generateMembers'
import { ProposalMock } from './generateProposals'
import { WorkerMock } from './generateWorkers'
import { memberAt, randomBlock, randomFromRange, randomMember, repeat } from './utils'

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
    referendumStageRevealingOptionResults: [],
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
  referendumStageRevealingOptionResults: RawCouncilReferendumResultMock[]
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

  const electedAtBlock = randomFromRange(0, 10000)
  const council = {
    id: String(councilIndex),
    electedAtBlock,
    endedAtBlock: hasEnded ? randomFromRange(electedAtBlock, 100000) : null,
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

  const pastCandidacyStatusType = () =>
    faker.random.arrayElement(['CandidacyStatusWithdrawn', 'CandidacyStatusElected', 'CandidacyStatusLost'])
  const createCandidate = (candidateIndex: number, member = randomMember(mocks.members)) => ({
    id: `${council.id}-${candidateIndex}`,
    memberId: isFinished ? councilors[candidateIndex].memberId : member.id,
    electionRoundId: council.id,
    stake: isFinished ? councilors[candidateIndex].stake : randomFromRange(10000, 1000000),
    stakingAccountId: member.controllerAccount,
    rewardAccountId: member.rootAccount,
    statusType: isFinished ? pastCandidacyStatusType() : 'CandidacyStatusActive',
    note: faker.lorem.words(10),
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
    electedCouncilId: council.id,
  }

  const referendumResult: RawCouncilReferendumResultMock | undefined = isFinished
    ? {
        id: electionRound.id,
        referendumFinishedEvent: randomBlock(),
        electionRoundId: electionRound.id,
      }
    : undefined

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
          // Add a revealable vote (matching the local storage entry below) on the on going election
          // key: votes:4
          // value: [{"salt":"0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a","accountId":"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY","optionId":"0"}]
          createVote(22, {
            castBy: ALICE,
            commitment: '0xf633cd4396bde9b8fbf00be6cdacc471ae0215b15c6f1235554c059ed9187806',
            voteForId: undefined,
          }),
        ]),
  ]

  const referendumStageRevealingOptionResults = data.referendumStageRevealingOptionResults
  if (referendumResult) {
    referendumStageRevealingOptionResults.push(referendumResult)
  }

  return {
    councils: [...data.councils, council],
    councilors: [...data.councilors, ...councilors],
    electionRounds: [...data.electionRounds, electionRound],
    referendumStageRevealingOptionResults: referendumStageRevealingOptionResults,
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
