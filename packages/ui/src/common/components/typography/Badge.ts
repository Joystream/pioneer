import styled from 'styled-components'

import { BorderRad, Colors } from '../../constants'

export const Badge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: ${BorderRad.full};
  background-color: ${Colors.Black[500]};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.White};
`
