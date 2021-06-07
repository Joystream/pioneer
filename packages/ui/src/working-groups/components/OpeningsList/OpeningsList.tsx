import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

import { OpeningsListRow } from './OpeningsListRow'

export interface OpeningsListProps {
  openings: Array<WorkingGroupOpening | UpcomingWorkingGroupOpening>
}

export const OpeningsList = ({ openings }: OpeningsListProps) => {
  return (
    <List>
      {openings.map((opening) => (
        <ListItem key={opening.id}>
          <OpeningsListRow opening={opening} />
        </ListItem>
      ))}
    </List>
  )
}
