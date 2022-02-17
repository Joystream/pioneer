import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './WithdrawContributionModal'
export type BountyWithdrawContributionModalCall = ModalWithDataCall<
  'BountyWithdrawContributionModal',
  { bounty: Bounty }
>
