import BN from 'bn.js'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

export * from './RecoverVoteStakeModal'
export type RecoverVoteStakeModalCall = ModalWithDataCall<
  'RecoverVoteStake',
  {
    address: Address
    stake: BN
  }
>
