import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { Member } from '@/memberships/types'

import { WorkersTableListRow } from './WorkersTableListRow'

export interface WorkersTableListProps {
  workers?: Member[]
  past?: boolean
}

export const WorkersTableList = ({workers, past }: WorkersTableListProps) => (
  <>
    {workers && (
      <List>
        {workers.map((worker) => (
          <ListItem key={worker.id}>
            <WorkersTableListRow worker={worker} past={past} />
          </ListItem>
        ))}
      </List>
    )}
  </>
)
