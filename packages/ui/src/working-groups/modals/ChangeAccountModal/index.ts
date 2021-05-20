import { ModalWithDataCall } from '@/common/providers/modal/types'
import { WorkerWithDetails } from '@/working-groups/types'

import { ModalTypes } from './constants'

export * from './ChangeAccountModal'

export type ChangeAccountModalCall = ModalWithDataCall<
  'ChangeAccountModal',
  { worker: WorkerWithDetails; type: ModalTypes }
>
