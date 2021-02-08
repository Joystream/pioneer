import styled from 'styled-components'
import { BorderRad, Colors, Sizes, Transitions } from '../../constants'
import { Icon } from '../icons/ArrowDownIcon'
import { ButtonGhostMediumSquare } from './Buttons'

export const ToggleButton = styled(ButtonGhostMediumSquare)`
  &,
  &:hover,
  &:focus,
  &:active,
  &:disabled {
    border: 1px solid transparent;
  }

  svg {
    color: ${Colors.Black[600]};
  }
`

interface Props {
  isOpen: boolean
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
  margin: 0;
  padding: 0;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  font-size: 1em;
  cursor: pointer;
  transition: ${Transitions.all};

  ${ToggleButton} ${Icon} {
    transition: ${Transitions.all};
    transform: scaleY(${(props) => (props.isOpen ? '-1' : '1')});
  }

  &:hover {
    border-color: ${Colors.Blue[200]};
  }

  &:focus-within,
  &:active,
  &:focus {
    border-color: ${Colors.Blue[300]};
  }
`
