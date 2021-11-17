import React from 'react'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'

interface Props {
  steps: string[]
}

export const HorizontalStaticStepper = ({ steps }: Props) => {
  return (
    <Wrapper>
      {steps.map((text, index) => (
        <>
          {!!index && <Dash key={`horizontalStepper-1-${index}`} />}
          <Step key={`horizontalStepper-2-${index}`}>
            <StepCircle>{index + 1}</StepCircle>
            <TextMedium>{text}</TextMedium>
          </Step>
        </>
      ))}
    </Wrapper>
  )
}

const Dash = styled.div`
  height: 1px;
  width: 40px;
  background-color: ${Colors.Black[200]};
  margin-top: 12px;
  flex: 1;
`

const StepCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  width: 32px;
  color: ${Colors.White};
  height: 32px;
  border-radius: ${BorderRad.round};
  background: ${Colors.Black[500]};
  font-weight: 700;
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 2;
  > *:last-child {
    margin-top: 8px;
    color: ${Colors.Black[400]};
    max-width: 250px;
    text-align: center;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
