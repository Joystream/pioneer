import faker from 'faker'

import { Reducer } from '@/common/types/helpers'
import {
  RawCouncilCandidateMock,
  RawCouncilElectionMock,
  RawCouncilMock,
  RawCouncilorMock,
  RawCouncilVoteMock,
} from '@/mocks/data/seedCouncils'
import { RawNewMissedRewardLevelReachedEvent, RawProposalVotedEvent } from '@/mocks/data/seedEvents'

import rawProposals from '../../../../src/mocks/data/raw/proposals.json'
import rawWorkers from '../../../../src/mocks/data/raw/workers.json'
import { ALICE, ALICE_STASH, BOB_STASH } from '../../../node-mocks/data/addresses'
import { saveFile } from '../../helpers/saveFile'
import { memberAt, randomBlock, randomFromRange, randomMember, repeat } from '../utils'

const COUNCILS = 5

export const generateCouncils = () => {
  const data = Array.from({ length: COUNCILS }).reduce(generateCouncil, {
    councils: [],
    councilors: [],
    electionRounds: [],
    candidates: [],
    votes: [],
    proposalVotedEvents: [],
    newMissedRewardLevelReachedEvents: [],
  })
  Object.entries(data).forEach(([fileName, contents]) => saveFile(fileName, contents))
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

const generateCouncil: Reducer<CouncilData, any> = (data, _, councilIndex) => {
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
      memberId: randomMember().id,
      unpaidReward: Math.random() < 0.5 ? 0 : randomFromRange(1000, 100000),
      accumulatedReward: Math.random() < 0.5 ? 0 : randomFromRange(1000, 100000),
      stake: randomFromRange(10000, 1000000),
    }),
    isFinished ? randomFromRange(5, 8) : 0
  )

  const createCandidate = (candidateIndex: number, member = randomMember()) => ({
    id: `${council.id}-${candidateIndex}`,
    memberId: isFinished ? councilors[candidateIndex].memberId : member.id,
    electionRoundId: council.id,
    stake: isFinished ? councilors[candidateIndex].stake : randomFromRange(10000, 1000000),
    stakingAccountId: member.controllerAccount,
    rewardAccountId: member.rootAccount,
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
    candidates.push(createCandidate(candidates.length, memberAt(0)))
  }

  const voteKinds = ['APPROVE', 'REJECT', 'SLASH', 'ABSTAIN']
  if (hasEnded) {
    councilors.map((councilor) => {
      proposalVotedEvents.push({
        id: `${council.id}-${proposalVotedEvents.length}`,
        voterId: councilor.memberId,
        ...{ ...randomBlock(), inBlock: randomFromRange(council.electedAtBlock, council.endedAtBlock as number) },
        proposalId: rawProposals[randomFromRange(0, rawProposals.length - 1)].id,
        voteKind: voteKinds[randomFromRange(0, 3)],
        votingRound: 1,
      })
    })

    newMissedRewardLevelReachedEvents.push(
      ...repeat((eventIndex) => {
        const randomWorker = rawWorkers[randomFromRange(0, rawWorkers.length - 1)]

        return {
          id: `${council.id}-${eventIndex}`,
          groupId: randomWorker.groupId,
          workerId: randomWorker.id,
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

  const createVote = (voteIndex: number, override: Partial<RawCouncilVoteMock> = {}): RawCouncilVoteMock => ({
    electionRoundId: council.id,
    stake: randomFromRange(1, 10) * 1000,
    stakeLocked: isFinished ? Math.random() > 0.5 : true,
    castBy: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    voteForId: Math.random() > 0.5 ? candidates[randomFromRange(0, candidates.length - 1)].id : null,
    commitment: '0x0000000000000000000000000000000000000000000000000000000000000000',
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
            voteForId: null,
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
  handler: generateCouncils,
}
