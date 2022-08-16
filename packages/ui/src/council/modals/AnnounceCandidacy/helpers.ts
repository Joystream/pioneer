import BN from 'bn.js'
import { StateValueMap } from 'xstate'
import * as Yup from 'yup'

import { Account } from '@/accounts/types'
import { BNSchema, validStakingAmount } from '@/common/utils/validation'
import { AccountSchema, StakingAccountSchema } from '@/memberships/model/validation'

export interface AnnounceCandidacyFrom {
  staking: {
    amount?: BN
    account?: Account
  }
  reward: {
    account?: Account
  }
  titleAndBulletPoints: {
    title?: string
    bulletPoint1?: string
    bulletPoint2?: string
    bulletPoint3?: string
  }
  summaryAndBanner: {
    summary?: string
    banner?: string
  }
}

export const baseSchema = Yup.object().shape({
  staking: Yup.object().shape({
    account: StakingAccountSchema.required('This field is required'),
    amount: BNSchema.test(validStakingAmount()).required('This field is required'),
  }),
  reward: Yup.object().shape({
    account: AccountSchema.required('This field is required'),
  }),
  titleAndBulletPoints: Yup.object().shape({
    title: Yup.string().trim().max(60, 'Maximum length is 60 symbols.').required('This field is required'),
    bulletPoint1: Yup.string().trim().max(120, 'Maximum length is 120 symbols.').required('This field is required'),
    bulletPoint2: Yup.string().trim().max(120, 'Maximum length is 120 symbols.'),
    bulletPoint3: Yup.string().trim().max(120, 'Maximum length is 120 symbols.'),
  }),
  summaryAndBanner: Yup.object().shape({
    summary: Yup.string().trim().required('This field is required'),
    banner: Yup.string().trim(),
  }),
})

export const getAnnounceCandidacyFormInitialState = (minStake: BN) => ({
  staking: {
    amount: minStake ?? undefined,
    account: undefined,
  },
  reward: {
    account: undefined,
  },
  titleAndBulletPoints: {
    title: undefined,
    bulletPoint1: undefined,
    bulletPoint2: undefined,
    bulletPoint3: undefined,
  },
  summaryAndBanner: {
    summary: undefined,
    banner: undefined,
  },
})

export const getBulletPoints = (fields: AnnounceCandidacyFrom) => {
  return Object.entries(fields.titleAndBulletPoints)
    .filter(([field, value]) => field.startsWith('bulletPoint') && value)
    .map(([, value]) => value)
}

export const machineStateConverter = (state: string | StateValueMap): string =>
  typeof state === 'string' ? state : machineStateConverter(Object.values(state)[0])
