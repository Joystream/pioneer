import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export * from './EmailSubscriptionModal'

export type EmailSubscriptionModalCall = ModalWithDataCall<
  'EmailSubscriptionModal',
  {
    member: Member
  }
>
