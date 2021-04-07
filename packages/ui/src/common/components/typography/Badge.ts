import styled from 'styled-components'

import { BorderRad, Colors } from '../../../app/constants'

export const Badge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[500]};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.White};
`
