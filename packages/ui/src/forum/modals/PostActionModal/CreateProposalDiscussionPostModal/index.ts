import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './CreateProposalDiscussionPostModal'
export type CreateProposalDiscussionPostModalCall = ModalWithDataCall<
  'CreateProposalDiscussionPost',
  { postText: string; threadId: string; isEditable: boolean }
>
