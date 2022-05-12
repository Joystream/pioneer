import BN from 'bn.js'

import { Account } from '@/accounts/types'

export interface AnnounceCandidacyFrom {
  staking: {
    amount?: BN
    account?: Account
  }
  rewardAccount: {
    rewardAccount?: Account
  }
  'candidateProfile.titleAndBulletPoints': {
    title?: string
    bulletPoint1?: string
    bulletPoint2?: string
    bulletPoint3?: string
  }
  'candidateProfile.summaryAndBanner': {
    summary?: string
    banner?: string
  }
}

export const getAnnounceCandidacyFormInitialState = (minStake: BN) => ({
  staking: {
    amount: minStake ?? undefined,
    account: undefined,
  },
  rewardAccount: {
    rewardAccount: undefined,
  },
  'candidateProfile.titleAndBulletPoints': {
    title: undefined,
    bulletPoint1: undefined,
    bulletPoint2: undefined,
    bulletPoint3: undefined,
  },
  'candidateProfile.summaryAndBanner': {
    summary: undefined,
    banner: undefined,
  },
})

export const getBulletPoints = (fields: AnnounceCandidacyFrom) => {
  return Object.entries(fields['candidateProfile.titleAndBulletPoints'])
    .filter(([field, value]) => field.startsWith('bulletPoint') && value)
    .map(([, value]) => value)
}
