import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './CreatePostModal'
export type CreatePostModalCall = ModalWithDataCall<
  'CreatePost',
  { postText: string; isEditable: boolean; transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> }
>
