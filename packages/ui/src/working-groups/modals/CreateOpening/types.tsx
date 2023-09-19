import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import * as Yup from 'yup'

import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { BNSchema, minContext, moreThanMixed } from '@/common/utils/validation'
import { GroupIdName } from '@/working-groups/types'

export interface OpeningModalData {
  group: GroupIdName
}

export type CreateOpeningModalCall = ModalWithDataCall<'CreateOpening', OpeningModalData>

// TODO research runtime constraints
export interface OpeningConditions {
  group: GroupIdName
  minStake: BN
  hiringTarget: number
}

export interface TransactionContext extends OpeningConditions {
  transactionEvents?: EventRecord[]
  openingId?: number
}

export const OpeningSchema = Yup.object().shape({
  group: Yup.number().optional(),
  target: Yup.number().optional(),
  applicationForm: Yup.object().shape({
    questions: Yup.array()
      .of(
        Yup.object({
          questionField: Yup.string().required('Question is required'),
          shortValue: Yup.boolean(),
        })
      )
      .min(1)
      .required('Questions is required'),
  }),
  durationAndProcess: Yup.object().shape({
    details: Yup.string().required('Details is required'),
    isLimited: Yup.boolean(),
    duration: Yup.number().when('isLimited', {
      is: true,
      then: Yup.number().required('Duration is required'),
    }),
  }),
  stakingPolicyAndReward: Yup.object().shape({
    stakingAmount: BNSchema.test(
      minContext('Input must be at least ${min} for proposal to execute', 'leaderOpeningStake', true, 'execution')
    ).required('Staking amount is required'),
    leavingUnstakingPeriod: BNSchema.test(
      minContext('Input must be at least ${min} for proposal to execute', 'minUnstakingPeriodLimit', false, 'execution')
    ).required('Leaving unstaking period is required'),
    rewardPerBlock: BNSchema.test(moreThanMixed(1, 'Amount must be greater than zero')).required(
      'Reward per block is required'
    ),
  }),
  workingGroupAndDescription: Yup.object().shape({
    title: Yup.string().required('Title is required').max(55, 'Max length is 55 characters'),
    description: Yup.string().required('Description is required'),
    shortDescription: Yup.string().required('Short Description is required'),
    groupId: Yup.string().required('Group Id is required'),
  }),
})

export const defaultValues = {
  target: 1,
  // applicationForm: { questions: [] },
  durationAndProcess: {
    details: '',
    duration: 100000,
    isLimited: false,
  },
  stakingPolicyAndReward: {
    stakingAmount: undefined,
    leavingUnstakingPeriod: 14400,
    rewardPerBlock: undefined,
  },
  workingGroupAndDescription: {
    title: '',
    description: '',
    shortDescription: '',
  },
}

export interface CreateOpeningForm {
  group?: GroupIdName
  target: number
  applicationForm: { questions?: QuestionValueProps[] }
  durationAndProcess: {
    details?: string
    duration?: number
    isLimited: boolean
  }
  stakingPolicyAndReward: {
    stakingAmount: number
    leavingUnstakingPeriod: number
    rewardPerBlock: number
  }
  workingGroupAndDescription: {
    title?: string
    description?: string
    shortDescription?: string
    groupId?: GroupIdName
  }
}
