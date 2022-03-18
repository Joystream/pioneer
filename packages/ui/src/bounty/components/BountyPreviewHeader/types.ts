import { getMembershipsStatistics } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'
import { Bounty } from '@/bounty/types/Bounty'

export type BountyMembershipsStatistics = ReturnType<typeof getMembershipsStatistics>

export interface BountyHeaderButtonsProps {
  bounty: Bounty
  noActiveMemberCall: () => void
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
