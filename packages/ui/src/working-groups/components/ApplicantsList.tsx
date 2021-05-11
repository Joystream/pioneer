import React, { useState } from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithTabs, RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { Colors } from '@/common/constants/styles'
import { spacing, size } from '@/common/utils/styles'
import { Member } from '@/memberships/types'

import { Worker } from './Worker'

export interface WorkersListProps {
  myApplication?: Member
  hired?: Member
  allApplicants?: {
    member: Member
  }[]
  hiringComplete: boolean
}

export const ApplicantsList = ({ hired, allApplicants, myApplication, hiringComplete }: WorkersListProps) => {
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(hiringComplete)

  const onWaringClose = () => {
    setIsWarningOpen((prevState) => !prevState)
  }

  return (
    <RowGapBlock gap={36}>
      {myApplication && (
        <ContentWithTabs>
          <Label>My application</Label>
          <Worker member={myApplication} />
        </ContentWithTabs>
      )}
      {hiringComplete && isWarningOpen && (
        <Warning>
          <StyledCloseButton onClick={onWaringClose} />
          <h5>Hiring complete!</h5>
          <p>We are very sorry, you haven’t been chosen.</p>
        </Warning>
      )}
      {hired && (
        <ContentWithTabs>
          <Label>Hired</Label>
          <Worker member={hired} isLeader={hired} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          All applicants <CountBadge count={allApplicants?.length ?? 0} />{' '}
        </Label>
        {allApplicants && (
          <ContentWithTabs>
            {allApplicants.map(({ member }) => (
              <Worker key={member.handle} member={member} />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}

const Warning = styled.div`
  background-color: ${Colors.Red[50]};
  position: relative;
  padding: ${spacing(2)};
  color: ${Colors.Black[600]};

  h5 {
    margin-bottom: ${spacing(1)};
  }
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  ${size('16px')}
`
