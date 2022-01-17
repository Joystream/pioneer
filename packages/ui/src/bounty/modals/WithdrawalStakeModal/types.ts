import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export type WithdrawalStakeModalCall = ModalWithDataCall<
  'WithdrawalStakeModal',
  {
    bounty: Bounty
  }
>
