import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'
import { Icon } from '../icons'

import { ButtonPrimary } from './Buttons'

export const ToggleButton = styled(ButtonPrimary)`
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
`

interface Props {
  isOpen: boolean
  disabled?: boolean
}

export const Toggle = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr 48px;
  grid-template-rows: 1fr;
  grid-column-gap: 4px;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-radius: ${BorderRad.s};
  background-color: ${({ disabled }) => (disabled ? Colors.Black[75] : Colors.White)};
  transition: ${Transitions.all};

  ${ToggleButton} ${Icon.type} {
    transition: ${Transitions.all};
    transform: scaleY(${({ isOpen }) => (isOpen ? '-1' : '1')});
  }

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
