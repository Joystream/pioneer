import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './PostHistoryModal'
export type PostHistoryModalCall = ModalWithDataCall<'PostHistory', { postId: string }>
