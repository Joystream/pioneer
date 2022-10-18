import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './CreatePostModal'
export type CreatePostModalCall = ModalWithDataCall<
  'CreatePost',
  {
    postText: string
    module?: 'forum' | 'proposalsDiscussion'
    isEditable: boolean
    transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
    onSuccess: () => void
  }
>
