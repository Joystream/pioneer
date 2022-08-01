import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types'

export * from './CreatePostModal'

type GetTransaction = (
  postText: string,
  isEditable: boolean
) => SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined

export type CreatePostModalCall = ModalWithDataCall<
  'CreatePost',
  {
    // onSuccess: () => void
    getTransaction: GetTransaction
    // postText: string
    module?: 'forum' | 'proposalsDiscussion'
    replyTo?: ForumPost
    // isEditable: boolean
    // transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
    // onSuccess: () => void
  }
>
