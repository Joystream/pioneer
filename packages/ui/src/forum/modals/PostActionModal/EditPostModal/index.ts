import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types'
import { Member } from '@/memberships/types'

export * from './EditPostModal'
export type EditPostModalCall = ModalWithDataCall<
  'EditPost',
  {
    postAuthor: Member
    postText: string
    replyTo?: ForumPost
    transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult>
    onSuccess: () => void
    onFail: () => void
  }
>
