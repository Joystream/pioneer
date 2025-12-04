import BN from 'bn.js'

import { ModalWithDataCall } from '@/common/providers/modal/types'
import { UnlockingChunk } from '@/validators/hooks/useMyStashPositions'

export type ManageStashAction = 'bondRebond' | 'withdraw' | 'changeController' | 'changeReward'

export type ManageStashActionModalCall = ModalWithDataCall<
  'ManageStashActionModal',
  {
    stash: string
    controller?: string
    action: ManageStashAction
    activeStake: BN
    totalStake: BN
    unlocking: UnlockingChunk[]
  }
>

export * from './ManageStashActionModal'
