import React from 'react'
import styled from 'styled-components'

import { TextInlineBig, TextInlineSmall } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'

interface VerticalStaticStepperData {
  stepState: {
    title: string
    subtitle?: string | undefined
  }
}
export interface VerticalStaticStepperProps {
  steps: Array<VerticalStaticStepperData>
}

export const VerticalStaticStepper = ({ steps }: VerticalStaticStepperProps) => {
  return (
    <StepperWrap>
      {steps.map((item, index) => (
        <StepWrap>
          <StepNumber>
            <StepNumberText value>{index + 1}</StepNumberText>
          </StepNumber>
          <StepBody>
            <StepTitle>{item.stepState.title}</StepTitle>
            <StepSubtitle>{item.stepState.subtitle}</StepSubtitle>
          </StepBody>
        </StepWrap>
      ))}
    </StepperWrap>
  )
}

const StepperWrap = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 20px;
  align-content: start;
`

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  border-radius: ${BorderRad.round};
  background: ${Colors.Black[500]};
  font-weight: 700;
`

const StepTitle = styled.h6`
  align-self: center;
  text-transform: capitalize;
`
const StepSubtitle = styled(TextInlineSmall)`
  color: ${Colors.White};
`
const StepBody = styled.div`
  display: grid;
  align-items: center;
  row-gap: 8px;
  padding-left: 16px;
`

const StepWrap = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 28px 1fr;
  grid-column-gap: 8px;
  justify-content: start;

  &:not(:last-child) {
    ${StepNumber}:before {
      content: '';
      position: absolute;
      left: 14px;
      top: 49px;
      width: 1px;
      height: calc(100% + 20px);
      transform: translateX(-50%);
      background-color: ${Colors.White};
    }
  }

  ${StepNumber} {
    border: 2px solid ${Colors.Black[500]};
    width: 49px;
    height: 49px;
  }

  ${StepTitle} {
    font-weight: ${({ theme }) => theme.stepperTitleFontWeight};
    -webkit-text-stroke-width: 0.05em;
    -webkit-text-stroke-color: transparent;
    color: ${Colors.White};
  }
`

const StepNumberText = styled(TextInlineBig)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: ${Colors.White};
  line-height: 13px;
`
