import React from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { ColumnGapBlock, RowGapBlock } from './page/PageContent'
import { Tooltip, TooltipDefault } from './Tooltip'

export interface InfoProps {
  title?: string
  children: React.ReactNode
}

export const Info = ({ title, children }: InfoProps) => {
  return (
    <InfoBlock gap={8}>
      {title && (
        <ColumnGapBlock gap={8} align="center">
          <Tooltip tooltipText="Lorem ipsum">
            <TooltipDefault />
          </Tooltip>
          <h5>{title}</h5>
        </ColumnGapBlock>
      )}
      {children}
    </InfoBlock>
  )
}

const InfoBlock = styled(RowGapBlock)`
  background-color: ${Colors.Blue[50]};
  position: relative;
  padding: 16px;
`
