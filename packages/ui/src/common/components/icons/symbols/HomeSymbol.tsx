import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../../../constants'

interface SymbolProps {
  className?: string
}

export function HomeSymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      <path
        className="blackPart"
        d="M2.19526 6.86165L7.5286 1.52832H8.4714L13.8047 6.86165L14 7.33306V13.9997L13.3333 14.6664H2.66667L2 13.9997V7.33306L2.19526 6.86165ZM3.33333 7.6092V13.3331H12.6667V7.6092L8 2.94253L3.33333 7.6092Z"
        fill={Colors.Black[900]}
      />
      <path
        className="primaryPart"
        d="M5.33337 7.33301H10.6667V11.9997H9.33337V8.66634H6.66671V11.9997H5.33337V7.33301Z"
        fill={Colors.Blue[500]}
      />
    </Symbol>
  )
}

const Symbol = styled.svg`
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
