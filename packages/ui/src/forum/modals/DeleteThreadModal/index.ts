import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumThreadWithDetails } from '@/forum/types/ForumThread'

export * from './DeleteThreadModal'
export type DeleteThreadModalCall = ModalWithDataCall<'DeleteThreadModal', { thread: ForumThreadWithDetails }>
