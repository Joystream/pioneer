import * as Yup from 'yup'

import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { GroupIdName } from '@/working-groups/types'

export interface OpeningModalData {
  group: GroupIdName
}

export type CreateOpeningModalCall = ModalWithDataCall<'CreateOpening', OpeningModalData>

export interface ApplicationQuestion {
  text: string
  type: 'TEXT' | 'TEXTAREA'
}

export const OpeningSchema = Yup.object().shape({
  target: Yup.number().optional(),
  applicationForm: Yup.array().required('applicationForm is required'),
  durationAndProcess: Yup.object().required('durationAndProcess is required'),
  stakingPolicyAndReward: Yup.object().required('stakingPolicy is required'),
  workingGroupAndDescription: Yup.object().required('workingGroupAndDescription is required'),
})

export const defaultValues = {
  target: 1,
  applicationForm: { questions: [] },
  durationAndProcess: { details: '', duration: 100000, isLimited: false },
  stakingPolicyAndReward: { stakingAmount: 50000, leavingUnstakingPeriod: 14400, rewardPerBlock: 1 },
  workingGroupAndDescription: { title: '', description: '', shortDescription: '' },
}

export interface CreateOpeningForm {
  target: number

  applicationForm: {
    questions?: QuestionValueProps[]
  }

  durationAndProcess: {
    details?: string
    duration?: number
    isLimited: boolean
  }
  stakingPolicyAndReward: { stakingAmount: number; leavingUnstakingPeriod: number; rewardPerBlock: number }
  workingGroupAndDescription: {
    title?: string
    description?: string
    shortDescription?: string
    groupId?: GroupIdName
  }
}
