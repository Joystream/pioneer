import React from 'react'

import { IconStyle } from '@/common/components/Activities/ActivityIcon'
import { AppliedIcon } from '@/common/components/icons/activities/AppliedIcon'
import { DecreasedIcon } from '@/common/components/icons/activities/DecreasedIcon'
import { ActivityCategory } from '@/common/types'

import { HiredIcon } from '../icons/activities/HiredIcon'
import { IncreasedIcon } from '../icons/activities/IncreasedIcon'

export const ActivityToIconMap: Record<ActivityCategory, [React.FC, IconStyle]> = {
  AppliedOnOpeningEvent: [AppliedIcon, 'joystream'],
  ApplicationWithdrawnEvent: [AppliedIcon, 'joystream'],
  BudgetSpendingEvent: [DecreasedIcon, 'negative'],
  BudgetSetEvent: [IncreasedIcon, 'positive'],
  LeaderSetEvent: [HiredIcon, 'joystream'],
  StatusTextChangedEvent: [AppliedIcon, 'positive'],
}
