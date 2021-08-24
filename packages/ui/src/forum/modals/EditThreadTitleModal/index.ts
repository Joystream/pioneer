import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export * from './EditThreadTitleModal'
export type EditThreadTitleModalCall = ModalWithDataCall<
  'EditThreadTitleModal',
  {
    member: Member
    transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
    onClose: () => void
  }
>
