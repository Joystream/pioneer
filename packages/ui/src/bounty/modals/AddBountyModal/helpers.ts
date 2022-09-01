import { IBountyMetadata, IBountyWorkData } from '@joystream/metadata-protobuf'
import { AugmentedConst } from '@polkadot/api/types'
import { u32, u64 } from '@polkadot/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import BN from 'bn.js'
import Long from 'long'
import * as Yup from 'yup'

import { CurrencyName } from '@/app/constants/currency'
import { AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { SubmitWorkModalMachineState } from '@/bounty/modals/SubmitWorkModal/machine'
import { BN_ZERO } from '@/common/constants'
import { createType } from '@/common/model/createType'
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

export interface AddBountyFrom {
  [AddBountyStates.generalParameters]: {
    creator?: Member
    title?: string
    coverPhotoLink?: string
    description?: string
  }
  [AddBountyStates.fundingPeriodDetails]: {
    isPerpetual: boolean
    cherry?: BN
    fundingPeriodLength?: BN
    fundingMinimalRange?: BN
    fundingMaximalRange?: BN
  }
  [AddBountyStates.workingPeriodDetails]: {
    isWorkingPeriodOpen: boolean
    workingPeriodWhitelist: Member[]
    workingPeriodLength?: BN
    workingPeriodStake?: BN
  }
  [AddBountyStates.judgingPeriodDetails]: {
    oracle?: Member
    judgingPeriodLength?: BN
  }
}

export const formDefaultValues: AddBountyFrom = {
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
    title: Yup.string().max(70, 'Max length is 70 characters').required('Bounty title is required'),
    coverPhotoLink: Yup.string().url('Invalid URL'),
    creator: MemberSchema.required(),
    description: Yup.string().required(),
  }),
  [AddBountyStates.fundingPeriodDetails]: Yup.object().shape({
    cherry: BNSchema.test(
      minContext(`Cherry must be greater than minimum of \${min} ${CurrencyName.integerValue}`, 'minCherryLimit')
    )
      .test(maxContext('Cherry of ${max} JOY exceeds your balance', 'maxCherryLimit'))
      .required(''),
    fundingMaximalRange: BNSchema.test(moreThanMixed(0, 'Value must be greater than zero', false)).required(''),
    fundingMinimalRange: BNSchema.when('isPerpetual', {
      is: false,
      then: BNSchema.test(minContext('Minimal range must be bigger than ${min}', 'minFundingLimit'))
        .test(lessThanMixed(Yup.ref('fundingMaximalRange'), 'Minimal range cannot be greater than maximal', false))
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
      minContext('Minimum Entrant stake must be greater than ${min} JOY', 'minWorkEntrantStake')
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

export const createBountyParametersFactory = (state: AddBountyFrom) =>
  createType('BountyCreationParameters', {
    oracle: createType('BountyActor', {
      Member: createType('MemberId', Number((state.judgingPeriodDetails.oracle as any as Member)?.id || 0)),
    }),
    contract_type: createType('AssuranceContractType', contractTypeFactory(state)),
    creator: createType('BountyActor', {
      Member: createType('MemberId', Number((state.generalParameters.creator as any as Member)?.id || 0)),
    }),
    cherry: createType('u128', state.fundingPeriodDetails.cherry || 0),
    entrantStake: createType('u128', state.workingPeriodDetails.workingPeriodStake || 0),
    fundingType: createType('FundingType', fundingTypeFactory(state)),
    workPeriod: createType('u32', state.workingPeriodDetails.workingPeriodLength || 0),
    judgingPeriod: createType('u32', state.judgingPeriodDetails.judgingPeriodLength || 0),
  })

const contractTypeFactory = (state: AddBountyFrom) => {
  if (state.workingPeriodDetails.isWorkingPeriodOpen) {
    return {
      Open: null,
    }
  }

  const whiteList =
    state.workingPeriodDetails.workingPeriodWhitelist?.map((member) => createType('MemberId', Number(member.id))) ?? []
  return {
    Closed: createType('AssuranceContractType_Closed', whiteList),
  }
}

const fundingTypeFactory = (state: AddBountyFrom) => {
  if (state.fundingPeriodDetails.isPerpetual) {
    return {
      Perpetual: createType('FundingType_Perpetual', {
        target: createType('u128', state.fundingPeriodDetails.fundingMaximalRange || 0),
      }),
    }
  }

  return {
    Limited: createType('FundingType_Limited', {
      minFundingAmount: createType('u128', state.fundingPeriodDetails.fundingMinimalRange || 0),
      maxFundingAmount: createType('u128', state.fundingPeriodDetails.fundingMaximalRange || 0),
      fundingPeriod: createType('u32', state.fundingPeriodDetails.fundingPeriodLength || 0),
    }),
  }
}

export const createBountyMetadataFactory = (state: AddBountyFrom, newThreadId: u64): IBountyMetadata => ({
  title: state.generalParameters.title,
  description: state.generalParameters.description,
  bannerImageUri: state.generalParameters.coverPhotoLink,
  discussionThread: whenDefined(newThreadId, (id) => Long.fromString(String(id))),
})

export const submitWorkMetadataFactory = (state: SubmitWorkModalMachineState): IBountyWorkData => ({
  title: state.context.workTitle,
  description: state.context.workDescription,
})
