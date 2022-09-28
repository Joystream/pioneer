import { ModalNames } from '@/app/GlobalModals'
import { getMembershipsStatistics } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'

export type BountyMembershipsStatistics = ReturnType<typeof getMembershipsStatistics>

export interface BountyHeaderButtonsProps<T extends ModalNames> {
  modalData: any
  modal: T
  validMemberIds: string[]
  text: string
}

export type ButtonTypes =
  | 'announceWorkEntry'
  | 'cancelBounty'
  | 'claimReward'
  | 'contributeFunds'
  | 'submitWork'
  | 'withdrawWorkEntry'
  | 'withdrawEntryStake'
  | 'withdrawContribution'
  | 'submitJudgement'
  | 'statistics'
  | 'notify'
