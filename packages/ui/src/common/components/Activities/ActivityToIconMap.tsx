import { JSXElementConstructor } from 'react'

import { BudgetIcon, ExiteRoleIcon, UpcomingIcon } from '@/common/components/icons/activities'

import { ActivityCategory } from '../../types'
import { AppliedIcon } from '../icons/activities/AppliedIcon'
import { ClosedIcon } from '../icons/activities/ClosedIcon'
import { CreatedIcon } from '../icons/activities/CreatedIcon'
import { DecreasedIcon } from '../icons/activities/DecreasedIcon'
import { HiredIcon } from '../icons/activities/HiredIcon'
import { IncreasedIcon } from '../icons/activities/IncreasedIcon'
import { WarnedIcon } from '../icons/activities/WarnedIcon'

import { IconStyle } from './ActivityIcon'

export const ActivityToIconMap: Record<ActivityCategory, [JSXElementConstructor<any>, IconStyle]> = {
  AppliedOnOpening: [AppliedIcon, 'joystream'],
  ApplicationWithdrawn: [AppliedIcon, 'joystream'],
  BudgetSpending: [DecreasedIcon, 'negative'],
  BudgetSet: [BudgetIcon, 'positive'],
  LeaderSet: [HiredIcon, 'joystream'],
  StatusTextChanged: [AppliedIcon, 'positive'],
  OpeningAdded: [CreatedIcon, 'joystream'],
  OpeningCanceled: [ClosedIcon, 'negative'],
  StakeSlashed: [WarnedIcon, 'negative'],
  StakeIncreased: [IncreasedIcon, 'negative'],
  StakeDecreased: [DecreasedIcon, 'positive'],
  WorkerExited: [ExiteRoleIcon, 'negative'],
  WorkerStartedLeaving: [ClosedIcon, 'negative'],
  OpeningFilled: [HiredIcon, 'positive'],
  OpeningAnnounced: [UpcomingIcon, 'joystream'],
}
