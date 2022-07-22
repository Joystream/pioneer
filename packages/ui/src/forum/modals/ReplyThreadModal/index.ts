import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types'

export * from './ReplyThreadModal'
export type ReplyThreadModalCall = ModalWithDataCall<'ReplyThreadModal', { post: ForumPost }>
