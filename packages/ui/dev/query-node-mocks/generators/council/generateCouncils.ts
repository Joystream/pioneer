import faker from 'faker'

import { Reducer } from '@/common/types/helpers'
import { RawProposalVotedEventMock } from '@/mocks/data'
import {
  RawCouncilCandidateMock,
  RawCouncilElectionMock,
  RawCouncilMock,
  RawCouncilorMock,
  RawCouncilVoteMock,
} from '@/mocks/data/seedCouncils'

import rawProposals from '../../../../src/mocks/data/raw/proposals.json'
import { saveFile } from '../../helpers/saveFile'
import { memberAt, randomBlock, randomFromRange, randomFromWeightedSet, randomMember, repeat } from '../utils'

const COUNCILS = 5

// LocalStorage entry:
// key: votes:4
// value: [{"salt":"0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a","accountId":"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY","optionId":"0"}]
export const COMMITMENT = '0xf633cd4396bde9b8fbf00be6cdacc471ae0215b15c6f1235554c059ed9187806'

export const generateCouncils = () => {
  const data = Array.from({ length: COUNCILS }).reduce(generateCouncil, {
    councils: [],
    councilors: [],
    electionRounds: [],
    candidates: [],
    votes: [],
    proposalVotedEvents: [],
  })
  Object.entries(data).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

interface CouncilData {
  councils: RawCouncilMock[]
  councilors: RawCouncilorMock[]
  electionRounds: RawCouncilElectionMock[]
  candidates: RawCouncilCandidateMock[]
  votes: RawCouncilVoteMock[]
  proposalVotedEvents: RawProposalVotedEventMock[]
}

const generateCouncil: Reducer<CouncilData, any> = (data, _, councilIndex) => {
  const proposalVotedEvents: RawProposalVotedEventMock[] = []
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

  function createCandidate(candidateIndex: number, member: ReturnType<typeof randomMember>) {
    return {
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
    }
  }

  const candidates: RawCouncilCandidateMock[] = repeat(
    (candidateIndex) => createCandidate(candidateIndex, randomMember()),
    isFinished ? councilors.length : randomFromRange(5, 8)
  )

  if (!isFinished) {
    candidates.push(createCandidate(candidates.length - 1, memberAt(0)))
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
  }

  const electionRound: RawCouncilElectionMock = {
    id: council.id,
    cycleId: Number(council.id),
    isFinished,
    electedCouncilId: council.id,
  }

  const getCastBy = randomFromWeightedSet(
    [1, '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY'],
    [1, '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc'],
    [5, '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU']
  )

  const votes: RawCouncilVoteMock[] = repeat(
    () => ({
      electionRoundId: council.id,
      stake: randomFromRange(1, 10) * 1000,
      stakeLocked: isFinished ? Math.random() > 0.5 : true,
      castBy: getCastBy(),
      voteForId: Math.random() > 0.5 ? candidates[randomFromRange(0, candidates.length - 1)].memberId : null,
      commitment: COMMITMENT,
    }),
    randomFromRange(10, 20)
  )

  return {
    councils: [...data.councils, council],
    councilors: [...data.councilors, ...councilors],
    electionRounds: [...data.electionRounds, electionRound],
    candidates: [...data.candidates, ...candidates],
    votes: [...data.votes, ...votes],
    proposalVotedEvents: [...data.proposalVotedEvents, ...proposalVotedEvents],
  }
}

export const councilModule = {
  command: 'council',
  describe: 'Generate council from other mocks',
  handler: generateCouncils,
}
