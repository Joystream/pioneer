import React from 'react'
import styled, { css, ThemeProvider } from 'styled-components'

import { Arrow, CheckboxIcon } from '@/common/components/icons'
import { TextInlineSmall } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { spacing } from '@/common/utils/styles'

import { StepperTheme } from './themes'
import { asStepsToRender, StepperStep, StepToRender } from './types'

export interface StepperProps {
  steps: StepperStep[]
  theme?: typeof StepperTheme.light
}

const getStepFace = (step: StepToRender) => {
  if (step.isBaby) {
    return null
  }

  if (step.isActive) {
    return <Arrow direction="right" />
  }

  if (step.isPast) {
    return <CheckboxIcon />
  }

  return step.number
}

export const Stepper = ({ steps, theme = StepperTheme.light }: StepperProps) => {
  const stepsToRender = asStepsToRender(steps)

  return (
    <ThemeProvider theme={theme}>
      <StepperWrap>
        {stepsToRender.map((step, index) => (
          <StepWrap key={index} {...step}>
            <StepNumber>
              <StepNumberText value>{getStepFace(step)}</StepNumberText>
            </StepNumber>
            <StepBody>
              <StepTitle>{step.title}</StepTitle>
              {step.details}
            </StepBody>
          </StepWrap>
        ))}
      </StepperWrap>
    </ThemeProvider>
  )
}

export const StepperWrap = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 20px;
  align-content: start;
  background-color: ${({ theme }) => theme.stepperBackground};
  color: ${({ theme }) => theme.stepperTitle};
`

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  width: 28px;
  height: 28px;
  border: 2px solid ${Colors.Black[600]};
  border-radius: ${BorderRad.round};
  font-weight: 700;
  background-color: ${({ theme }) => theme.stepperBackground};
  transition: ${Transitions.all};
`

const StepTitle = styled.h6`
  font-weight: ${({ theme }) => theme.stepperTitleFontWeight};
  align-self: center;
  color: ${({ theme }) => theme.stepperTitle};
  -webkit-text-stroke-width: 0.05em;
  -webkit-text-stroke-color: transparent;
  transition: ${Transitions.all};
`

const StepBody = styled.div`
  display: grid;
  align-items: center;
  row-gap: ${spacing(1)};
`

type StepNumberProps = Pick<StepToRender, 'isActive' | 'isPast' | 'isBaby'>

const StepWrap = styled.div<StepNumberProps>`
  display: grid;
  position: relative;
  grid-template-columns: 28px 1fr;
  grid-column-gap: 8px;
  justify-content: start;

  &:not(:last-child) {
    ${StepNumber}:before {
      content: '';
      position: absolute;
      top: 28px;
      left: 14px;
      width: 1px;
      height: calc(100% + 20px);
      transform: translateX(-50%);
      background-color: ${({ theme }) => theme.stepperLine};
      transition: ${Transitions.all};
    }
  }

  ${({ isBaby, theme }) =>
    isBaby &&
    css`
      ${StepNumber} {
        width: 8px;
        height: 8px;
        margin-top: 4px;
        color: transparent;
        border-color: transparent;
        background-color: ${theme.stepperTitle};
      }
      ${StepTitle} {
        font-size: 12px;
        line-height: 18px;
        color: ${Colors.Black[400]};
        -webkit-text-stroke-color: transparent;
      }
      &:not(:last-child) {
        ${StepNumber}:before {
          top: 12px;
        }
      }
    `};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      ${StepNumber} {
        color: ${Colors.White};
        border-color: ${Colors.Blue[500]};
        background-color: ${Colors.Blue[500]};
      }
      ${StepTitle} {
        color: ${theme.stepperActiveTitle};
        -webkit-text-stroke-color: ${theme.stepperActiveTitleTextStroke};
      }
    `}

  ${({ isPast, theme }) =>
    isPast &&
    css`
      ${StepNumber} {
        color: ${Colors.White};
        background-color: ${theme.stepperPastBackground};
        border-color: ${theme.stepperPastBackground};
      }
    `}
`

const StepNumberText = styled(TextInlineSmall)`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: inherit;
  line-height: 13px;
`
