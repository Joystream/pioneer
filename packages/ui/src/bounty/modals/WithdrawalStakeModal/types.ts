import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export type WithdrawStakeModalCall = ModalWithDataCall<
  'WithdrawStakeModal',
  {
    bounty: Bounty
  }
>
