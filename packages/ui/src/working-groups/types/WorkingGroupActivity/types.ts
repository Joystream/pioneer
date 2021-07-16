import BN from 'bn.js'

import { BaseActivity } from '@/common/types'
import { Member } from '@/memberships/types'

import { WorkingGroupOpening } from '..'
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

type ShortMember = Pick<Member, 'id' | 'handle'>

type ShortOpening = Pick<WorkingGroupOpening, 'id' | 'type' | 'title' | 'groupName'>

interface OpeningActivity extends BaseActivity {
  opening: ShortOpening
}

interface ApplicationActivity extends OpeningActivity {
  member: ShortMember
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
  member: ShortMember
  groupName: string
}

export interface StakeChangedActivity extends BaseActivity {
  eventType: 'StakeIncreasedEvent' | 'StakeDecreasedEvent'
  member: ShortMember
  amount: BN
}

export interface WorkerExitedActivity extends BaseActivity {
  eventType: 'WorkerExitedEvent'
  member: ShortMember
}

export interface WorkerStartedLeavingActivity extends BaseActivity {
  eventType: 'WorkerStartedLeavingEvent'
  workerStatus: WorkerStatus['__typename']
  member: ShortMember
}

export interface OpeningFilledActivity extends OpeningActivity {
  eventType: 'OpeningFilledEvent'
  hiredMembers: ShortMember[]
}

export interface WorkerTerminatedActivity extends BaseActivity {
  eventType: 'TerminatedWorkerEvent' | 'TerminatedLeaderEvent'
  member: ShortMember
  groupName: string
}

export interface WorkerRewardAccountUpdatedActivity extends BaseActivity {
  eventType: 'WorkerRewardAccountUpdatedEvent'
}

export interface WorkerRewardAmountUpdatedActivity extends BaseActivity {
  eventType: 'WorkerRewardAmountUpdatedEvent'
  newAmount: number
}
