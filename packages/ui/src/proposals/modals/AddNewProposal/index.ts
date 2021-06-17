import { ModalCall } from '@/common/providers/modal/types'
import { ModalState } from '@/common/types'

export type AddNewProposalModalCall = ModalCall<'AddNewProposalModal'>
export type AddProposalModalState = ModalState | 'WARNING'

export * from './AddNewProposalModal'
