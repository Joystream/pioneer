import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

interface ModalData {
  bounty: Bounty
}

export * from './AnnounceWorkEntryModal'
export type BountyAnnounceWorkEntryModalCall = ModalWithDataCall<'BountyAnnounceWorkEntryModal', ModalData>
