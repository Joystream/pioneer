import React from 'react'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { WorkerBaseInfo } from '@/working-groups/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  leader?: WorkerBaseInfo
  workers?: WorkerBaseInfo[]
}

export const WorkersList = ({ leader, workers }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {leader && (
        <ContentWithTabs>
          <Label>Leader</Label>
          <Worker member={leader.member} applicationId={leader.applicationId} isLeader={true} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          Workers <CountBadge count={workers?.length ?? 0} />{' '}
        </Label>
        {workers && (
          <ContentWithTabs>
            {workers.map((worker, index) => (
              <Worker key={index} member={worker.member} applicationId={worker.applicationId} />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}
