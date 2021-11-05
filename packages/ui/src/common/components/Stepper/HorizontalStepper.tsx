import React from 'react'
import styled, { css } from 'styled-components'

import { HorizontalStepperTheme } from '@/common/components/Stepper/themes'
import { asStepsToRender, StepperStep, StepToRender } from '@/common/components/Stepper/types'
import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants'

import { CheckboxIcon } from '../icons'

export interface HorizontalStepperProps {
  steps: StepperStep[]
  theme?: keyof typeof HorizontalStepperTheme
}

export const HorizontalStepper = ({ steps, theme = 'light' }: HorizontalStepperProps) => {
  const stepsToRender = asStepsToRender(steps)

  return (
    <HorizontalStepperWrapper>
      {stepsToRender.map((step, index) => (
        <Step theme={HorizontalStepperTheme[theme]} step={step}>
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
  background-color: ${Colors.Black[500]};
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

export const Step = styled.div<{ step: StepToRender; theme: typeof HorizontalStepperTheme }>`
  display: flex;
  position: relative;
  align-items: center;
  width: fit-content;

  &:not(:first-child) {
    margin-left: 12px;
  }

  &:not(:last-child) {
    width: 100%;

    &:after {
      content: '';
      width: max-content;
      min-width: 20px;
      height: 1px;
      background-color: ${Colors.Black[500]};
    }
  }
  ${StepCircle} {
    ${({ step: { isPast, isActive } }) => {
      if (isPast) {
        return pastStepCss
      }
      if (isActive) {
        return activeStepCss
      }
    }};
  }

  ${StepTitle} {
    ${({ theme }) => `color: ${theme.stepperText}`}
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
