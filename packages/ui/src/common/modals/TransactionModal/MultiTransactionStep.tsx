import React from 'react'
import styled, { css } from 'styled-components'

import { Arrow } from '@/common/components/icons'
import { TextInlineMedium, TextInlineSmall } from '@/common/components/typography'
import { BorderRad, Colors, Fonts, Overflow, Transitions } from '@/common/constants'

export interface MultiTransactionStepProps {
  stepNumber: number
  stepTitle: string
  active: boolean
  past: boolean
}

export const MultiTransactionStep = ({ stepNumber, stepTitle, active, past }: MultiTransactionStepProps) => {
  return (
    <Step active={active} past={past}>
      <StepArrow>
        <Arrow direction="right" />
      </StepArrow>
      <StepContent>
        <StepNumber>{stepNumber}</StepNumber>
        <StepInfo>
          <StepTransactionInfo lighter>Transaction {stepNumber}</StepTransactionInfo>
          <StepTransactionTitle bold>{stepTitle}</StepTransactionTitle>
        </StepInfo>
      </StepContent>
    </Step>
  )
}

const StepArrow = styled.div`
  display: none;
  width: fit-content;
  height: fit-content;
  margin-right: 24px;
  color: ${Colors.Black[600]};
  transition: ${Transitions.all};
`

const StepContent = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  column-gap: 12px;
`

const StepNumber = styled(TextInlineMedium)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  width: fit-content;
  height: 24px;
  padding: 0 4px;
  line-height: 14px;
  font-weight: 700;
  font-family: ${Fonts.Inter};
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[400]};
  border-radius: ${BorderRad.full};
  background-color: transparent;
  ${Overflow.FullDots};
  transition: ${Transitions.all};
`

const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: fit-content;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
`

const StepTransactionInfo = styled(TextInlineSmall)`
  line-height: 14px;
  font-family: ${Fonts.Inter};
  transition: ${Transitions.all};
  ${Overflow.FullDots};
`

const StepTransactionTitle = styled(TextInlineMedium)`
  color: ${Colors.Black[600]};
  ${Overflow.FullDots};
  transition: ${Transitions.all};
`

const Step = styled(StepContent)<{ active: boolean; past: boolean }>`
  column-gap: 0;

  & + & {
    margin-left: 24px;
    ${StepArrow} {
      display: flex;
    }
  }
  ${({ active, past }) => {
    if (past) {
      return css`
        ${StepArrow} {
          color: ${Colors.Black[300]};
        }
        ${StepNumber} {
          background-color: transparent;
          border-color: ${Colors.Black[300]};
          color: ${Colors.Black[500]};
        }
        ${StepTransactionInfo} {
          color: ${Colors.Black[300]};
        }
        ${StepTransactionTitle} {
          color: ${Colors.Black[500]};
        }
      `
    }
    if (active) {
      return css`
        ${StepArrow} {
          color: ${Colors.Black[900]};
        }
        ${StepNumber} {
          background-color: ${Colors.Blue[500]};
          border-color: ${Colors.Blue[500]};
          color: ${Colors.White};
        }
        ${StepTransactionInfo} {
          color: ${Colors.Black[500]};
        }
        ${StepTransactionTitle} {
          color: ${Colors.Black[900]};
        }
      `
    }
  }}
`
