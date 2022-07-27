import BN from 'bn.js'

import { BaseActivity } from '@/common/types'
import {
  NewCouncilElectedEventFieldsFragment,
  CandidacyWithdrawEventFieldsFragment,
  AnnouncingPeriodStartedEventFieldsFragment,
  VotingPeriodStartedEventFieldsFragment,
  CouncilorRewardUpdatedEventFieldsFragment,
  NewCandidateEventFieldsFragment,
  NotEnoughCandidatesEventFieldsFragment,
  RevealingStageStartedEventFieldsFragment,
} from '@/council/queries/__generated__/councilEvents.generated'

export type CouncilActivity =
  | NewCouncilElectedActivity
  | CandidacyWithdrawActivity
  | AnnouncingPeriodStartedActivity
  | VotingPeriodStartedActivity
  | CouncilorRewardUpdatedActivity
  | NewCandidateActivity
  | NotEnoughCandidatesActivity
  | RevealingStageStartedActivity

export type CouncilEventFieldsFragment =
  | NewCouncilElectedEventFieldsFragment
  | CandidacyWithdrawEventFieldsFragment
  | AnnouncingPeriodStartedEventFieldsFragment
  | VotingPeriodStartedEventFieldsFragment
  | CouncilorRewardUpdatedEventFieldsFragment
  | NewCandidateEventFieldsFragment
  | NotEnoughCandidatesEventFieldsFragment
  | RevealingStageStartedEventFieldsFragment

export interface NewCouncilElectedActivity extends BaseActivity {
  eventType: 'NewCouncilElectedEvent'
  electedMembersCount: number
}

export interface CandidacyWithdrawActivity extends BaseActivity {
  eventType: 'CandidacyWithdrawEvent'
  candidateHandle: string
}

export interface AnnouncingPeriodStartedActivity extends BaseActivity {
  eventType: 'AnnouncingPeriodStartedEvent'
}

export interface VotingPeriodStartedActivity extends BaseActivity {
  eventType: 'VotingPeriodStartedEvent'
}

export interface CouncilorRewardUpdatedActivity extends BaseActivity {
  eventType: 'CouncilorRewardUpdatedEvent'
  newReward: BN
}

export interface NotEnoughCandidatesActivity extends BaseActivity {
  eventType: 'NotEnoughCandidatesEvent'
}

export interface NewCandidateActivity extends BaseActivity {
  eventType: 'NewCandidateEvent'
  candidateHandle: string
  memberId: string
}

export interface RevealingStageStartedActivity extends BaseActivity {
  eventType: 'RevealingStageStartedEvent'
}
