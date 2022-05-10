import { asBlock, Block } from '@/common/types'
import { ElectedCouncilFieldsFragment } from '@/council/queries'

import { asCouncilor, Councilor } from './Councilor'

export interface ElectedCouncil {
  id: string
  electedAt: Block
  councilors: Councilor[]
  electionCycleId: number | undefined
}

export const asElectedCouncil = (fields: ElectedCouncilFieldsFragment): ElectedCouncil => ({
  id: fields.id,
  councilors: fields.councilMembers.map(asCouncilor),
  electionCycleId: fields.councilElections[0]?.cycleId,
  electedAt: asBlock({
    createdAt: fields.electedAtTime,
    inBlock: fields.electedAtBlock,
    network: fields.electedAtNetwork,
  }),
})
