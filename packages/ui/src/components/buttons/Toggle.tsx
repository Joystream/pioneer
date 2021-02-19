import styled from 'styled-components'
import { BorderRad, Colors, Sizes, Transitions } from '../../constants'
import { Icon } from '../icons'
import { ButtonGhostMediumSquare } from './Buttons'

export const ToggleButton = styled(ButtonGhostMediumSquare)`
  background-color: transparent;
  &,
  &:hover,
  &:focus,
  &:active,
  &:disabled {
    background-color: transparent;
    border: 1px solid transparent;
  }
  &:disabled {
    cursor: not-allowed;
  }
  svg {
    color: ${Colors.Black[600]};
  }
`

interface Props {
  isOpen: boolean
  enable?: boolean
}

export const Toggle = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 4px;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: ${Sizes.accountSelectHeight};
  max-height: ${Sizes.accountSelectHeight};
  margin: 0;
  padding: 0;
  border: 1px solid ${(props) => (props.enable !== false ? Colors.Black[300] : Colors.Black[200])};
  border-radius: ${BorderRad.s};
  background-color: ${(props) => (props.enable !== false ? Colors.White : Colors.Black[75])};
  font-size: 1em;
  cursor: ${(props) => (props.enable !== false ? 'pointer' : 'not-allowed')};
  transition: ${Transitions.all};

  ${ToggleButton} ${Icon} {
    transition: ${Transitions.all};
    transform: scaleY(${(props) => (props.isOpen ? '-1' : '1')});
  }

  &:hover {
    border-color: ${(props) => (props.enable !== false ? Colors.Blue[200] : Colors.Black[200])};
  }

  &:focus-within,
  &:active,
  &:focus {
    border-color: ${Colors.Blue[300]};
  }
`
