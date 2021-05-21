import React from 'react'

import { IconStyle } from '@/common/components/Activities/ActivityIcon'
import { AppliedIcon } from '@/common/components/icons/activities/AppliedIcon'
import { DecreasedIcon } from '@/common/components/icons/activities/DecreasedIcon'
import { ActivityCategory } from '@/common/types'

export const ActivityToIconMap: Record<ActivityCategory, [React.FC, IconStyle]> = {
  AppliedOnOpeningEvent: [AppliedIcon, 'positive'],
  ApplicationWithdrawnEvent: [AppliedIcon, 'positive'],
  BudgetSpendingEvent: [DecreasedIcon, 'negative'],
  BudgetSetEvent: [AppliedIcon, 'positive'],
}
