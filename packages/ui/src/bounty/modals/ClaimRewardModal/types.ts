import { ModalWithDataCall } from '@/common/providers/modal/types'

export type ClaimRewardModalCall = ModalWithDataCall<
  'ClaimReward',
  { bountyId: string }
>
