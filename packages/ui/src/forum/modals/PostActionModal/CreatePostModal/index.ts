import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumThread } from '@/forum/types'

export * from './CreatePostModal'
export type CreatePostModalCall = ModalWithDataCall<
  'CreatePost',
  { postText: string; thread: Pick<ForumThread, 'id' | 'categoryId' | 'title'>; isEditable: boolean }
>
