import BN from 'bn.js'

import { BountyFundingType, BountyStage as SchemaBountyStage } from '@/common/api/queries'
import { lowerFirstLetter } from '@/common/helpers'
import { asMember } from '@/memberships/types'

import { BountyFieldsFragment } from '../queries'

import { Bounty, BountyStage, EntryMiniature, FundingType } from './Bounty'

const asFunding = (field: BountyFundingType): FundingType => {
  if (field.__typename === 'BountyFundingPerpetual') {
    return { target: new BN(field.target) }
  }
  return {
    minAmount: new BN(field.minFundingAmount),
    maxAmount: new BN(field.maxFundingAmount),
    maxPeriod: field.fundingPeriod,
  }
}

const asStage = (stageField: SchemaBountyStage): BountyStage => {
  return lowerFirstLetter(`${stageField}`) as BountyStage
}

const asEntries = (entriesFields: BountyFieldsFragment['entries']): EntryMiniature[] | undefined => {
  return entriesFields?.map((entry) => {
    return {
      createdById: entry.createdById,
      winner: entry.status.__typename === 'BountyEntryStatusWinner',
    }
  })
}

export const asBounty = (fields: BountyFieldsFragment): Bounty => ({
  id: fields.id,
  title: fields.title,
  createdAt: fields.createdAt,
  cherry: new BN(fields.cherry),
  entrantStake: new BN(fields.entrantStake),
  // undefined creator/oracle means that it's council, not member
  creator: fields.creator ? asMember(fields.creator) : undefined,
  oracle: fields.creator ? asMember(fields.creator) : undefined,
  fundingType: asFunding(fields.fundingType),
  workPeriod: new BN(fields.workPeriod),
  judgingPeriod: new BN(fields.judgingPeriod),
  stage: asStage(fields.stage),
  totalFunding: new BN(fields.totalFunding),
  entries: asEntries(fields.entries),
})
