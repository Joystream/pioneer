import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './WithdrawWorkEntryModal'
export type BountyWithdrawWorkEntryModalCall = ModalWithDataCall<'BountyWithdrawWorkEntryModal', { bounty: Bounty }>
