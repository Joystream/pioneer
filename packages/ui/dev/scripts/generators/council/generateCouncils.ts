import { Reducer } from '@/common/types/helpers'
import { RawCouncilMock, RawCouncilorMock } from '@/mocks/data/seedCouncils'

import { saveFile } from '../../helpers/saveFile'
import { randomFromRange, randomMember, repeat } from '../utils'

const COUNCILOR_PER_COUNCIL = 6

export const generateCouncils = () => {
  const data = Array.from({ length: 1 }).reduce(generateCouncil, { councils: [], councilors: [] })
  Object.entries(data).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

interface CouncilData {
  councils: RawCouncilMock[]
  councilors: RawCouncilorMock[]
}
const generateCouncil: Reducer<CouncilData, any> = (data, _, councilIndex) => {
  const council = {
    id: String(councilIndex),
    endedAtBlock: null,
  }

  const councilors = repeat(
    (index) => ({
      id: `${council.id}-${index}`,
      electedInCouncilId: council.id,
      memberId: randomMember().id,
      unpaidReward: Math.random() < 0.5 ? 0 : randomFromRange(1000, 100000),
      stake: randomFromRange(10000, 1000000),
    }),
    COUNCILOR_PER_COUNCIL
  )

  return { councils: [...data.councils, council], councilors: [...data.councilors, ...councilors] }
}

export const councilModule = {
  command: 'council',
  describe: 'Generate council from other mocks',
  handler: generateCouncils,
}
