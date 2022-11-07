import { ModalWithDataCall } from '@/common/providers/modal/types'
import { GroupIdName } from '@/working-groups/types'

export interface OpeningModalData {
  group: GroupIdName
}

export type CreateOpeningModalCall = ModalWithDataCall<'CreateOpening', OpeningModalData>
