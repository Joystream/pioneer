import React from 'react'

import { List, ListItem } from '@/common/components/List'

import { WorkerWithMemberAndApplication } from '../../types'

import { WorkersTableListRow } from './WorkersTableListRow'

export interface WorkersTableListProps {
  workers?: WorkerWithMemberAndApplication[]
  past?: boolean
}

export const WorkersTableList = ({ workers, past }: WorkersTableListProps) => (
  <>
    {workers && (
      <List>
        {workers.map((worker) => (
          <ListItem key={worker.member.id}>
            <WorkersTableListRow member={worker.member} past={past} />
          </ListItem>
        ))}
      </List>
    )}
  </>
)
