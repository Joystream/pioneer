import React from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'
import { spacing } from '@/common/utils/styles'

import { ColumnGapBlock, RowGapBlock } from './page/PageContent'
import { Tooltip, TooltipDefault } from './Tooltip'

export interface InfoProps {
  title: string
  content: React.ReactNode
}

export const Info = ({ title, content }: InfoProps) => {
  return (
    <InfoBlock gap={8}>
      <ColumnGapBlock gap={8} alignCenter>
        <Tooltip tooltipText="Lorem ipsum">
          <TooltipDefault />
        </Tooltip>
        <h5>{title}</h5>
      </ColumnGapBlock>
      {content}
    </InfoBlock>
  )
}

const InfoBlock = styled(RowGapBlock)`
  background-color: ${Colors.Blue[50]};
  position: relative;
  padding: ${spacing(2)};
`
