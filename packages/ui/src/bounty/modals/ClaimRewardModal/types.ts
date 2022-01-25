import BN from 'bn.js'

import { ModalWithDataCall } from '@/common/providers/modal/types'

export type ClaimRewardModalCall = ModalWithDataCall<
  'ClaimReward',
  {
    bountyId: string
    entryId: string
    reward: BN
  }
>
