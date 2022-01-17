import { WinnerEntry } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export type ClaimRewardModalCall = ModalWithDataCall<
  'ClaimReward',
  {
    bountyId: string
    entry: WinnerEntry
  }
>
