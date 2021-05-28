import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { OpeningsListRow } from '@/working-groups/components/OpeningsList/OpeningsListRow'

import { WorkingGroupOpening } from '../../types'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[]
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
