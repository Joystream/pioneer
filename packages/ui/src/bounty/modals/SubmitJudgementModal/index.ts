import { Bounty } from '@/bounty/types/Bounty'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './SubmitJudgementModal'
export type SubmitJudgementModalCall = ModalWithDataCall<
  'SubmitJudgementModal',
  {
    bounty: Bounty
  }
>
