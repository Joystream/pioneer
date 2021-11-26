import React from 'react'
import styled from 'styled-components'

import { TextSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { WorkingGroupOpening } from '@/working-groups/types'

interface Props {
  opening: WorkingGroupOpening
}

export const OptionWorkingGroupOpening = ({ opening }: Props) => (
  <OptionWorkingGroupWrapper>
    <TextSmall>ID: {opening.id}</TextSmall>
    <OptionWorkingGroupTitle>{camelCaseToText(opening.title)}</OptionWorkingGroupTitle>
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
  justify-content: center;

  ${TextSmall} {
    color: ${Colors.Black[500]};
  }
`

export const OptionWorkingGroupTitle = styled.h5`
  transition: ${Transitions.all};
`
