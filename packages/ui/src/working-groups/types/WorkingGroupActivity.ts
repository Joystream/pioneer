import BN from 'bn.js'

import { BaseActivity } from '@/common/types'

export type WorkingGroupActivity =
  | ApplicationWithdrawnActivity
  | AppliedOnOpeningActivity
  | BudgetSetActivity
  | BudgetSpendingActivity

interface ApplicationWithdrawnActivity extends BaseActivity {
  eventType: 'ApplicationWithdrawnEvent'
  membership: {
    id: string
    handle: string
  }
  opening: {
    id: string
    title: string
  }
}

export interface AppliedOnOpeningActivity extends BaseActivity {
  eventType: 'AppliedOnOpeningEvent'
  membership: {
    id: string
    handle: string
  }
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
