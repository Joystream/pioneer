import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
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
    <ColumnGapBlock gap={8} align="center">
      <OptionWorkingGroupTitle>{camelCaseToText(opening.title)}</OptionWorkingGroupTitle>
      {opening.type === 'LEAD' ? <BadgeStatus>LEAD</BadgeStatus> : null}
    </ColumnGapBlock>
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
  gap: 8px;

  ${TextSmall} {
    color: ${Colors.Black[500]};
  }
`

export const OptionWorkingGroupTitle = styled.h5`
  transition: ${Transitions.all};
`
