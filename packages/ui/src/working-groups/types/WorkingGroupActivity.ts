import BN from 'bn.js'

import { BaseActivity } from '@/common/types'
import { Member } from '@/memberships/types'

export type WorkingGroupActivity =
  | ApplicationWithdrawnActivity
  | AppliedOnOpeningActivity
  | BudgetSetActivity
  | BudgetSpendingActivity
  | LeaderSetActivity
  | StatusTextChangedActivity
  | OpeningAddedActivity
  | OpeningCanceledActivity

type ShortMember = Pick<Member, 'id' | 'handle'>

interface OpeningActivity extends BaseActivity {
  opening: {
    id: string
    title: string
  }
}

interface ApplicationActivity extends OpeningActivity {
  membership: ShortMember
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

export interface LeaderSetActivity extends BaseActivity {
  eventType: 'LeaderSetEvent'
  membership: ShortMember
  groupName: string
}

export interface StatusTextChangedActivity extends BaseActivity {
  eventType: 'StatusTextChangedEvent'
  groupName: string
}

export interface OpeningAddedActivity extends OpeningActivity {
  eventType: 'OpeningAddedEvent'
}

export interface OpeningCanceledActivity extends OpeningActivity {
  eventType: 'OpeningCanceledEvent'
}
