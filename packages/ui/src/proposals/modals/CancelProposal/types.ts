import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export type CancelProposalModalCall = ModalWithDataCall<'CancelProposalModal', { member: Member; proposalId: string }>
