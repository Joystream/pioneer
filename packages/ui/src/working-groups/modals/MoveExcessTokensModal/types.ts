import { ModalWithDataCall } from '@/common/providers/modal/types'
import { WorkerWithDetails } from '@/working-groups/types'

export type MoveExcessTokensModalCall = ModalWithDataCall<'MoveExcessTokensModal', { worker: WorkerWithDetails }>
