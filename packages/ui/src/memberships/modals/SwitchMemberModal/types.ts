import { ModalNames } from '@/app/GlobalModals'
import { OptionalDataModalCall } from '@/common/providers/modal/types'

export type SwitchMemberModalCall = OptionalDataModalCall<
  'SwitchMember',
  {
    originalModalName?: ModalNames
    originalModalData?: unknown
    noCreateButton?: boolean
    membersToShow?: string[]
  }
>
