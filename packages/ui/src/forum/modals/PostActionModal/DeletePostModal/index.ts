import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types/ForumPost'

export * from './DeletePostModal'
export type DeletePostModalCall = ModalWithDataCall<
  'DeletePost',
  { post: ForumPost; transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult> }
>
