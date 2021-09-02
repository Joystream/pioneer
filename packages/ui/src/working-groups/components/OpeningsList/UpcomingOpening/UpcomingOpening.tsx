import React from 'react'

import { UpcomingWorkingGroupOpening } from '@/working-groups/types'

import { UpcomingOpeningDetails } from './UpcomingOpeningDetails'
import { UpcomingOpeningListItem } from './UpcomingOpeningListItem'

export const UpcomingOpening = (props: { opening: UpcomingWorkingGroupOpening; onClick?: () => void }) => (
  <>
    <UpcomingOpeningListItem opening={props.opening} onClick={props.onClick} />
    <UpcomingOpeningDetails opening={props.opening} onClick={props.onClick} />
  </>
)
