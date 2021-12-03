import React, { ReactElement } from 'react'

import { Activity, ActivityCategory, BaseActivity } from '@/common/types/Activity'
import {
  AnnouncingPeriodStartedContent,
  CandidacyWithdrawContent,
  CouncilorRewardUpdatedContent,
  NewCandidateContent,
  NewCouncilElectedContent,
  NotEnoughCandidatesContent,
  RevealingStageStartedContent,
  VotingPeriodStartedContent,
} from '@/council/components/Activities'
import { CategoryCreatedContent } from '@/forum/components/Activities/CategoryCreatedContent'
import { CategoryDeletedContent } from '@/forum/components/Activities/CategoryDeletedContent'
import { PostAddedContent } from '@/forum/components/Activities/PostAddedContent'
import { PostDeletedContent } from '@/forum/components/Activities/PostDeletedContent'
import { PostEditedContent } from '@/forum/components/Activities/PostEditedContent'
import { PostModeratedContent } from '@/forum/components/Activities/PostModeratedContent'
import { ThreadCreatedContent } from '@/forum/components/Activities/ThreadCreatedContent'
import { ThreadDeletedContent } from '@/forum/components/Activities/ThreadDeletedContent'
import { ThreadModeratedContent } from '@/forum/components/Activities/ThreadModeratedContent'
import { ProposalCancelledContent } from '@/proposals/components/Activities/ProposalCancelledContent'
import { ProposalCreatedContent } from '@/proposals/components/Activities/ProposalCreatedContent'
import { ProposalDecisionMadeContent } from '@/proposals/components/Activities/ProposalDecisionMadeContent'
import { ProposalDiscussionModeContent } from '@/proposals/components/Activities/ProposalDiscussionModeContent'
import { ProposalDiscussionPostCreatedContent } from '@/proposals/components/Activities/ProposalDiscussionPostCreatedContent'
import { ProposalDiscussionPostDeletedContent } from '@/proposals/components/Activities/ProposalDiscussionPostDeletedContent'
import { ProposalDiscussionPostEditedContent } from '@/proposals/components/Activities/ProposalDiscussionPostEditedContent'
import { ProposalExecutedContent } from '@/proposals/components/Activities/ProposalExecutedContent'
import { ProposalStatusUpdatedContent } from '@/proposals/components/Activities/ProposalStatusUpdatedContent'
import { ProposalVotedContent } from '@/proposals/components/Activities/ProposalVotedContent'
import { ApplicationWithdrawnContent } from '@/working-groups/components/Activities/ApplicationWithdrawnContent'
import { AppliedOnOpeningContent } from '@/working-groups/components/Activities/AppliedOnOpeningContent'
import { BudgetSetContent } from '@/working-groups/components/Activities/BudgetSetContent'
import { BudgetSpendingContent } from '@/working-groups/components/Activities/BudgetSpendingContent'
import { OpeningAddedContent } from '@/working-groups/components/Activities/OpeningAddedContent'
import { OpeningAnnouncedContent } from '@/working-groups/components/Activities/OpeningAnnouncedContent'
import { OpeningCanceledContent } from '@/working-groups/components/Activities/OpeningCanceledContent'
import { OpeningFilledContent } from '@/working-groups/components/Activities/OpeningFilledContent'
import { StakeChangedContent } from '@/working-groups/components/Activities/StakeChangedContent'
import { StakeSlashedContent } from '@/working-groups/components/Activities/StakeSlashedContent'
import { StatusTextChangedContent } from '@/working-groups/components/Activities/StatusTextChangedContent'
import { WorkerExitedContent } from '@/working-groups/components/Activities/WorkerExitedContent'
import { WorkerRewardAccountUpdatedContent } from '@/working-groups/components/Activities/WorkerRewardAccountUpdatedContent'
import { WorkerRewardAmountUpdatedContent } from '@/working-groups/components/Activities/WorkerRewardAmountUpdatedContent'
import { WorkerStartedLeavingContent } from '@/working-groups/components/Activities/WorkerStartedLeavingContent'
import { WorkerTerminatedContent } from '@/working-groups/components/Activities/WorkerTerminatedContent'

