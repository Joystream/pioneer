import styled from 'styled-components'

import { Colors, Overflow } from '../../constants'

export const Label = styled.span`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  ${Overflow.FullDots};
`
