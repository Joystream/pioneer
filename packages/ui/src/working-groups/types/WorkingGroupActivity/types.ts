import BN from 'bn.js'

import { BaseActivity } from '@/common/types'
import { Member } from '@/memberships/types'

import { WorkingGroupOpening } from '..'

export type WorkingGroupActivity =
  | ApplicationWithdrawnActivity
  | AppliedOnOpeningActivity
  | BudgetSetActivity
  | BudgetSpendingActivity
  | LeaderSetActivity
  | StatusTextChangedActivity
  | OpeningAddedActivity
  | OpeningCanceledActivity
  | StakeSlashedActivity
  | StakeChangedActivity
  | WorkerExitedActivity
  | WorkerStartedLeavingActivity

type ShortMember = Pick<Member, 'id' | 'handle'>

type ShortOpening = Pick<WorkingGroupOpening, 'id' | 'type' | 'title' | 'groupName'>

interface OpeningActivity extends BaseActivity {
  opening: ShortOpening
}

interface ApplicationActivity extends OpeningActivity {
  member: ShortMember
}

export interface ApplicationWithdrawnActivity extends ApplicationActivity {
  eventType: 'ApplicationWithdrawn'
}

export interface AppliedOnOpeningActivity extends ApplicationActivity {
  eventType: 'AppliedOnOpening'
}

export interface BudgetSetActivity extends BaseActivity {
  eventType: 'BudgetSet'
  groupName: string
  newBudget: BN
}

export interface BudgetSpendingActivity extends BaseActivity {
  eventType: 'BudgetSpending'
  groupName: string
  amount: BN
}

export interface LeaderSetActivity extends BaseActivity {
  eventType: 'LeaderSet'
  member: ShortMember
  groupName: string
}

export interface StatusTextChangedActivity extends BaseActivity {
  eventType: 'StatusTextChanged'
  groupName: string
}

export interface OpeningAddedActivity extends OpeningActivity {
  eventType: 'OpeningAdded'
}

export interface OpeningCanceledActivity extends OpeningActivity {
  eventType: 'OpeningCanceled'
}

export interface StakeSlashedActivity extends BaseActivity {
  eventType: 'StakeSlashed'
  member: ShortMember
  groupName: string
}

export interface StakeChangedActivity extends BaseActivity {
  eventType: 'StakeIncreased' | 'StakeDecreased'
  member: ShortMember
  amount: BN
}

export interface WorkerExitedActivity extends BaseActivity {
  eventType: 'WorkerExited'
  member: ShortMember
}

export interface WorkerStartedLeavingActivity extends BaseActivity {
  eventType: 'WorkerStartedLeaving'
  member: ShortMember
}
