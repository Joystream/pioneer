import { isFunction } from 'lodash'
import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'
import { Arrow, Icon } from '../icons'

import { ButtonBareGhost } from './Buttons'

interface ToggleableItemProps {
  children: ReactNode | ((isOpen: boolean) => ReactNode)
  absoluteToggle?: boolean
  className?: string
  isOpen: boolean
  toggleOpen: () => void
}

export const ToggleableItem = ({ children, absoluteToggle, className, isOpen, toggleOpen }: ToggleableItemProps) => {
  return (
    <Toggle isOpen={isOpen} absoluteToggle={absoluteToggle} className={className}>
      {isFunction(children) ? children(isOpen) : children}
      <ToggleButton onClick={toggleOpen} absoluteToggle={absoluteToggle} isOpen={isOpen} size="small" square>
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

export const ToggleButton = styled(ButtonBareGhost).attrs(() => ({
  square: true,
  size: 'small',
}))<ToggleButtonProps & { className?: string }>`
  ${({ absoluteToggle }) => {
    if (absoluteToggle) {
      return AbsoluteToggleButton
    }
  }};
  width: 32px;
  min-width: unset;
  height: 32px;
  padding: 0;
  &,
  &:disabled {
    background-color: transparent;
    color: ${Colors.Black[900]};
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
  grid-template-columns: minmax(0, 1fr) 32px;
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
