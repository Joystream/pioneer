import BN from 'bn.js'

import { getFundingPeriodLength, getSecondsPast } from '@/bounty/helpers'
import { BountyFundingType, BountyStage as SchemaBountyStage } from '@/common/api/queries'
import { SECONDS_PER_BLOCK } from '@/common/constants'
import { lowerFirstLetter } from '@/common/helpers'
import { asBlock, maybeAsBlock } from '@/common/types'
import { asMember } from '@/memberships/types'

import {
  BountyContributionFieldsFragment,
  BountyEntryWithDetailsFieldsFragment,
  BountyFieldsFragment,
  BountyWorkFieldsFragment,
  BountyWorkWithDetailsFieldsFragment,
} from '../queries'

import {
  Bounty,
  BountyContribution,
  BountyPeriod,
  BountyStage,
  BountyWork,
  Contributor,
  FundingType,
  WorkEntry,
  WorkInfo,
} from './Bounty'

export const asPeriod = (stage: BountyStage): BountyPeriod => {
  switch (stage) {
    case 'successful':
      return 'successful'
    case 'failed':
      return 'failed'
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

export const asBountyFunding = (field: BountyFundingType): FundingType => {
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

const asWorkInfo = (work: BountyWorkFieldsFragment): WorkInfo => ({
  id: work.id,
  title: work.title ?? '',
  description: work.description ?? '',
})

const asEntry = (bountyId: string, stake: BN): ((entry: BountyEntryWithDetailsFieldsFragment) => WorkEntry) => {
  return (entry) => ({
    id: entry.id,
    bountyId,
    stake,
    worker: asMember(entry.worker),
    hasSubmitted: entry.workSubmitted,
    status: entry.status.__typename,
    winner: entry.status.__typename === 'BountyEntryStatusWinner',
    works: entry.works?.map(asWorkInfo),
    passed: entry.status.__typename === 'BountyEntryStatusPassed',
    rejected: entry.status.__typename === 'BountyEntryStatusRejected',
    withdrawn: entry.status.__typename === 'BountyEntryStatusWithdrawn',
    hasCashedOut: !!entry.withdrawnInEvent,
    reward: 'reward' in entry.status ? new BN(entry.status.reward) : undefined,
  })
}

export const asContributor = ({
  amount,
  contributor,
  withdrawnInEvent,
}: BountyContributionFieldsFragment): Contributor => ({
  hasWithdrawn: !!withdrawnInEvent?.id,
  amount: new BN(amount),
  actor: contributor ? asMember(contributor) : undefined,
})

export const asBountyWork =
  (worker: BountyWorkWithDetailsFieldsFragment['worker'], entryStatus: BountyWorkWithDetailsFieldsFragment['status']) =>
  (fields: NonNullable<BountyWorkWithDetailsFieldsFragment['works']>[number]): BountyWork => ({
    id: fields.id,
    title: fields.title ?? '',
    description: fields.description ?? '',
    worker: asMember(worker),
    status: entryStatus.__typename,
    inBlock: asBlock(fields),
  })

export const periodBlockLeft = (fields: BountyFieldsFragment) => {
  const blockSinceCreation = getSecondsPast(fields.createdAt) / SECONDS_PER_BLOCK
  switch (fields.stage) {
    case 'WorkSubmission': {
      if (fields.maxFundingReachedEvent?.createdAt) {
        return fields.workPeriod - getSecondsPast(fields.maxFundingReachedEvent.createdAt) / SECONDS_PER_BLOCK
      }

      if (fields.fundingType.__typename === 'BountyFundingLimited') {
        return (
          fields.workPeriod + (getFundingPeriodLength(asBountyFunding(fields.fundingType)) ?? 0) - blockSinceCreation
        )
      }

      return undefined
    }
    case 'Judgment': {
      if (fields.maxFundingReachedEvent?.createdAt) {
        return (
          fields.workPeriod +
          fields.judgingPeriod -
          getSecondsPast(fields.maxFundingReachedEvent.createdAt) / SECONDS_PER_BLOCK
        )
      }

      if (fields.fundingType.__typename === 'BountyFundingLimited') {
        return (
          fields.workPeriod +
          (getFundingPeriodLength(asBountyFunding(fields.fundingType)) ?? 0) +
          fields.judgingPeriod -
          blockSinceCreation
        )
      }

      return undefined
    }
    case 'Funding': {
      const fundingPeriodTime = getFundingPeriodLength(asBountyFunding(fields.fundingType))
      return fundingPeriodTime ? fundingPeriodTime - blockSinceCreation : undefined
    }
  }
}

export const asBounty = (fields: BountyFieldsFragment): Bounty => ({
  id: fields.id,
  title: fields.title ?? '',
  description: fields.description ?? '',
  imageUri: fields.bannerImageUri ?? undefined,
  createdAt: fields.createdAt,
  discussionThreadId: fields.discussionThreadId ?? undefined,
  cherry: new BN(fields.cherry),
  entrantStake: new BN(fields.entrantStake),
  entrantWhitelist: fields.entrantWhitelist?.members.map((member) => member.id),
  // undefined creator/oracle means that it's council, not member
  creator: fields.creator ? asMember(fields.creator) : undefined,
  oracle: fields.oracle ? asMember(fields.oracle) : undefined,
  fundingType: asBountyFunding(fields.fundingType),
  workPeriod: fields.workPeriod,
  judgingPeriod: fields.judgingPeriod,
  stage: asStage(fields.stage),
  isTerminated: fields.isTerminated,
  totalFunding: new BN(fields.totalFunding),
  entries: fields.entries?.map(asEntry(fields.id, new BN(fields.entrantStake))),
  contributors: fields.contributions?.map(asContributor) ?? [],
  inBlock: fields.createdInEvent.inBlock,
  judgement: {
    inBlock: maybeAsBlock(fields.judgment?.inBlock, fields.judgment?.createdAt, fields.judgment?.network),
    rationale: fields.judgment?.rationale,
  },
  periodTimeLeft: periodBlockLeft(fields),
})

export const asContribution = (fields: BountyContributionFieldsFragment): BountyContribution => ({
  id: fields.id,
  amount: new BN(fields.amount),
  contributor: fields.contributor ? asMember(fields.contributor) : undefined,
})
