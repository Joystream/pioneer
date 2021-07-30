import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './CreateThreadModal'
export type CreateThreadModalCall = ModalWithDataCall<'CreateThreadModal', { categoryId: string }>
