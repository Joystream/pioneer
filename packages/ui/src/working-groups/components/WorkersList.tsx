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

const workersWithoutLead = (list: WorkerBaseInfo[], leadId: number) => list.filter((w) => +w.member.id !== leadId)

export const WorkersList = ({ lead, workers }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {lead && (
        <ContentWithTabs>
          <Label>Lead</Label>
          <Worker member={lead.member} applicationId={lead.applicationId} isLead={true} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          Workers <CountBadge count={workers?.length ?? 0} />{' '}
        </Label>
        {workers && (
          <ContentWithTabs>
            {workersWithoutLead(workers, +(lead?.member?.id || 0)).map((worker, index) => (
              <Worker key={index} member={worker.member} applicationId={worker.applicationId} />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}
