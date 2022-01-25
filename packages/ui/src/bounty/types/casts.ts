import BN from 'bn.js'

import { BountyFundingType, BountyStage as SchemaBountyStage } from '@/common/api/queries'
import { lowerFirstLetter } from '@/common/helpers'
import { asMember } from '@/memberships/types'

import { BountyContributionFieldsFragment, BountyFieldsFragment, BountyWorkFieldsFragment } from '../queries'

import {
  Bounty,
  BountyPeriod,
  BountyStage,
  WorkEntry,
  FundingType,
  ContractType,
  Contributor,
  BountyWork,
  BountyEntryStatus,
  BountyContribution,
} from './Bounty'

export const asPeriod = (stage: BountyStage): BountyPeriod => {
  switch (stage) {
    case 'successful':
    case 'failed':
      return 'withdrawal'
    case 'workSubmission':
      return 'working'
    case 'judgment':
      return 'judgement'
    case 'terminated':
      return 'terminated'
    default:
      return stage as BountyPeriod
  }
}

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

const asEntries = (entriesFields: BountyFieldsFragment['entries']): WorkEntry[] | undefined => {
  return entriesFields?.map((entry) => {
    return {
      id: entry.id,
      bountyId: entry.bountyId,
      worker: asMember(entry.worker),
      hasSubmitted: entry.workSubmitted,
      status: asBountyEntryStatus(entry.status),
      winner: entry.status.__typename === 'BountyEntryStatusWinner',
      works: entry.works?.map((work) => ({ id: work.id, title: work.title, description: work.description })),
      passed: entry.status.__typename === 'BountyEntryStatusPassed',
      rejected: entry.status.__typename === 'BountyEntryStatusRejected',
      withdrawn: entry.status.__typename === 'BountyEntryStatusWithdrawn',
      stake: entry.stake,
    }
  })
}

const asContractType = (type: BountyFieldsFragment['contractType']): ContractType => {
  return type.__typename === 'BountyContractOpen'
    ? 'ContractOpen'
    : {
        whitelist: type.whitelist?.map((member) => member.id) || [],
      }
}

export const asContributors = (contributors: BountyFieldsFragment['contributions']): Contributor[] => {
  return (
    contributors?.map(({ amount, contributor }) => ({
      amount,
      actor: contributor ? asMember(contributor) : undefined,
    })) || []
  )
}

const asBountyEntryStatus = (field: BountyWorkFieldsFragment['entry']['status']): BountyEntryStatus => {
  if (field.__typename === 'BountyEntryStatusWinner') {
    return {
      reward: field.reward,
    }
  }

  return field.__typename
}

export const asBountyWork = (fields: BountyWorkFieldsFragment): BountyWork => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  worker: asMember(fields.entry.worker),
  status: asBountyEntryStatus(fields.entry.status),
  inBlock: {
    number: fields.inBlock,
    network: fields.network,
    timestamp: fields.createdAt,
  },
})

export const asBounty = (fields: BountyFieldsFragment): Bounty => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  imageUri: fields.bannerImageUri,
  createdAt: fields.createdAt,
  discussionThreadId: fields.discussionThreadId,
  cherry: new BN(fields.cherry),
  entrantStake: new BN(fields.entrantStake),
  // undefined creator/oracle means that it's council, not member
  creator: fields.creator ? asMember(fields.creator) : undefined,
  oracle: fields.oracle ? asMember(fields.oracle) : undefined,
  fundingType: asFunding(fields.fundingType),
  workPeriod: fields.workPeriod,
  judgingPeriod: fields.judgingPeriod,
  stage: asStage(fields.stage),
  totalFunding: new BN(fields.totalFunding),
  entries: asEntries(fields.entries),
  contractType: asContractType(fields.contractType),
  contributors: asContributors(fields.contributions),
  inBlock: fields.createdInEvent.inBlock,
})

export const asContribution = (fields: BountyContributionFieldsFragment): BountyContribution => ({
  id: fields.id,
  amount: new BN(fields.amount),
  contributor: fields.contributor ? asMember(fields.contributor) : undefined,
})
