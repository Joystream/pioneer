import React from 'react'

import { UpcomingWorkingGroupOpening } from '@/working-groups/types'

import { UpcomingOpeningDetails } from './UpcomingOpeningDetails'
import { UpcomingOpeningListItem } from './UpcomingOpeningListItem'

export const UpcomingOpening = (props: { opening: UpcomingWorkingGroupOpening }) => (
  <>
    <UpcomingOpeningListItem opening={props.opening} />
    <UpcomingOpeningDetails opening={props.opening} />
  </>
)
