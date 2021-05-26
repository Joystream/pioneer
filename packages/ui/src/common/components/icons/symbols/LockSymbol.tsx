import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../../../constants'

interface SymbolProps {
  className?: string
}

export function LockSymbol({ className }: SymbolProps) {
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
        d="M13 7.25H11.9375V3.75C11.9375 2.64531 11.0422 1.75 9.9375 1.75H6.0625C4.95781 1.75 4.0625 2.64531 4.0625 3.75V7.25H3C2.72344 7.25 2.5 7.47344 2.5 7.75V13.75C2.5 14.0266 2.72344 14.25 3 14.25H13C13.2766 14.25 13.5 14.0266 13.5 13.75V7.75C13.5 7.47344 13.2766 7.25 13 7.25ZM5.1875 3.75C5.1875 3.26719 5.57969 2.875 6.0625 2.875H9.9375C10.4203 2.875 10.8125 3.26719 10.8125 3.75V7.25H5.1875V3.75ZM12.375 13.125H3.625V8.375H12.375V13.125Z"
        fill={Colors.Black[900]}
      />
      <path
        className="primaryPart"
        d="M7.56266 11.7814V10.9533C7.43368 10.8607 7.33741 10.7295 7.2877 10.5787C7.238 10.4279 7.23742 10.2653 7.28606 10.1141C7.3347 9.96296 7.43005 9.83115 7.55837 9.73764C7.68669 9.64413 7.84138 9.59375 8.00016 9.59375C8.15894 9.59375 8.31362 9.64413 8.44194 9.73764C8.57027 9.83115 8.66561 9.96296 8.71425 10.1141C8.76289 10.2653 8.76231 10.4279 8.71261 10.5787C8.66291 10.7295 8.56664 10.8607 8.43766 10.9533V11.7814C8.43766 11.8501 8.38141 11.9064 8.31266 11.9064H7.69885C7.65346 11.9029 7.56266 11.8731 7.56266 11.7814Z"
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
