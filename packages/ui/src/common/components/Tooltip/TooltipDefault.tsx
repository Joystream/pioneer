import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'
import { QuestionIcon } from '../icons'

export interface DefaultTooltipProps {
  className?: string
}

export const TooltipDefault = ({ className }: DefaultTooltipProps) => {
  return (
    <DefaultTooltip className={className}>
      <QuestionIcon />
    </DefaultTooltip>
  )
}

export const DefaultTooltip = styled.div<DefaultTooltipProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.full};
  background-color: transparent;
  color: ${Colors.Black[500]};
  cursor: pointer;
  transition: ${Transitions.all};
`
