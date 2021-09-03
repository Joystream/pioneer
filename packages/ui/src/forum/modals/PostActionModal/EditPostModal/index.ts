import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumPost } from '@/forum/types/ForumPost'

export * from './EditPostModal'
export type EditPostModalCall = ModalWithDataCall<
  'EditPost',
  { post: ForumPost; transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult> }
>
