import BN from 'bn.js'

import { BaseActivity, MemberDisplayFields } from '@/common/types'

import { WorkingGroupOpening, GroupIdName } from '..'
import { WorkerStatus } from '../../../common/api/queries/__generated__/baseTypes.generated'

export type WorkingGroupActivity =
  | ApplicationWithdrawnActivity
  | AppliedOnOpeningActivity
  | BudgetSetActivity
  | BudgetSpendingActivity
  | StatusTextChangedActivity
  | OpeningAddedActivity
  | OpeningCanceledActivity
  | StakeSlashedActivity
  | StakeChangedActivity
  | WorkerExitedActivity
  | WorkerStartedLeavingActivity
  | OpeningFilledActivity
  | OpeningAnnouncedActivity
  | WorkerTerminatedActivity
  | WorkerRewardAccountUpdatedActivity
  | WorkerRewardAmountUpdatedActivity

type ShortOpening = Pick<WorkingGroupOpening, 'id' | 'type' | 'title' | 'groupName'>

interface OpeningActivity extends BaseActivity {
  opening: ShortOpening
}

interface ApplicationActivity extends OpeningActivity {
  member: MemberDisplayFields
}

export interface ApplicationWithdrawnActivity extends ApplicationActivity {
  eventType: 'ApplicationWithdrawnEvent'
}

export interface AppliedOnOpeningActivity extends ApplicationActivity {
  eventType: 'AppliedOnOpeningEvent'
}

export interface BudgetSetActivity extends BaseActivity {
  eventType: 'BudgetSetEvent'
  groupName: string
  newBudget: BN
}

export interface BudgetSpendingActivity extends BaseActivity {
  eventType: 'BudgetSpendingEvent'
  groupName: string
  amount: BN
}

export interface StatusTextChangedActivity extends BaseActivity {
  eventType: 'StatusTextChangedEvent'
  groupName: string
}

export interface OpeningAnnouncedActivity extends BaseActivity {
  eventType: 'OpeningAnnounced'
  groupName: string
  openingId: string
}

export interface OpeningAddedActivity extends OpeningActivity {
  eventType: 'OpeningAddedEvent'
}

export interface OpeningCanceledActivity extends OpeningActivity {
  eventType: 'OpeningCanceledEvent'
}

export interface StakeSlashedActivity extends BaseActivity {
  eventType: 'StakeSlashedEvent'
  member: MemberDisplayFields
  groupName: string
}

export interface StakeChangedActivity extends BaseActivity {
  eventType: 'StakeIncreasedEvent' | 'StakeDecreasedEvent' | 'StakeSlashedEvent'
  member: MemberDisplayFields
  amount: BN
}

export interface WorkerExitedActivity extends BaseActivity {
  eventType: 'WorkerExitedEvent'
  member: MemberDisplayFields
}

export interface WorkerStartedLeavingActivity extends BaseActivity {
  eventType: 'WorkerStartedLeavingEvent'
  workerStatus: WorkerStatus['__typename']
  member: MemberDisplayFields
}

export interface OpeningFilledActivity extends OpeningActivity {
  eventType: 'OpeningFilledEvent'
  hiredMembers: MemberDisplayFields[]
}

export interface WorkerTerminatedActivity extends BaseActivity {
  eventType: 'TerminatedWorkerEvent' | 'TerminatedLeaderEvent'
  member: MemberDisplayFields
  groupName: string
}

export interface WorkerRewardAccountUpdatedActivity extends BaseActivity {
  eventType: 'WorkerRewardAccountUpdatedEvent'
}

export interface WorkerRewardAmountUpdatedActivity extends BaseActivity {
  eventType: 'WorkerRewardAmountUpdatedEvent'
  member: MemberDisplayFields
  newAmount: BN
  openingTitle?: string | null
  groupId: GroupIdName
}
