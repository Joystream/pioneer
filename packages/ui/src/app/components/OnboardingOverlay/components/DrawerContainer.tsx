import React from 'react'
import styled from 'styled-components'

import { TextGiant } from '@/common/components/typography'

export interface Props {
  title: string
  children: React.ReactNode
}

export const DrawerContainer = ({ title, children }: Props) => (
  <Wrapper>
    <TextGiant bold>{title}</TextGiant>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  height: 100%;

  > *:first-child {
    margin-bottom: 50px;
  }
`
