import styled from 'styled-components'
import { Colors } from '../../../constants'

export const ValueInJoys = styled.span`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: baseline;
  width: fit-content;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: ${Colors.Black[900]};

  &:after {
    content: 'joy';
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${Colors.Black[400]};
    text-transform: uppercase;
  }
`
