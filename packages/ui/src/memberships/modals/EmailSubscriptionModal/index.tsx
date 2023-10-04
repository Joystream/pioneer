import { ModalWithDataCall } from '@/common/providers/modal/types'
export * from './EmailSubscriptionModal'

export type EmailSubscriptionModalCall = ModalWithDataCall<
  'EmailSubscriptionModal',
  {
    onSubscribe?: () => void
  }
>
