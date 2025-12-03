import { ModalWithDataCall } from '@/common/providers/modal/types'

export type SetNomineesModalCall = ModalWithDataCall<
  'SetNomineesModal',
  {
    stash: string
    nominations: string[]
  }
>

export * from './SetNomineesModal'
