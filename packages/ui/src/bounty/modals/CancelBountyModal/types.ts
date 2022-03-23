import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Member } from '@/memberships/types'

export type BountyCancelModalCall = ModalWithDataCall<
  'BountyCancel',
  {
    bounty: Bounty
    creator?: Member
  }
>
