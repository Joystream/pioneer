import { ElectedCouncilsFieldsFragment } from '@/council/queries'

import { asCouncilor, Councilor } from './Councilor'

export interface Council {
  id: string
  electedAtBlock: number
  councilors: Councilor[]
}

export const asCouncil = (fields: ElectedCouncilsFieldsFragment): Council => ({
  id: fields.id,
  electedAtBlock: fields.electedAtBlock,
  councilors: fields.councilMembers.map(asCouncilor),
})
