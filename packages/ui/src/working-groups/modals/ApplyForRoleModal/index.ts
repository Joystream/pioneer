import { ModalWithDataCall } from '@/common/providers/modal/types'

import { WorkingGroupOpening } from '../../types'

export type ApplyForRoleModalCall = ModalWithDataCall<'ApplyForRoleModal', { opening: WorkingGroupOpening }>

export * from './ApplyForRoleModal'
export * from './machine'
