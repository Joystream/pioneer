import React from 'react'
import styled, { css } from 'styled-components'

import { asStepsToRender, StepperStep, StepToRender } from '@/common/components/Stepper/types'
import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants'

import { CheckboxIcon } from '../icons'

export interface HorizontalStepperProps {
  steps: StepperStep[]
}

export const HorizontalStepper = ({ steps }: HorizontalStepperProps) => {
  const stepsToRender = asStepsToRender(steps)

  return (
    <HorizontalStepperWrapper>
      {stepsToRender.map((step, index) => (
        <Step step={step} key={`horizontal-stepper-${index}`}>
          <StepCircle>{step.isPast ? <CheckboxIcon /> : index + 1}</StepCircle>
          <StepBody>
            <StepTitle>{step.title}</StepTitle>
          </StepBody>
        </Step>
      ))}
    </HorizontalStepperWrapper>
  )
}

const pastStepCss = css`
  border-color: ${Colors.Black[500]};
  color: ${Colors.White};
`

const activeStepCss = css`
  background-color: ${Colors.Blue[500]};
  border-color: ${Colors.Blue[500]};
  color: ${Colors.White};
`

const StepTitle = styled.h6`
  align-self: center;
  text-transform: capitalize;
  transition: ${Transitions.all};
  font-weight: 400;
  padding-left: 8px;
  color: ${Colors.Black[400]};
`

export const StepCircle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  border: 2px solid ${Colors.Blue[400]};
  border-radius: ${BorderRad.full};
  color: ${Colors.Blue[400]};
  font-family: ${Fonts.Inter};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  transition: ${Transitions.all};
`

export const Step = styled.div<{ step: StepToRender }>`
  display: flex;
  position: relative;
  align-items: center;
  width: fit-content;

  &:not(:first-child) {
    margin-left: 12px;
  }

  &:not(:last-child) {
    &:after {
      margin-left: 12px;
      content: '';
      min-width: 20px;
      height: 1px;
      background-color: ${Colors.Black[500]};
    }
  }

  ${StepCircle} {
    ${({ step: { isActive } }) => (isActive ? activeStepCss : pastStepCss)};
  }

  ${StepTitle} {
    ${({ step: { isActive } }) => {
      return isActive ? 'color: white; font-weight: 700' : `color: ${Colors.Black[400]}`
    }};
  }
`

const StepBody = styled.div`
  display: grid;
  align-items: center;
  row-gap: 8px;
`

const HorizontalStepperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
