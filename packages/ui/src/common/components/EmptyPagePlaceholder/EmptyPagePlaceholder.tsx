import React from 'react'
import styled from 'styled-components'

import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface EmptyPagePlaceholderProps {
  title: string
  copy: string
  button: React.ReactNode
}

export const EmptyPagePlaceholder = ({ copy, button, title }: EmptyPagePlaceholderProps) => {
  return (
    <MainPanel>
      <Container gap={16}>
        <h3>{title}</h3>
        <TextMedium>{copy}</TextMedium>
        {button}
      </Container>
    </MainPanel>
  )
}

export const Container = styled(RowGapBlock)`
  place-self: center;
  justify-items: center;
  width: 420px;
  height: fit-content;
  margin-top: 172px;
  text-align: center;
`
