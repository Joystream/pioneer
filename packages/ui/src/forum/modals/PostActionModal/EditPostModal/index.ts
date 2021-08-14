import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types/ForumPost'

export * from './EditPostModal'
export type EditPostModalCall = ModalWithDataCall<'EditPost', { post: ForumPost; newText: string }>
