import { ModalWithDataCall } from '@/common/providers/modal/types'

export type ChangeSessionKeysModalCall = ModalWithDataCall<
  'ChangeSessionKeysModal',
  {
    stash: string
    controller?: string
  }
>

export * from './ChangeSessionKeysModal'
