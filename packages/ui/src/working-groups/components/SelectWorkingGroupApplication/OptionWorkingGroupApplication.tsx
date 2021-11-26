import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Overflow, Transitions } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const OptionWorkingGroupApplication = ({ application }: Props) => (
  <OptionWorkingGroupApplicationWrapper>
    <OptionWorkingGroupApplicationTitle>{camelCaseToText(application.id)}</OptionWorkingGroupApplicationTitle>
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

  ${TextMedium} {
    ${Overflow.DotsTwoLine};
  }
`

export const OptionWorkingGroupApplicationTitle = styled.h5`
  transition: ${Transitions.all};
`
