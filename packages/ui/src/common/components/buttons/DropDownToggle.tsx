import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../../constants'
import { DropItem } from '../animatedComponents/DropItem'
import { Arrow, Icon } from '../icons'

import { ButtonBareGhost, ButtonSize } from './Buttons'

interface DroppedProps {
  isDropped: boolean
}

interface DropDownToggleProps extends DroppedProps {
  children: ReactNode | ((isOpen: boolean, button: any) => ReactNode)
  className?: string
}

interface DropDownButtonProps extends DroppedProps {
  onClick: () => void
  className?: string
  size?: ButtonSize
}

export const DropDownToggle = ({ children, isDropped, className }: DropDownToggleProps) => {
  return (
    <ToggleContainer showBy={isDropped} className={className}>
      {children}
    </ToggleContainer>
  )
}

export const DropDownButton = ({ isDropped, className, size, onClick }: DropDownButtonProps) => {
  return (
    <ToggleButton onClick={onClick} isDropped={isDropped} size={size ?? 'small'} className={className} square>
      <Arrow direction="down" />
    </ToggleButton>
  )
}

const ToggleButton = styled(ButtonBareGhost)<DroppedProps>`
  background-color: transparent;
  color: ${Colors.Black[900]};
  &,
  &:hover,
  &:focus,
  &:active,
  &:disabled {
    background-color: transparent;
    border: 1px solid transparent;
  }
  &:hover,
  &:focus {
    color: ${Colors.Blue[500]};
  }
  &:active {
    color: ${Colors.Blue[600]};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${Colors.Black[400]};
  }
  &:before,
  &:after {
    display: none;
  }

  & > svg {
    color: inherit;
  }

  ${Icon.type} {
    transition: ${Transitions.all};
    transform: scaleY(${({ isDropped }) => (isDropped ? '-1' : '1')});
  }
`

export const ToggleContainer = styled(DropItem)`
  display: flex;
  flex-direction: column;
  width: 100%;
`
