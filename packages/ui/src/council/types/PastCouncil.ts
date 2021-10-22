import { PastCouncilDetailedFieldsFragment, PastCouncilFieldsFragment } from '@/council/queries'
import { asCouncilor, Councilor } from '@/council/types/Councilor'

export interface PastCouncil {
  id: string
  endedAtBlock: number
}

export interface PastCouncilWithDetails extends PastCouncil {
  councilors: Councilor[]
}

export const asPastCouncil = (fields: PastCouncilFieldsFragment): PastCouncil => ({
  id: fields.id,
  endedAtBlock: fields.endedAtBlock as number,
})

export const asPastCouncilWithDetails = (fields: PastCouncilDetailedFieldsFragment): PastCouncilWithDetails => ({
  ...asPastCouncil(fields),
  councilors: fields.councilMembers.map(asCouncilor),
})
