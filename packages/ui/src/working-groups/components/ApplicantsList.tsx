import React from 'react'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { WorkingGroupOpeningApplication } from '@/working-groups/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  myApplication?: WorkingGroupOpeningApplication
  hired?: WorkingGroupOpeningApplication[]
  allApplicants?: WorkingGroupOpeningApplication[]
  hiringComplete: boolean
}

export const ApplicantsList = ({ hired, allApplicants, myApplication, hiringComplete }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {myApplication && (
        <ContentWithTabs>
          <Label>My application</Label>
          <Worker member={myApplication.member} applicationId={myApplication.id} />
        </ContentWithTabs>
      )}
      {hiringComplete && myApplication && !hired && (
        <Warning
          title={'Hiring complete!'}
          content={
            'Hiring complete! We are sorry, your application was not successful this time. We encourage you to explore alternative openings and subscribe to notifications.'
          }
        />
      )}
      {hired && (
        <ContentWithTabs>
          <Label>Hired</Label>
          {hired.map((application, index) => (
            <Worker key={index} member={application.member} applicationId={application.id} />
          ))}
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          All applicants <CountBadge count={allApplicants?.length ?? 0} />{' '}
        </Label>
        {allApplicants && (
          <ContentWithTabs>
            {allApplicants.map((application, index) => (
              <Worker key={index} member={application.member} applicationId={application.id} />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}
