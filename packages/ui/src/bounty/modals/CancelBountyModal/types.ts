import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export type CancelBountyModalCall = ModalWithDataCall<
  'CancelBounty',
  {
    bounty: Bounty
    creator: Member
  }
>
