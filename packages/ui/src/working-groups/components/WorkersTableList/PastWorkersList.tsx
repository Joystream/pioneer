import React from 'react'

import { List, ListItem } from '@/common/components/List'

import { PastWorker } from '../../types'

import { PastWorkersListRow } from './PastWorkersListRow'

export interface PastWorkersListProps {
  workers?: PastWorker[]
}

export const PastWorkersList = ({ workers }: PastWorkersListProps) => (
  <>
    {workers && (
      <List>
        {workers.map((worker, index) => (
          <ListItem key={index}>
            <PastWorkersListRow worker={worker} />
          </ListItem>
        ))}
      </List>
    )}
  </>
)
