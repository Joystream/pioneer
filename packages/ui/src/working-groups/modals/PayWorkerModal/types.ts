import { ModalWithDataCall } from '@/common/providers/modal/types'

import { WorkerWithDetails } from '../../types'

export type PayWorkerModalCall = ModalWithDataCall<'PayWorker', { worker: WorkerWithDetails }>

export type PaymentType = 'discretionary' | 'vested'
