import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './WithdrawContributionModal'
export type BountyWithdrawContributionModalCall = ModalWithDataCall<
  'BountyWithdrawContributionModal',
  { bountyId: string }
>
