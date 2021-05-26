import React from 'react'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { Member } from '@/memberships/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  myApplication?: Member
  hired?: Member
  allApplicants?: {
    member: Member
  }[]
  hiringComplete: boolean
  leaderId?: string | null
}

export const ApplicantsList = ({ hired, allApplicants, myApplication, hiringComplete, leaderId }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {myApplication && (
        <ContentWithTabs>
          <Label>My application</Label>
          <Worker member={myApplication} isLeader={myApplication.id === leaderId} />
        </ContentWithTabs>
      )}
      {hiringComplete && <Warning title={'Hiring complete!'} content={'We are very sorry, you haven’t been chosen.'} />}
      {hired && (
        <ContentWithTabs>
          <Label>Hired</Label>
          <Worker member={hired} isLeader={hired.id === leaderId} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          All applicants <CountBadge count={allApplicants?.length ?? 0} />{' '}
        </Label>
        {allApplicants && (
          <ContentWithTabs>
            {allApplicants.map(({ member }) => (
              <Worker key={member.handle} member={member} isLeader={member.id === leaderId} />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}
