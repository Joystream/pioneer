import { ModalWithDataCall } from '@/common/providers/modal/types'
import { WorkerWithDetails } from '@/working-groups/types'

export type AddWorkerStakeModalCall = ModalWithDataCall<'AddWorkerStake', { worker: WorkerWithDetails }>
