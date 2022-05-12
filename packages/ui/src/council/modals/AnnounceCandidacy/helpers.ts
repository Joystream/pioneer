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
