import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const OptionWorkingGroupApplication = ({ application }: Props) => (
  <OptionWorkingGroupApplicationWrapper>
    <TextMedium>ID: {application.id}</TextMedium>
    <OptionWorkingGroupApplicationTitle>{application.applicant?.handle}</OptionWorkingGroupApplicationTitle>
  </OptionWorkingGroupApplicationWrapper>
)

const OptionWorkingGroupApplicationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  justify-content: center;

  ${TextMedium} {
    ${Overflow.DotsTwoLine};
    color: ${Colors.Black[500]};
  }
`

export const OptionWorkingGroupApplicationTitle = styled.h5`
  transition: ${Transitions.all};
`
