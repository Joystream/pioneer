import styled from 'styled-components'

import { Colors, Transitions } from '@/common/constants'

export interface SymbolProps {
  className?: string
  color?: string
}

export const Symbol = styled.svg`
  height: 16px;
  width: 16px;
  position: relative;

  .blackPart {
    fill: ${Colors.Black[900]};
    transition: ${Transitions.all};
  }
  .primaryPart {
    fill: ${Colors.Blue[500]};
    transition: ${Transitions.all};
  }
`
