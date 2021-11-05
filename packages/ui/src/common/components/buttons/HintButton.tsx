import React from 'react'
import styled from 'styled-components'

import { HintIcon } from '@/common/components/icons/HintIcon'
import { Colors } from '@/common/constants'

import { ButtonGhost, ButtonGhostStyles, ButtonPrimary, ButtonPrimaryStyles } from './Buttons'

export interface HintIconProps {
  isActive?: boolean
  onClick?: () => void
}

export function HintButton({ isActive, onClick }: HintIconProps) {
  return (
    <HintButtonWrapper isActive onClick={onClick}>
      {!isActive && (
        <ButtonGhost size="small">
          <HintIcon />
        </ButtonGhost>
      )}
      {isActive && (
        <ButtonPrimary size="small">
          <HintIcon />
        </ButtonPrimary>
      )}
    </HintButtonWrapper>
  )
}

export const HintButtonWrapper = styled.div<{ isActive?: boolean }>`
  ${ButtonGhostStyles}, ${ButtonPrimaryStyles} {
    border-radius: 100%;
    color: ${(props) => (props.isActive ? Colors.White : Colors.Grey)};
  }
`
