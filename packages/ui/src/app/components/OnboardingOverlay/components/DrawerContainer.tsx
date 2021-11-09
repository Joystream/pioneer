import React from 'react'
import styled from 'styled-components'

import { TextGiant } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface Props {
  title?: string
  className?: string
  children: React.ReactNode
}

export const DrawerContainer = ({ title, children, className }: Props) => (
  <Wrapper className={className}>
    <TextGiant bold>{title}</TextGiant>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > *:first-child {
    margin-bottom: 50px;
    color: ${Colors.White};
  }
`
