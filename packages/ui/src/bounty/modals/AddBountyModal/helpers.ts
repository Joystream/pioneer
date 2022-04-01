import { IBountyMetadata, IBountyWorkData } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import { BountyCreationParameters } from '@joystream/types/augment'
import { AssuranceContractType_Closed } from '@joystream/types/bounty'
import { MemberId } from '@joystream/types/common'
import { AugmentedConst } from '@polkadot/api/types'
import { u32 } from '@polkadot/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import BN from 'bn.js'
import Long from 'long'
import * as Yup from 'yup'

import { AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { SubmitWorkModalMachineState } from '@/bounty/modals/SubmitWorkModal/machine'
import { BN_ZERO } from '@/common/constants'
import { whenDefined } from '@/common/utils'

export interface Conditions {
  isThreadCategoryLoading?: boolean
  minCherryLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxCherryLimit?: BN
  minFundingLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxWhitelistSize?: u32 & AugmentedConst<'rxjs'>
  minWorkEntrantStake?: BalanceOf & AugmentedConst<'rxjs'>
  isLimited: boolean
}

export const isUrlValid = (value: string) => {
  return Yup.string().required().url().isValidSync(value)
}

export const isNextStepValid = (state: AddBountyModalMachineState, conditions: Conditions): boolean => {
  const { context } = state
  switch (true) {
    case state.matches(AddBountyStates.generalParameters): {
      return !!(context.creator && context.description && context.title && isUrlValid(context.coverPhotoLink ?? ''))
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
      const stake = context.workingPeriodStake && conditions.minWorkEntrantStake?.lt(context.workingPeriodStake)
      const type = !!(context.workingPeriodType === 'closed'
        ? context.workingPeriodWhitelist?.length &&
          conditions.maxWhitelistSize?.gtn(context.workingPeriodWhitelist.length)
        : true)

      return !!(stake && type && context.workingPeriodLength)
    }
    case state.matches(AddBountyStates.judgingPeriodDetails): {
      return !!(context.oracle && context.judgingPeriodLength && !conditions.isThreadCategoryLoading)
    }
    default:
      return false
  }
}

export const createBountyParametersFactory = (state: AddBountyModalMachineState): BountyCreationParameters =>
  createType<BountyCreationParameters, 'BountyCreationParameters'>('BountyCreationParameters', {
    oracle: createType('BountyActor', {
      Member: createType<MemberId, 'MemberId'>('MemberId', Number(state.context.oracle?.id || 0)),
    }),
    contract_type: createType('AssuranceContractType', contractTypeFactory(state)),
    creator: createType('BountyActor', {
      Member: createType<MemberId, 'MemberId'>('MemberId', Number(state.context.creator?.id || 0)),
    }),
    cherry: createType('u128', state.context.cherry || 0),
    entrant_stake: createType('u128', state.context.workingPeriodStake || 0),
    funding_type: createType('FundingType', fundingTypeFactory(state)),
    work_period: createType('u32', state.context.workingPeriodLength || 0),
    judging_period: createType('u32', state.context.judgingPeriodLength || 0),
  })

const contractTypeFactory = (state: AddBountyModalMachineState) => {
  if (state.context.workingPeriodType === 'open') {
    return {
      Open: null,
    }
  }

  const whiteList =
    state.context.workingPeriodWhitelist?.map((memberId) =>
      createType<MemberId, 'MemberId'>('MemberId', Number(memberId))
    ) ?? []
  return {
    Closed: createType<AssuranceContractType_Closed, 'AssuranceContractType_Closed'>(
      'AssuranceContractType_Closed',
      whiteList
    ),
  }
}

const fundingTypeFactory = (state: AddBountyModalMachineState) => {
  if (state.context.fundingPeriodType === 'perpetual') {
    return {
      Perpetual: createType('FundingType_Perpetual', {
        target: createType('u128', state.context.fundingMaximalRange || 0),
      }),
    }
  }

  return {
    Limited: createType('FundingType_Limited', {
      min_funding_amount: createType('u128', state.context.fundingMinimalRange || 0),
      max_funding_amount: createType('u128', state.context.fundingMaximalRange || 0),
      funding_period: createType('u32', state.context.fundingPeriodLength || 0),
    }),
  }
}

export const createBountyMetadataFactory = (state: AddBountyModalMachineState): IBountyMetadata => ({
  title: state.context.title,
  description: state.context.description,
  bannerImageUri: state.context.coverPhotoLink,
  discussionThread: whenDefined(state.context.newThreadId, (id) => Long.fromString(String(id))),
})

export const submitWorkMetadataFactory = (state: SubmitWorkModalMachineState): IBountyWorkData => ({
  title: state.context.workTitle,
  description: state.context.workDescription,
})
