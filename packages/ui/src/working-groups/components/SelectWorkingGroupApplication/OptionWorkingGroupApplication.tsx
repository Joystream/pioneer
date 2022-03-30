import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { MemberInfoAvatar } from '@/memberships/components/Avatar'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const OptionWorkingGroupApplication = ({ application }: Props) => (
  <OptionWorkingGroupApplicationWrapper>
    <AvatarWrapper>
      <MemberInfoAvatar avatarUri={application.applicant?.avatar} member={application.applicant} />
    </AvatarWrapper>
    <ApplicantWrapper>
      <OptionWorkingGroupApplicationTitle>{application.applicant?.handle}</OptionWorkingGroupApplicationTitle>
      <TextMedium>Member ID: {application.applicant.id}</TextMedium>
    </ApplicantWrapper>
  </OptionWorkingGroupApplicationWrapper>
)

const OptionWorkingGroupApplicationWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;

  ${TextMedium} {
    ${Overflow.DotsTwoLine};
    color: ${Colors.Black[500]};
  }
`

export const OptionWorkingGroupApplicationTitle = styled.h5`
  transition: ${Transitions.all};
`

const AvatarWrapper = styled.div``
const ApplicantWrapper = styled.div`
  padding-left: 15px;
`
