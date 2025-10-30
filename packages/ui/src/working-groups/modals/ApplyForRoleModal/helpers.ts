import * as Yup from 'yup'

import { BNSchema, validStakingAmount } from '@/common/utils/validation'
import { AccountSchema, StakingAccountSchema } from '@/memberships/model/validation'
import { ApplicationQuestion } from '@/working-groups/types'

export const validationSchemaFromQuestions = (questions: ApplicationQuestion[]) =>
  Yup.array().of(Yup.string().required()).length(questions.length)

export const baseSchema = Yup.object().shape({
  stake: Yup.object().shape({
    account: StakingAccountSchema.required(),
    roleAccount: AccountSchema.required(),
    rewardAccount: AccountSchema.required(),
    amount: BNSchema.test(validStakingAmount()).required('Amount is required'),
  }),
  form: Yup.array().of(Yup.string().required()).min(1),
})
