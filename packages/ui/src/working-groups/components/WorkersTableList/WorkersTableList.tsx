import React from 'react'

import { List, ListItem } from '@/common/components/List'

import { WorkerBaseInfo } from '../../types'

import { WorkersTableListRow } from './WorkersTableListRow'

export interface WorkersTableListProps {
  workers?: WorkerBaseInfo[]
  past?: boolean
}

export const WorkersTableList = ({ workers, past }: WorkersTableListProps) => (
  <>
    {workers && (
      <List>
        {workers.map((worker, index) => (
          <ListItem key={index}>
            <WorkersTableListRow member={worker.member} past={past} />
          </ListItem>
        ))}
      </List>
    )}
  </>
)
