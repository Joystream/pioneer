import BN from 'bn.js'

import { BaseActivity } from '@/common/types'

export type WorkingGroupActivity = ApplicationWithdrawnActivity | AppliedOnOpeningActivity | BudgetSetActivity

interface ApplicationWithdrawnActivity extends BaseActivity {
  eventType: 'ApplicationWithdrawnEvent'
  memberHandle: string
  openingTitle: string
}

interface AppliedOnOpeningActivity extends BaseActivity {
  eventType: 'AppliedOnOpeningEvent'
  memberHandle: string
  openingTitle: string
}

interface BudgetSetActivity extends BaseActivity {
  eventType: 'BudgetSetEvent'
  groupName: string
  newBudget: BN
}
