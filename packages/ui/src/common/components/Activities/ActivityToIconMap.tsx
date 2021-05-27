import { JSXElementConstructor } from 'react'

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
  AppliedOnOpeningEvent: [AppliedIcon, 'joystream'],
  ApplicationWithdrawnEvent: [AppliedIcon, 'joystream'],
  BudgetSpendingEvent: [DecreasedIcon, 'negative'],
  BudgetSetEvent: [IncreasedIcon, 'positive'],
  LeaderSetEvent: [HiredIcon, 'joystream'],
  StatusTextChangedEvent: [AppliedIcon, 'positive'],
  OpeningAddedEvent: [CreatedIcon, 'joystream'],
  OpeningCanceledEvent: [ClosedIcon, 'negative'],
  StakeSlashedEvent: [WarnedIcon, 'negative'],
  StakeIncreasedEvent: [AppliedIcon, 'negative'],
  StakeDecreasedEvent: [AppliedIcon, 'positive'],
  WorkerExitedEvent: [ClosedIcon, 'negative'],
  WorkerStartedLeavingEvent: [ClosedIcon, 'negative'],
}
