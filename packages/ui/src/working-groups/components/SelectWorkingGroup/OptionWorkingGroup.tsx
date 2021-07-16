import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Overflow, Transitions } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { WorkingGroup } from '@/working-groups/types'

interface Props {
  group: WorkingGroup
}

export const OptionWorkingGroup = ({ group }: Props) => (
  <OptionWorkingGroupWrapper>
    <OptionWorkingGroupTitle>{camelCaseToText(group.name)}</OptionWorkingGroupTitle>
    <TextMedium light>{group.about}</TextMedium>
  </OptionWorkingGroupWrapper>
)

const OptionWorkingGroupWrapper = styled.div`
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

export const OptionWorkingGroupTitle = styled.h5`
  transition: ${Transitions.all};
`
