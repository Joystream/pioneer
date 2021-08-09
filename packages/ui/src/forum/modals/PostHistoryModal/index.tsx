import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export * from './PostHistoryModal'
export type PostHistoryModalCall = ModalWithDataCall<'PostHistory', { postId: string; author: Member }>
