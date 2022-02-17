import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowRightLinkIcon } from '@/common/components/icons'
import { TextMedium } from '@/common/components/typography'
import { Colors, BorderRad } from '@/common/constants'

interface Props {
  title: string
  linkPath: string
  infoElements: React.ReactNode
  scroller: React.ReactNode
}

export const OverviewWrapper = ({ title, linkPath, infoElements, scroller }: Props) => {
  const history = useHistory()

  return (
    <Wrapper>
      <Upper>
        <Title black bold>
          {title}
        </Title>
        <ArrowRight onClick={() => history.push(linkPath)} />
        <InfoElementsWrapper>{infoElements}</InfoElementsWrapper>
      </Upper>
      {scroller}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
  overflow: hidden;
`

const Upper = styled.div`
  padding: 18px 18px 0;
`

const Title = styled(TextMedium)`
  margin-bottom: 25px;
`

const ArrowRight = styled(ArrowRightLinkIcon)`
  position: absolute;
  top: 24px;
  right: 18px;
  cursor: pointer;
`

const InfoElementsWrapper = styled.div`
  display: flex;
  column-gap: 50px;
`
