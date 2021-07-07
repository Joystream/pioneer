import BN from 'bn.js'

import { BaseActivity } from '@/common/types'
import { Member } from '@/memberships/types'

import { WorkingGroupOpening } from '..'

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
  member: ShortMember
}

export interface OpeningFilledActivity extends OpeningActivity {
  eventType: 'OpeningFilledEvent'
  hiredMembers: ShortMember[]
}
