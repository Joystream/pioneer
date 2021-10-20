import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { PastElection } from '@/council/types/PastElection'

import { PastElectionsListRow } from './PastElectionsListRow'

export interface PastWorkersListProps {
  elections: PastElection[]
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
