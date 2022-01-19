import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export * from './WithdrawWorkEntryModal'
export type BountyWithdrawWorkEntryModalCall = ModalWithDataCall<
  'BountyWithdrawWorkEntryModal',
  {
    bounty: Bounty
    entry: {
      id: string
      creator: Member
    }
  }
>
