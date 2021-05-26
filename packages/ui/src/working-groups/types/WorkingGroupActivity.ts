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

type ShortMember = Pick<Member, 'id' | 'handle'>

interface ApplicationActivity extends BaseActivity {
  membership: ShortMember
  opening: {
    id: string
    title: string
  }
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

export interface OpeningAddedActivity extends BaseActivity {
  eventType: 'OpeningAddedEvent'
  opening: {
    id: string
    title: string
  }
}
