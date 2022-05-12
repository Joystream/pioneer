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
    bulletPoints: string[]
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
    bulletPoints: [],
  },
  'candidateProfile.summaryAndBanner': {
    summary: undefined,
    banner: undefined,
  },
})
