import { ModalWithDataCall } from '../../../common/providers/modal/types'
import { WorkingGroupOpening } from '../../types'

export type ApplyForPositionModalCall = ModalWithDataCall<'ApplyForPositionModal', { opening: WorkingGroupOpening }>

export * from './ApplyForPositionModal'
