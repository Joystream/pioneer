import { JSXElementConstructor } from 'react'

import {
  BudgetIcon,
  ExiteRoleIcon,
  ProposalExecutedIcon,
  RewardIcon,
  StatusUpdatedIcon,
  TerminatedIcon,
  UpcomingIcon,
} from '@/common/components/icons/activities'

import { ActivityCategory } from '../../types'
import { AppliedIcon } from '../icons/activities/AppliedIcon'
import { ClosedIcon } from '../icons/activities/ClosedIcon'
import { CreatedIcon } from '../icons/activities/CreatedIcon'
import { DecreasedIcon } from '../icons/activities/DecreasedIcon'
import { HiredIcon } from '../icons/activities/HiredIcon'
import { IncreasedIcon } from '../icons/activities/IncreasedIcon'
import { WarnedIcon } from '../icons/activities/WarnedIcon'

import { IconStyle } from './ActivityIcon'

export const ActivityToIconMap: Record<ActivityCategory, [JSXElementConstructor<any>, IconStyle]> = {
  AppliedOnOpeningEvent: [AppliedIcon, 'joystream'],
  ApplicationWithdrawnEvent: [AppliedIcon, 'joystream'],
  BudgetSpendingEvent: [DecreasedIcon, 'negative'],
  BudgetSetEvent: [BudgetIcon, 'positive'],
  StatusTextChangedEvent: [AppliedIcon, 'positive'],
  OpeningAddedEvent: [CreatedIcon, 'joystream'],
  OpeningCanceledEvent: [ClosedIcon, 'negative'],
  StakeSlashedEvent: [WarnedIcon, 'negative'],
  StakeIncreasedEvent: [IncreasedIcon, 'positive'],
  StakeDecreasedEvent: [DecreasedIcon, 'negative'],
  WorkerExitedEvent: [ExiteRoleIcon, 'negative'],
  WorkerStartedLeavingEvent: [ClosedIcon, 'negative'],
  OpeningFilledEvent: [HiredIcon, 'positive'],
  OpeningAnnounced: [UpcomingIcon, 'joystream'],
  TerminatedWorkerEvent: [TerminatedIcon, 'negative'],
  TerminatedLeaderEvent: [TerminatedIcon, 'negative'],
  WorkerRewardAccountUpdatedEvent: [RewardIcon, 'joystream'],
  WorkerRewardAmountUpdatedEvent: [RewardIcon, 'joystream'],
  PostAddedEvent: [CreatedIcon, 'joystream'],
  PostTextUpdatedEvent: [UpcomingIcon, 'joystream'],
  PostModeratedEvent: [UpcomingIcon, 'joystream'],
  PostDeletedEvent: [TerminatedIcon, 'negative'],
  ThreadCreatedEvent: [CreatedIcon, 'joystream'],
  ThreadDeletedEvent: [TerminatedIcon, 'negative'],
  ThreadModeratedEvent: [UpcomingIcon, 'joystream'],
  CategoryCreatedEvent: [CreatedIcon, 'joystream'],
  CategoryDeletedEvent: [TerminatedIcon, 'negative'],
  ProposalCreatedEvent: [CreatedIcon, 'joystream'],
  ProposalStatusUpdatedEvent: [StatusUpdatedIcon, 'joystream'],
  ProposalDecisionMadeEvent: [ClosedIcon, 'negative'],
  ProposalCancelledEvent: [ClosedIcon, 'negative'],
  ProposalDiscussionThreadModeChangedEvent: [StatusUpdatedIcon, 'joystream'],
  ProposalExecutedEvent: [ProposalExecutedIcon, 'joystream'],
  ProposalVotedEvent: [CreatedIcon, 'joystream'],
  ProposalDiscussionPostCreatedEvent: [CreatedIcon, 'joystream'],
  ProposalDiscussionPostUpdatedEvent: [StatusUpdatedIcon, 'joystream'],
  ProposalDiscussionPostDeletedEvent: [ClosedIcon, 'negative'],
  RevealingStageStartedEvent: [StatusUpdatedIcon, 'positive'],
  CouncilorRewardUpdatedEvent: [StatusUpdatedIcon, 'joystream'],
  AnnouncingPeriodStartedEvent: [StatusUpdatedIcon, 'joystream'],
  VotingPeriodStartedEvent: [StatusUpdatedIcon, 'joystream'],
  NewCouncilElectedEvent: [HiredIcon, 'positive'],
  NewCandidateEvent: [CreatedIcon, 'joystream'],
  CandidacyWithdrawEvent: [ExiteRoleIcon, 'negative'],
  NotEnoughCandidatesEvent: [ClosedIcon, 'negative'],
}
