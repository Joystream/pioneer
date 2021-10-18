import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { Election } from '@/council/types/Election'

import { PastElectionsListRow } from './PastElectionsListRow'

export interface PastWorkersListProps {
  elections: Election[]
}

export const PastElectionsList = ({ elections }: PastWorkersListProps) => (
  <List>
    {elections.map((election, index) => (
      <ListItem key={index}>
        <PastElectionsListRow election={election} />
      </ListItem>
    ))}
  </List>
)