export interface ActivityContentComponent<Activity extends BaseActivity> {
  (props: { activity: Activity; isOwn?: boolean }): ReactElement | null
}

const ActivityMap: Record<ActivityCategory, ActivityContentComponent<any>> = {
  AppliedOnOpeningEvent: AppliedOnOpeningContent,
  ApplicationWithdrawnEvent: ApplicationWithdrawnContent,
  BudgetSpendingEvent: BudgetSpendingContent,
  BudgetSetEvent: BudgetSetContent,
  StatusTextChangedEvent: StatusTextChangedContent,
  OpeningAddedEvent: OpeningAddedContent,
  OpeningCanceledEvent: OpeningCanceledContent,
  StakeSlashedEvent: StakeSlashedContent,
  StakeDecreasedEvent: StakeChangedContent,
  StakeIncreasedEvent: StakeChangedContent,
  WorkerExitedEvent: WorkerExitedContent,
  WorkerStartedLeavingEvent: WorkerStartedLeavingContent,
  OpeningFilledEvent: OpeningFilledContent,
  OpeningAnnounced: OpeningAnnouncedContent,
  TerminatedWorkerEvent: WorkerTerminatedContent,
  TerminatedLeaderEvent: WorkerTerminatedContent,
  WorkerRewardAccountUpdatedEvent: WorkerRewardAccountUpdatedContent,
  WorkerRewardAmountUpdatedEvent: WorkerRewardAmountUpdatedContent,
  PostAddedEvent: PostAddedContent,
  PostTextUpdatedEvent: PostEditedContent,
  PostDeletedEvent: PostDeletedContent,
  PostModeratedEvent: PostModeratedContent,
  ThreadCreatedEvent: ThreadCreatedContent,
  ThreadDeletedEvent: ThreadDeletedContent,
  ThreadModeratedEvent: ThreadModeratedContent,
  CategoryCreatedEvent: CategoryCreatedContent,
  CategoryDeletedEvent: CategoryDeletedContent,
  ProposalCreatedEvent: ProposalCreatedContent,
  ProposalCancelledEvent: ProposalCancelledContent,
  ProposalStatusUpdatedEvent: ProposalStatusUpdatedContent,
  ProposalDecisionMadeEvent: ProposalDecisionMadeContent,
  ProposalDiscussionThreadModeChangedEvent: ProposalDiscussionModeContent,
  ProposalExecutedEvent: ProposalExecutedContent,
  ProposalVotedEvent: ProposalVotedContent,
  ProposalDiscussionPostCreatedEvent: ProposalDiscussionPostCreatedContent,
  ProposalDiscussionPostUpdatedEvent: ProposalDiscussionPostEditedContent,
  ProposalDiscussionPostDeletedEvent: ProposalDiscussionPostDeletedContent,
  NotEnoughCandidatesEvent: NotEnoughCandidatesContent,
  CandidacyWithdrawEvent: CandidacyWithdrawContent,
  NewCandidateEvent: NewCandidateContent,
  NewCouncilElectedEvent: NewCouncilElectedContent,
  VotingPeriodStartedEvent: VotingPeriodStartedContent,
  AnnouncingPeriodStartedEvent: AnnouncingPeriodStartedContent,
  CouncilorRewardUpdatedEvent: CouncilorRewardUpdatedContent,
  RevealingStageStartedEvent: RevealingStageStartedContent,
}

export const ActivityContent = React.memo(({ activity, isOwn }: { activity: Activity; isOwn?: boolean }) => {
  const Content = ActivityMap[activity.eventType]
  return <Content activity={activity} isOwn={isOwn} />
})
