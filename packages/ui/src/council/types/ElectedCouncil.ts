import { ElectedCouncilFieldsFragment } from '@/council/queries'

import { asCouncilor, Councilor } from './Councilor'

export interface ElectedCouncil {
  id: string
  electedAtBlock: number
  councilors: Councilor[]
}

export const asElectedCouncil = (fields: ElectedCouncilFieldsFragment): ElectedCouncil => ({
  id: fields.id,
  electedAtBlock: fields.electedAtBlock,
  councilors: fields.councilMembers.map(asCouncilor),
})
