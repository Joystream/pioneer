import React from 'react'
import styled from 'styled-components'

import { TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  title: string
  children: React.ReactNode
}

export const DetailBox = ({ title, children }: Props) => {
  return (
    <Wrapper>
      <TextSmall>{title}</TextSmall>
      <div>{children}</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;

  ${TextSmall} {
    color: ${Colors.Black[500]};
    width: max-content;
  }

  > div {
    font-weight: 700;
  }
`
