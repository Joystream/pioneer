import styled from 'styled-components'

import { Colors } from '../constants'

export const BadgeViolet = styled.p`
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 0;
  padding: 0 8px;
  font-size: 10px;
  line-height: 16px;
  border-radius: 8px;
  color: ${Colors.White};
  background-color: ${Colors.Blue[200]};
  text-transform: uppercase;
`
