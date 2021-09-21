import { ElectedCouncilsFieldsFragment } from '@/council/queries'

import { asCouncilor, Councilor } from './Councilor'

export interface Council {
  id: string
  councilors: Councilor[]
}

export const asCouncil = (fields: ElectedCouncilsFieldsFragment): Council => ({
  id: fields.id,
  councilors: fields.councilMembers.map(asCouncilor),
})
