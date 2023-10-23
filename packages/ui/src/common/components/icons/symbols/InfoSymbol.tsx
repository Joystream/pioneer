import React from 'react'

import { Colors } from '../../../constants'

import { Symbol, SymbolProps } from './common'

export function InfoSymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className || 'symbol'}
    >
      <path
        fill={Colors.Black[900]}
        d="M12 1.5C6.202 1.5 1.5 6.202 1.5 12S6.202 22.5 12 22.5 22.5 17.798 22.5 12 17.798 1.5 12 1.5Zm0 19.219A8.72 8.72 0 0 1 3.281 12 8.72 8.72 0 0 1 12 3.281 8.72 8.72 0 0 1 20.719 12 8.72 8.72 0 0 1 12 20.719Z"
      />
      <path
        fill={Colors.Blue[500]}
        d="M13.125 7.875a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0Zm-.563 2.625h-1.124a.188.188 0 0 0-.188.188v6.374c0 .104.084.188.188.188h1.124a.188.188 0 0 0 .188-.188v-6.375a.188.188 0 0 0-.188-.187Z"
      />
    </Symbol>
  )
}
