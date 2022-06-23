import React from 'react'
import styled, { css } from 'styled-components'

import { Arrow, CheckboxIcon } from '@/common/components/icons'
import { TextInlineSmall } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

import { StepperTheme } from './themes'
import { asStepsToRender, StepperStep, StepToRender } from './types'

export interface StepperProps {
  steps: StepperStep[]
  theme?: keyof typeof StepperTheme
}

const getStepFace = (step: StepToRender) => {
  if (step.isBaby) {
    return null
  }

  if (step.isActive || step.hideNumber) {
    return <Arrow direction="right" />
  }

  if (step.isPast) {
    return <CheckboxIcon />
  }

  return step.number
}

export const Stepper = ({ steps, theme = 'dark' }: StepperProps) => {
  const stepsToRender = asStepsToRender(steps)

  return (
    <StepperWrap theme={StepperTheme[theme]}>
      {stepsToRender.map((step, index) => (
        <StepWrap
          data-testid={`${step.title}-${step.type}`}
          key={index}
          theme={StepperTheme[theme]}
          {...step}
          id={step.id}
        >
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
  )
}

const StepperWrap = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 20px;
  align-content: start;
  background-color: ${({ theme }) => theme.stepperBackground};
  color: ${({ theme }) => theme.stepperText};
`

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  border-radius: ${BorderRad.round};
  font-weight: 700;
  transition: ${Transitions.all};
`

const StepTitle = styled.h6`
  align-self: center;
  text-transform: capitalize;
  transition: ${Transitions.all};
`

const StepBody = styled.div`
  display: grid;
  align-items: center;
  row-gap: 8px;
`

type StepNumberProps = Pick<StepToRender, 'isActive' | 'isPast' | 'hideNumber' | 'isBaby'> & { onClick?: () => void }

const StepWrap = styled.div<StepNumberProps>`
  display: grid;
  position: relative;
  grid-template-columns: 28px 1fr;
  grid-column-gap: 8px;
  justify-content: start;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};

  /* History line */
  &:not(:last-child) {
    ${StepNumber}:before {
      content: '';
      position: absolute;
      top: ${({ isBaby }) => (isBaby ? '12px' : '28px')};
      left: 14px;
      width: 1px;
      height: calc(100% + 20px);
      transform: translateX(-50%);
      background-color: ${({ theme }) => theme.stepperLine};
      transition: ${Transitions.all};
    }
  }

  ${StepNumber} {
    background-color: ${({ theme }) => theme.stepperBackground};
    border: 2px solid ${Colors.Black[600]};
    width: 28px;
    height: 28px;

    ${({ isBaby, theme }) => {
      if (isBaby)
        return css`
          background-color: ${theme.stepperText};
          border-color: transparent;
          color: transparent;
          margin-top: 4px;
          height: 8px;
          width: 8px;
        `
    }};

    ${({ isActive, isPast, hideNumber, theme }) => {
      if (isActive)
        return css`
          background-color: ${Colors.Blue[500]};
          border-color: ${Colors.Blue[500]};
          color: ${Colors.White};
        `
      if (isPast || hideNumber)
        return css`
          background-color: ${theme.stepperPastBackground};
          border-color: ${theme.stepperPastBackground};
          color: ${Colors.White};
        `
    }};
  }

  ${StepTitle} {
    font-weight: ${({ theme }) => theme.stepperTitleFontWeight};
    -webkit-text-stroke-width: 0.05em;
    -webkit-text-stroke-color: transparent;

    ${({ isActive, isBaby, theme }) => {
      if (isBaby)
        return css`
          color: ${Colors.Black[400]};
          font-size: 12px;
          line-height: 18px;
        `
      if (isActive)
        return css`
          color: ${theme.stepperActiveTitle};
          -webkit-text-stroke-color: ${theme.stepperActiveTitleTextStroke};
        `
    }}
  }
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
