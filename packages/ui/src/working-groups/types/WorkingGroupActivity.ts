import BN from 'bn.js'

import { BaseActivity } from '@/common/types'
import { Member } from '@/memberships/types'

export type WorkingGroupActivity =
  | ApplicationWithdrawnActivity
  | AppliedOnOpeningActivity
  | BudgetSetActivity
  | BudgetSpendingActivity

export interface ApplicationWithdrawnActivity extends BaseActivity {
  eventType: 'ApplicationWithdrawnEvent'
  membership: Pick<Member, 'id' | 'handle'>
  opening: {
    id: string
    title: string
  }
}

export interface AppliedOnOpeningActivity extends BaseActivity {
  eventType: 'AppliedOnOpeningEvent'
  membership: Pick<Member, 'id' | 'handle'>
  opening: {
    id: string
    title: string
  }
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
