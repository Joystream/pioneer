import faker from 'faker'

import { Reducer } from '@/common/types/helpers'
import {
  RawCouncilCandidateMock,
  RawCouncilElectionMock,
  RawCouncilMock,
  RawCouncilorMock,
} from '@/mocks/data/seedCouncils'

import { saveFile } from '../../helpers/saveFile'
import { randomFromRange, randomMember, repeat } from '../utils'

const COUNCILS = 5

export const generateCouncils = () => {
  const data = Array.from({ length: COUNCILS }).reduce(generateCouncil, {
    councils: [],
    councilors: [],
    electionRounds: [],
    candidates: [],
  })
  Object.entries(data).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

interface CouncilData {
  councils: RawCouncilMock[]
  councilors: RawCouncilorMock[]
  electionRounds: RawCouncilElectionMock[]
  candidates: RawCouncilCandidateMock[]
}

const generateCouncil: Reducer<CouncilData, any> = (data, _, councilIndex) => {
  const isFinished = councilIndex !== COUNCILS - 1
  const hasEnded = councilIndex < COUNCILS - 2

  const council = {
    id: String(councilIndex),
    electedAtBlock: randomFromRange(10000, 1000000),
    endedAtBlock: hasEnded ? randomFromRange(10000, 1000000) : null,
  }

  const councilors: RawCouncilorMock[] = repeat(
    (councilorIndex) => ({
      id: `${council.id}-${councilorIndex}`,
      electedInCouncilId: council.id,
      memberId: randomMember().id,
      unpaidReward: Math.random() < 0.5 ? 0 : randomFromRange(1000, 100000),
      stake: randomFromRange(10000, 1000000),
    }),
    isFinished ? randomFromRange(5, 8) : 0
  )

  const candidates: RawCouncilCandidateMock[] = repeat(
    (candidateIndex) => {
      const member = randomMember()
      return {
        id: `${council.id}-${candidateIndex}`,
        memberId: isFinished ? councilors[candidateIndex].memberId : member.id,
        electionRoundId: council.id,
        stake: isFinished ? councilors[candidateIndex].stake : randomFromRange(10000, 1000000),
        stakingAccountId: member.controllerAccount,
        rewardAccountId: member.rootAccount,
        note: faker.lorem.words(10),
      }
    },
    isFinished ? councilors.length : randomFromRange(5, 8)
  )

  const electionRound: RawCouncilElectionMock = {
    id: council.id,
    cycleId: Number(council.id),
    isFinished,
    electedCouncilId: council.id,
  }

  return {
    councils: [...data.councils, council],
    councilors: [...data.councilors, ...councilors],
    electionRounds: [...data.electionRounds, electionRound],
    candidates: [...data.candidates, ...candidates],
  }
}

export const councilModule = {
  command: 'council',
  describe: 'Generate council from other mocks',
  handler: generateCouncils,
}
