import { ModalWithDataCall } from '@/common/providers/modal/types'
import { ForumThreadWithDetails } from '@/forum/types'

export * from './EditThreadTitleModal'
export type EditThreadTitleModalCall = ModalWithDataCall<
  'EditThreadTitleModal',
  {
    thread: ForumThreadWithDetails
    newTitle: string
    onSuccess: (newTitle: string) => void
  }
>
