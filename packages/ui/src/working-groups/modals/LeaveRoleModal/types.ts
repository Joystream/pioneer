import { ModalWithDataCall } from '@/common/providers/modal/types'

import { Worker } from '../../types'

export type LeaveRoleModalCall = ModalWithDataCall<'LeaveRole', { worker: Worker }>
