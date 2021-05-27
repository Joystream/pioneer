import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { OpeningsListRow } from '@/working-groups/components/OpeningsList/OpeningsListRow'
import { UpcomingWorkingGroupOpening } from '@/working-groups/types'

export interface UpcomingOpeningsListProps {
  openings: UpcomingWorkingGroupOpening[]
}

export const UpcomingOpeningsList = ({ openings }: UpcomingOpeningsListProps) => {
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
