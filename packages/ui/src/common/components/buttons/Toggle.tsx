import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'
import { useToggle } from '../../hooks/useToggle'
import { isFunction } from '../../utils'
import { Arrow, Icon } from '../icons'

import { ButtonPrimary } from './Buttons'

interface ToggleableItemProps {
  children: ReactNode | ((isOpen: boolean) => ReactNode)
  absoluteToggle?: boolean
}

export const ToggleableItem = ({ children, absoluteToggle }: ToggleableItemProps) => {
  const [isOpen, toggleOpen] = useToggle()

  return (
    <Toggle isOpen={isOpen} absoluteToggle={absoluteToggle}>
      {isFunction(children) ? children(isOpen) : children}
      <ToggleButton onClick={toggleOpen} absoluteToggle={absoluteToggle} isOpen={isOpen} size="small">
        <Arrow direction="down" />
      </ToggleButton>
    </Toggle>
  )
}

interface ToggleButtonProps {
  isOpen?: boolean
  absoluteToggle?: boolean
}

const AbsoluteToggleButton = css<ToggleButtonProps>`
  position: absolute;
  top: 8px;
  right: 8px;
`

export const ToggleButton = styled(ButtonPrimary)<ToggleButtonProps>`
  ${({ absoluteToggle }) => {
    if (absoluteToggle) {
      return AbsoluteToggleButton
    }
  }};
  width: 32px;
  min-width: unset;
  height: 32px;
  padding: 0;
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
    transform: scaleY(${({ isOpen }) => (isOpen ? '-1' : '1')});
  }
`

interface Props {
  isOpen: boolean
  disabled?: boolean
  absoluteToggle?: boolean
}

const AbsoluteToggleElement = css<Props>`
  position: relative;
`

const NotAbsoluteToggleElement = css<Props>`
  grid-template-columns: 1fr 32px;
  padding-right: 8px;
  grid-column-gap: 4px;
`

export const Toggle = styled.div<Props>`
  display: grid;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-radius: ${BorderRad.s};
  background-color: ${({ disabled }) => (disabled ? Colors.Black[75] : Colors.White)};
  transition: ${Transitions.all};
  ${({ absoluteToggle }) => (absoluteToggle ? AbsoluteToggleElement : NotAbsoluteToggleElement)};

  &:focus-within,
  &:active,
  &:focus {
    border-color: ${Colors.Blue[300]};
  }

  &:hover,
  &:focus {
    ${ToggleButton} {
      color: ${Colors.Blue[500]};
    }
  }
  &:active {
    ${ToggleButton} {
      color: ${Colors.Blue[600]};
    }
  }
`
