import { ModalWithDataCall } from '@/common/providers/modal/types'
import { MyStakingRole } from '@/validators/hooks/useMyStashPositions'

export type StopStakingModalCall = ModalWithDataCall<
  'StopStakingModal',
  {
    stash: string
    role: MyStakingRole
  }
>

export * from './StopStakingModal'
