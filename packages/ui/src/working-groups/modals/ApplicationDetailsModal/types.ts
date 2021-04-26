import { ModalWithDataCall } from '../../../common/providers/modal/types'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

export type ApplicationDetailsModalCall = ModalWithDataCall<
  'ApplicationDetails',
  { application: WorkingGroupApplication }
>
