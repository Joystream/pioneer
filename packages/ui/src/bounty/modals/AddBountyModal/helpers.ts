import { IBountyMetadata, IBountyWorkData } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import { BountyCreationParameters } from '@joystream/types/augment'
import { AssuranceContractType_Closed } from '@joystream/types/bounty'
import { MemberId } from '@joystream/types/common'
import { ThreadId } from '@joystream/types/src/common'
import { AugmentedConst } from '@polkadot/api/types'
import { u32 } from '@polkadot/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import BN from 'bn.js'
import Long from 'long'
import * as Yup from 'yup'

import { AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { SubmitWorkModalMachineState } from '@/bounty/modals/SubmitWorkModal/machine'
import { BN_ZERO } from '@/common/constants'
import { whenDefined } from '@/common/utils'
import { BNSchema, minContext, maxContext, moreThanMixed, lessThanMixed } from '@/common/utils/validation'
import { MemberSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'

export interface Conditions {
  isThreadCategoryLoading?: boolean
  minCherryLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxCherryLimit?: BN
  minFundingLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxWhitelistSize?: u32 & AugmentedConst<'rxjs'>
  minWorkEntrantStake?: BalanceOf & AugmentedConst<'rxjs'>
}

export type IFormFields = Required<typeof formDefaultValues>

export const formDefaultValues = {
  [AddBountyStates.generalParameters]: {
    creator: undefined,
    title: undefined,
    coverPhotoLink: undefined,
    description: undefined,
  },
  [AddBountyStates.fundingPeriodDetails]: {
    isPerpetual: true,
    cherry: undefined,
    fundingPeriodLength: undefined,
    fundingMinimalRange: undefined,
    fundingMaximalRange: undefined,
  },
  [AddBountyStates.workingPeriodDetails]: {
    isWorkingPeriodOpen: true,
    workingPeriodWhitelist: [],
    workingPeriodLength: undefined,
    workingPeriodStake: undefined,
  },
  [AddBountyStates.judgingPeriodDetails]: {
    oracle: undefined,
    judgingPeriodLength: undefined,
  },
}

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
    fundingMinimalRange: BNSchema.when('isPerpetual', {
      is: false,
      then: BNSchema.test(minContext('Minimal range must be bigger than ${min}', 'minFundingLimit'))
        .test(lessThanMixed(Yup.ref('fundingMaximalRange'), 'Minimal range cannot be greater than maximal'))
        .required(''),
    }),
    fundingPeriodLength: Yup.number().when('isPerpetual', {
      is: false,
      then: Yup.number().min(1).required(),
    }),
    isPerpetual: Yup.boolean(),
  }),
  [AddBountyStates.workingPeriodDetails]: Yup.object().shape({
    workingPeriodStake: BNSchema.test(
      minContext('Entrant stake must be greater than minimum of ${min} JOY', 'minWorkEntrantStake')
    ).required(''),
    workingPeriodLength: Yup.number().min(1, 'Value must be greater than zero').required(),
    isWorkingPeriodOpen: Yup.boolean(),
    workingPeriodWhitelist: Yup.array().when('isWorkingPeriodOpen', {
      is: false,
      then: Yup.array().test((value, context) => {
        if (!value) {
          return true
        }

        const validationContext = context.options.context as Conditions
        return value.length > 0 && (validationContext.maxWhitelistSize ?? BN_ZERO).gten(value.length)
      }),
    }),
  }),
  [AddBountyStates.judgingPeriodDetails]: Yup.object().shape({
    oracle: MemberSchema.required(),
    judgingPeriodLength: Yup.number().min(1, 'Value must be greater than zero').required(),
  }),
})

export const createBountyParametersFactory = (state: IFormFields): BountyCreationParameters =>
  createType<BountyCreationParameters, 'BountyCreationParameters'>('BountyCreationParameters', {
    oracle: createType('BountyActor', {
      Member: createType<MemberId, 'MemberId'>(
        'MemberId',
        Number((state.judgingPeriodDetails.oracle as any as Member)?.id || 0)
      ),
    }),
    contract_type: createType('AssuranceContractType', contractTypeFactory(state)),
    creator: createType('BountyActor', {
      Member: createType<MemberId, 'MemberId'>(
        'MemberId',
        Number((state.generalParameters.creator as any as Member)?.id || 0)
      ),
    }),
    cherry: createType('u128', state.fundingPeriodDetails.cherry || 0),
    entrant_stake: createType('u128', state.workingPeriodDetails.workingPeriodStake || 0),
    funding_type: createType('FundingType', fundingTypeFactory(state)),
    work_period: createType('u32', state.workingPeriodDetails.workingPeriodLength || 0),
    judging_period: createType('u32', state.judgingPeriodDetails.judgingPeriodLength || 0),
  })

const contractTypeFactory = (state: IFormFields) => {
  if (state.workingPeriodDetails.isWorkingPeriodOpen) {
    return {
      Open: null,
    }
  }

  const whiteList =
    state.workingPeriodDetails.workingPeriodWhitelist?.map((memberId) =>
      createType<MemberId, 'MemberId'>('MemberId', Number(memberId))
    ) ?? []
  return {
    Closed: createType<AssuranceContractType_Closed, 'AssuranceContractType_Closed'>(
      'AssuranceContractType_Closed',
      whiteList
    ),
  }
}

const fundingTypeFactory = (state: IFormFields) => {
  if (state.fundingPeriodDetails.isPerpetual) {
    return {
      Perpetual: createType('FundingType_Perpetual', {
        target: createType('u128', state.fundingPeriodDetails.fundingMaximalRange || 0),
      }),
    }
  }

  return {
    Limited: createType('FundingType_Limited', {
      min_funding_amount: createType('u128', state.fundingPeriodDetails.fundingMinimalRange || 0),
      max_funding_amount: createType('u128', state.fundingPeriodDetails.fundingMaximalRange || 0),
      funding_period: createType('u32', state.fundingPeriodDetails.fundingPeriodLength || 0),
    }),
  }
}

export const createBountyMetadataFactory = (state: IFormFields, newThreadId: ThreadId): IBountyMetadata => ({
  title: state.generalParameters.title,
  description: state.generalParameters.description,
  bannerImageUri: state.generalParameters.coverPhotoLink,
  discussionThread: whenDefined(newThreadId, (id) => Long.fromString(String(id))),
})

export const submitWorkMetadataFactory = (state: SubmitWorkModalMachineState): IBountyWorkData => ({
  title: state.context.workTitle,
  description: state.context.workDescription,
})
