import React from 'react'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { WorkingGroupOpeningApplication } from '@/working-groups/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  myApplication?: WorkingGroupOpeningApplication
  hired?: WorkingGroupOpeningApplication
  allApplicants?: WorkingGroupOpeningApplication[]
  hiringComplete: boolean
  leadId?: string | null
}

export const ApplicantsList = ({ hired, allApplicants, myApplication, hiringComplete, leadId }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {myApplication && (
        <ContentWithTabs>
          <Label>My application</Label>
          <Worker
            member={myApplication.member}
            applicationId={myApplication.id}
            isLead={myApplication.member.id === leadId}
          />
        </ContentWithTabs>
      )}
      {hiringComplete && <Warning title={'Hiring complete!'} content={'We are very sorry, you haven’t been chosen.'} />}
      {hired && (
        <ContentWithTabs>
          <Label>Hired</Label>
          <Worker member={hired.member} applicationId={hired.id} isLead={hired.member.id === leadId} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          All applicants <CountBadge count={allApplicants?.length ?? 0} />{' '}
        </Label>
        {allApplicants && (
          <ContentWithTabs>
            {allApplicants.map((application, index) => (
              <Worker
                key={index}
                member={application.member}
                applicationId={application.id}
                isLead={application.member.id === leadId}
              />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}
