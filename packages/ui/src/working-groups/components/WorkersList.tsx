import React from 'react'

import { CountBadge } from '@/common/components/CountBadge'
import { List, ListItem } from '@/common/components/List'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { Member } from '@/memberships/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  leader?: Member
  workers?: Member[]
  past?: boolean
}

export const WorkersList = ({ leader, workers, past }: WorkersListProps) => {
  return (
    <List as="div">
      <RowGapBlock gap={36} align="none">
        {leader && (
          <RowGapBlock gap={16} align="none">
            <Label>Leader</Label>
            <List>
              <ListItem>
                <Worker member={leader} isLeader={true} past={past} />
              </ListItem>
            </List>
          </RowGapBlock>
        )}
        <RowGapBlock gap={16} align="none">
          <Label>
            Workers <CountBadge count={workers?.length ?? 0} />{' '}
          </Label>
          {workers && (
            <List>
              {workers.map((member) => (
                <ListItem key={member.handle}>
                  <Worker member={member} past={past} />
                </ListItem>
              ))}
            </List>
          )}
        </RowGapBlock>
      </RowGapBlock>
    </List>
  )
}
