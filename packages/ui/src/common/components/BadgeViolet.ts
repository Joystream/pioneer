import styled from 'styled-components'

import { BorderRad, Colors, Overflow } from '../constants'

export const BadgeViolet = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 16px;
  padding: 0 8px;
  background-color: ${Colors.Blue[200]};
  border-radius: ${BorderRad.l};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.White};
  text-transform: uppercase;
  ${Overflow.Dots}
`
