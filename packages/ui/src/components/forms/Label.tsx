import styled from 'styled-components'
import { Colors } from '../../constants'
import { HelpComponent } from '../Help'

export const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  vertical-align: middle;
  color: ${Colors.Black[900]};
  position: relative;

  ${HelpComponent} {
    position: relative;
    display: inline;
    transform: unset;
    right: unset;
  }
`
