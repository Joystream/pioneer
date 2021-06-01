import { ModalWithDataCall } from '@/common/providers/modal/types'

import { WorkerWithDetails } from '../../types'

export type LeaveRoleModalCall = ModalWithDataCall<'LeaveRole', { worker: WorkerWithDetails }>
