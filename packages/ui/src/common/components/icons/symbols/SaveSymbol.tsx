import React from 'react'

import { Colors } from '@/common/constants'
import { Symbol, SymbolProps } from '@/common/components/icons/symbols/common'

export function SaveSymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      <path
        className="Part1"
        d="M12 1.84615C6.39216 1.84615 1.84615 6.39216 1.84615 12C1.84615 17.6078 6.39216 22.1538 12 22.1538C17.6078 22.1538 22.1538 17.6078 22.1538 12C22.1538 6.39216 17.6078 1.84615 12 1.84615ZM0 12C0 5.37256 5.37256 0 12 0C18.6274 0 23.9999 5.37256 23.9999 12C23.9999 18.6274 18.6274 23.9999 12 23.9999C5.37256 23.9999 0 18.6274 0 12Z"
        fill={Colors.Black[200]}
      />
      <path
        className="Part2"
        d="M17.734 8.60827L10.4977 16.6497L6.26367 12.5797L7.54306 11.2487L10.4016 13.9965L16.3616 7.37335L17.734 8.60827Z"
        fill={Colors.Black[200]}
      />
    </Symbol>
  )
}
