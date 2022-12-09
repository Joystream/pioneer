import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types'

export * from './PostReplyModal'

export type PostReplyModalCall = ModalWithDataCall<
  'PostReplyModal',
  {
    replyTo: ForumPost
    module?: 'forum' | 'proposalsDiscussion'
  }
>
