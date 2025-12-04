import BN from 'bn.js'

import { ModalWithDataCall } from '@/common/providers/modal/types'

export type UnbondStakingModalCall = ModalWithDataCall<
  'UnbondStakingModal',
  {
    stash: string
    controller?: string
    bonded: BN
  }
>

export * from './UnbondStakingModal'
