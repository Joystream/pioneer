import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './WithdrawContributionModal'
export type WithdrawFundingModalCall = ModalWithDataCall<'WithdrawContributionModal', { bountyId: string }>
