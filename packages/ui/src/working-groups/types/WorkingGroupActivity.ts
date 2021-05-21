import BN from 'bn.js'

import { BaseActivity } from '@/common/types'

export type WorkingGroupActivity = ApplicationWithdrawnActivity | AppliedOnOpeningActivity | BudgetSetActivity

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

interface AppliedOnOpeningActivity extends BaseActivity {
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

interface BudgetSetActivity extends BaseActivity {
  eventType: 'BudgetSetEvent'
  groupName: string
  newBudget: BN
}
