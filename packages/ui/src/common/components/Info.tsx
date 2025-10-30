import React from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { RowGapBlock } from './page/PageContent'

export interface InfoProps {
  title?: string
  children: React.ReactNode
}

export const Info = ({ title, children }: InfoProps) => {
  return (
    <InfoBlock gap={8}>
      {title && <h5>{title}</h5>}
      {children}
    </InfoBlock>
  )
}

const InfoBlock = styled(RowGapBlock)`
  background-color: ${Colors.Blue[50]};
  position: relative;
  padding: 16px;
`
