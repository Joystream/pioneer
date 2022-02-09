import { createType } from '@joystream/types'
import { AugmentedConst } from '@polkadot/api/types'
import { u32 } from '@polkadot/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import BN from 'bn.js'

import { AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { SubmitWorkModalMachineState } from '@/bounty/modals/SubmitWorkModal/machine'
import { BN_ZERO } from '@/common/constants'

import { BountyCreationParameters } from '../../../../../types/augment'

interface Conditions {
  minCherryLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxCherryLimit?: BN
  minFundingLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxWhitelistSize?: u32 & AugmentedConst<'rxjs'>
  minWorkEntrantStake?: BalanceOf & AugmentedConst<'rxjs'>
}

export const isNextStepValid = (state: AddBountyModalMachineState, conditions: Conditions): boolean => {
  const { context } = state
  switch (true) {
    case state.matches(AddBountyStates.generalParameters): {
      return !!(context.creator && context.description && context.title && context.coverPhotoLink)
    }
    case state.matches(AddBountyStates.fundingPeriodDetails): {
      const isLimited = context.fundingPeriodType === 'limited'
      const limitedConditions = isLimited
        ? context.fundingPeriodLength &&
          context.fundingMinimalRange &&
          context.fundingMinimalRange.gtn(conditions.minFundingLimit?.toNumber() || 0) &&
          context.fundingMinimalRange.lt(context.fundingMaximalRange || BN_ZERO)
        : true
      const cherryConditions =
        context.cherry?.lte(conditions.maxCherryLimit || BN_ZERO) &&
        context.cherry?.gten(conditions.minCherryLimit?.toNumber() || 0)

      return !!(
        context.cherry &&
        cherryConditions &&
        context.fundingMaximalRange &&
        context.fundingMaximalRange.gtn(0) &&
        limitedConditions
      )
    }
    case state.matches(AddBountyStates.workingPeriodDetails): {
      const stake = !!(context.workingPeriodStakeAllowance
        ? context.workingPeriodStake && conditions.minWorkEntrantStake?.lt(context.workingPeriodStake)
        : true)
      const type = !!(context.workingPeriodType === 'closed'
        ? context.workingPeriodWhitelist?.length &&
          conditions.maxWhitelistSize?.gtn(context.workingPeriodWhitelist.length)
        : true)

      return !!(stake && type && context.workingPeriodLength)
    }
    case state.matches(AddBountyStates.judgingPeriodDetails): {
      return !!(context.oracle && context.judgingPeriodLength)
    }
    case state.matches(AddBountyStates.forumThreadDetails): {
      return !!(context.forumThreadTopic && context.forumThreadDescription)
    }
    default:
      return false
  }
}

export const createBountyParametersFactory = (state: AddBountyModalMachineState): BountyCreationParameters =>
  createType('BountyCreationParameters', {
    oracle: createType('BountyActor', {
      Member: createType('u64', Number(state.context.oracle?.id || 0)),
    }),
    contract_type: createType('AssuranceContractType', {
      Closed: new Set(
        state.context.workingPeriodWhitelist?.map((memberId) => createType('u64', Number(memberId))) || []
      ),
    }),
    creator: createType('BountyActor', {
      Member: createType('u64', Number(state.context.creator || 0)),
    }),
    cherry: createType('u128', state.context.cherry || 0),
    entrant_stake: createType('u128', state.context.workingPeriodStake || 0),
    funding_type: createType('FundingType', {
      Perpetual: createType('FundingType_Perpetual', {
        target: createType('u128', state.context.fundingMaximalRange || 0),
      }),
      Limited: createType('FundingType_Limited', {
        min_funding_amount: createType('u128', state.context.fundingMinimalRange || 0),
        max_funding_amount: createType('u128', state.context.fundingMaximalRange || 0),
        funding_period: createType('u32', state.context.fundingPeriodLength || 0),
      }),
    }),
    work_period: createType('u128', state.context.workingPeriodLength || 0),
    judging_period: createType('u128', state.context.judgingPeriodLength || 0),
  })

export const createBountyMetadataFactory = (state: AddBountyModalMachineState) => {
  const buffer = Buffer.from(
    JSON.stringify({
      title: state.context.title,
      description: state.context.description,
      photo_url: state.context.coverPhotoLink,
    })
  )
  return createType('Bytes', '0x' + buffer)
}

export const submitWorkMetadataFactory = (state: SubmitWorkModalMachineState) => {
  const buffer = Buffer.from(
    JSON.stringify({
      workTitle: state.context.workTitle,
      workDescription: state.context.workDescription,
    })
  )
  return createType('Bytes', '0x' + buffer)
}
