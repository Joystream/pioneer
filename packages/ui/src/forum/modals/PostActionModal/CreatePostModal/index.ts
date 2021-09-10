import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types'

export * from './CreatePostModal'
export type CreatePostModalCall = ModalWithDataCall<
  'CreatePost',
  {
    postText: string
    replyTo?: ForumPost
    isEditable: boolean
    transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  }
>
