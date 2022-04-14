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
import { BNSchema, minContext, maxContext, moreThanMixed, lessThanMixed } from '@/common/utils/validation'
import { MemberSchema } from '@/memberships/model/validation'

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

export const getSchemaFields = (state: AddBountyModalMachineState) => ({
  [AddBountyStates.generalParameters]: {
    title: state.context.title,
    coverPhotoLink: state.context.coverPhotoLink,
    creator: state.context.creator,
    description: state.context.description,
  },
  [AddBountyStates.fundingPeriodDetails]: {
    cherry: state.context.cherry,
    fundingMaximalRange: state.context.fundingMaximalRange,
    fundingMinimalRange: state.context.fundingMinimalRange,
    fundingPeriodLength: state.context.fundingPeriodLength?.toNumber(),
    fundingPeriodType: state.context.fundingPeriodType,
  },
  [AddBountyStates.workingPeriodDetails]: {
    workingPeriodLength: state.context.workingPeriodLength?.toNumber(),
    workingPeriodWhitelist: state.context.workingPeriodWhitelist,
    workingPeriodType: state.context.workingPeriodType,
    workingPeriodStake: state.context.workingPeriodStake,
  },
  [AddBountyStates.judgingPeriodDetails]: {
    oracle: state.context.oracle,
    judgingPeriodLength: state.context.judgingPeriodLength?.toNumber(),
  },
})

export const addBountyModalSchema = Yup.object().shape({
  [AddBountyStates.generalParameters]: Yup.object().shape({
    title: Yup.string().max(70, 'Max length is 70 characters').required(''),
    coverPhotoLink: Yup.string().url('Invalid URL').required(''),
    creator: MemberSchema.required(),
    description: Yup.string().required(),
  }),
  [AddBountyStates.fundingPeriodDetails]: Yup.object().shape({
    cherry: BNSchema.test(minContext('Cherry must be greater than minimum of ${min} JOY', 'minCherryLimit'))
      .test(maxContext('Cherry of ${max} JOY exceeds your balance', 'maxCherryLimit'))
      .required(''),
    fundingMaximalRange: BNSchema.test(moreThanMixed(0, 'Value must be greater than zero')).required(''),
    fundingMinimalRange: BNSchema.test('required', 'Minimal range is now required', (value, context) => {
      return !(context.parent.fundingPeriodType === 'limited' && !value)
    })
      .test(lessThanMixed(Yup.ref('fundingMaximalRange'), 'Minimal range cannot be greater than maximal'))
      .test(minContext('Minimal range must be bigger than ${min}', 'minFundingLimit')),
    fundingPeriodLength: Yup.number().test((value, context) => {
      if (context.parent.fundingPeriodType !== 'limited') {
        return true
      }
      if (!value) {
        return context.createError({ message: 'Funding period length is required' })
      }
      return true
    }),
    fundingPeriodType: Yup.string(),
  }),
  [AddBountyStates.workingPeriodDetails]: Yup.object().shape({
    workingPeriodStake: BNSchema.test(
      minContext('Entrant stake must be greater than minimum of ${min} JOY', 'minWorkEntrantStake')
    ).required(''),
    workingPeriodLength: Yup.number().min(1, 'Value must be greater than zero').required(),
    workingPeriodType: Yup.string(),
    workingPeriodWhitelist: Yup.array().test((value, context) => {
      if (!value) {
        return true
      }

      const validationContext = context.options.context as Conditions
      if (context.parent.workingPeriodType === 'closed') {
        return value.length > 0 && (validationContext.maxWhitelistSize ?? BN_ZERO).gten(value.length)
      }

      return true
    }),
  }),
  [AddBountyStates.judgingPeriodDetails]: Yup.object().shape({
    oracle: MemberSchema.required(),
    judgingPeriodLength: Yup.number().min(1, 'Value must be greater than zero').required(),
  }),
})

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
