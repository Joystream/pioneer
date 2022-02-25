import { OptionalDataModalCall } from '@/common/providers/modal/types'

export type SwitchMemberModalCall = OptionalDataModalCall<
  'SwitchMember',
  {
    callback?: () => void
  }
>
