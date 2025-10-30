import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

import { asStepsToRender, StepperStep, StepToRender } from '@/common/components/Stepper/types'
import { BorderRad, BreakPoints, Colors, Fonts, Transitions } from '@/common/constants'

import { CheckboxIcon } from '../icons'

export interface HorizontalStepperProps {
  steps: StepperStep[]
}

export const HorizontalStepper = ({ steps }: HorizontalStepperProps) => {
  const stepsToRender = asStepsToRender(steps)

  return (
    <HorizontalStepperWrapper>
      {stepsToRender.map((step, index) => (
        <Fragment key={`horizontal-stepper-${index}`}>
          <Step step={step}>
            <StepCircle>{step.isPast ? <CheckboxIcon /> : index + 1}</StepCircle>
            <StepBody>
              <StepTitle>{step.title}</StepTitle>
            </StepBody>
          </Step>
          {index < stepsToRender.length - 1 && <Separator />}
        </Fragment>
      ))}
    </HorizontalStepperWrapper>
  )
}

const Separator = styled.i`
  min-width: 20px;
  height: 1px;
  background-color: ${Colors.Black[500]};
`

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
  text-align: center;
  text-transform: capitalize;
  transition: ${Transitions.all};
  font-weight: 400;
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
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  align-items: center;
  justify-content: center;
  width: fit-content;
  flex: 1 1 0;

  ${StepCircle} {
    ${({ step: { isActive } }) => (isActive ? activeStepCss : pastStepCss)};
  }

  ${StepTitle} {
    ${({ step: { isActive } }) => {
      return isActive ? 'color: white; font-weight: 700' : `color: ${Colors.Black[400]}`
    }};
  }

  @media (min-width: ${BreakPoints.sm}px) {
    flex-direction: row;
    flex: auto;
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
  gap: 12px;
`
