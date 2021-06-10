import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

import { OpeningsListRow } from './OpeningsListRow'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[] | UpcomingWorkingGroupOpening[]
  past?: boolean
}

export const OpeningsList = ({ openings, past }: OpeningsListProps) => {
  return (
    <List>
      {openings.map((opening: any) => (
        <ListItem key={opening.id}>
          <OpeningsListRow opening={opening} past={past} />
        </ListItem>
      ))}
    </List>
  )
}
