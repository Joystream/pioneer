import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<'MoveFundsModal', { price: number }>
