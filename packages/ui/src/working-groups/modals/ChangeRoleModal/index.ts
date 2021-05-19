import { ModalWithDataCall } from '@/common/providers/modal/types'
import { WorkerWithDetails } from '@/working-groups/types'

export * from './ChangeRoleModal'

export type ChangeRoleModalCall = ModalWithDataCall<'ChangeRoleModal', { worker: WorkerWithDetails }>
