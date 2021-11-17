import { ModalWithDataCall } from '@/common/providers/modal/types'
import { WorkerWithDetails } from '@/working-groups/types'

export type IncreaseWorkerStakeModalCall = ModalWithDataCall<'IncreaseWorkerStake', { worker: WorkerWithDetails }>
