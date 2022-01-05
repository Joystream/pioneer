import React, { useState, memo } from 'react'
import styled from 'styled-components'

import { entrantResultMapper } from '@/bounty/helpers'
import { EntrantResult } from '@/bounty/types/Bounty'
import { CloseButton } from '@/common/components/buttons'
import { TextBig, TextMedium } from '@/common/components/typography'
import { BorderRad, Fonts } from '@/common/constants'

export interface InfoboxProps {
  result: EntrantResult
}

export const Infobox = memo(({ result }: InfoboxProps) => {
  const [closed, setClosed] = useState(false)
  const { title, text, color } = entrantResultMapper[result]
  return (
    <>
      {!closed && (
        <Wrapper color={color}>
          <StyledCloseButton onClick={() => setClosed(true)} />
          <Title bold>{title}</Title>
          <TextMedium>{text}</TextMedium>
        </Wrapper>
      )}
    </>
  )
})

const Wrapper = styled.div<{ color: string }>`
  position: relative;
  background-color: ${({ color }) => color};
  border-radius: ${BorderRad.s};
  width: 100%;
  max-width: 255px;
  padding: 16px;
  margin: 16px 0 20px;
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`

const Title = styled(TextBig)`
  font-family: ${Fonts.Grotesk};
  margin-bottom: 8px;
`
