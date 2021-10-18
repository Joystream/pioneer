import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

type ModalData = {
  member: Member
}
export type WithdrawCandidacyModalCall = ModalWithDataCall<'WithdrawCandidacy', ModalData>
