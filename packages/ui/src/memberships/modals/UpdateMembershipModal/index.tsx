import { ModalWithDataCall } from '@/common/providers/modal/types'
import { MemberWithDetails } from '@/memberships/types'

export * from './UpdateMembershipModal'

export type UpdateMembershipModalCall = ModalWithDataCall<
  'UpdateMembershipModal',
  {
    member: MemberWithDetails
  }
>
