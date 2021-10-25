import React from 'react'

import { List } from '@/common/components/List'
import { PastElection } from '@/council/types/PastElection'

import { PastElectionsListRow } from './PastElectionsListRow'

export interface PastWorkersListProps {
  elections: PastElection[]
}

export const PastElectionsList = ({ elections }: PastWorkersListProps) => (
  <List as="div">
    {elections.map((election, index) => (
      <PastElectionsListRow election={election} key={index} />
    ))}
  </List>
)
