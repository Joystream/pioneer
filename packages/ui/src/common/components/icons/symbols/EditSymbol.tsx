import React from 'react'

import { Colors } from '../../../constants'

import { Symbol, SymbolProps } from './common'

export function EditSymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      <path
        className="primaryPart"
        d="M10.9564 8.37713L7.62305 5.0438L8.37729 4.28955L11.7106 7.62288L10.9564 8.37713Z"
        fill={Colors.Blue[500]}
      />
      <path
        className="blackPart"
        d="M2.96633 10.0354L2.63315 13.3672L5.96494 13.034L13.8657 5.13331L10.867 2.1347L2.96633 10.0354ZM2.02191 9.37706L10.4664 0.932617H11.2677L15.0677 4.73262V5.534L6.62329 13.9784L6.27899 14.1416L2.05676 14.5638L1.43652 13.9436L1.85875 9.72137L2.02191 9.37706Z"
        fill={Colors.Black[900]}
      />
    </Symbol>
  )
}
