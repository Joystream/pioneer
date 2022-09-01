import React from 'react'
import styled from 'styled-components'

import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface Props {
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export const DrawerContainer = ({ title, children, className, subtitle }: Props) => (
  <Wrapper className={className}>
    <TextExtraHuge bold>{title}</TextExtraHuge>
    <StyledSubtitle>{subtitle}</StyledSubtitle>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > *:first-child {
    color: ${Colors.White};
  }
`

const StyledSubtitle = styled(TextMedium)`
  color: ${Colors.Black[300]};
  margin-bottom: 50px;
`
