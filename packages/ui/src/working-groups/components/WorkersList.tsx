import React from 'react'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { WorkerBaseInfo } from '@/working-groups/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  lead?: WorkerBaseInfo
  workers?: WorkerBaseInfo[]
}

export const WorkersList = ({ lead, workers }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {lead && (
        <ContentWithTabs>
          <Label>Lead</Label>
          <Worker member={lead.member} applicationId={lead.applicationId} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          Workers <CountBadge count={workers?.length ?? 0} />{' '}
        </Label>
        {workers && (
          <ContentWithTabs>
            {workers
              .filter(({ member }) => member.id !== lead?.member.id)
              .map((worker, index) => (
                <Worker key={index} member={worker.member} applicationId={worker.applicationId} />
              ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}
