import React from 'react'

import { Colors } from '../../../constants'

import { Symbol, SymbolProps } from './common'

export function FailureSymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      <path
        className="blackPart"
        d="M1.84615 12C1.84615 6.39216 6.39216 1.84615 12 1.84615C17.6078 1.84615 22.1538 6.39216 22.1538 12C22.1538 13.6263 21.7714 15.1633 21.0917 16.526L22.5134 17.7897C23.4608 16.073 23.9999 14.0994 23.9999 12C23.9999 5.37256 18.6274 0 12 0C5.37256 0 0 5.37256 0 12C0 18.6274 5.37256 23.9999 12 23.9999C13.3687 23.9999 14.6839 23.7708 15.9092 23.3487L14.934 21.7234C14.0051 22.0033 13.0201 22.1538 12 22.1538C6.39216 22.1538 1.84615 17.6078 1.84615 12Z"
        fill={Colors.Black[900]}
      />
      <path
        className="primaryPart"
        d="M16.3162 21.1934C17.9742 20.4136 19.3871 19.1985 20.4073 17.6953L21.7973 18.9308C20.6394 20.5645 19.0833 21.8959 17.2703 22.7836L16.3162 21.1934Z"
        fill={Colors.Blue[500]}
      />
      <path
        className="primaryPart"
        d="M16.4038 15.1526L13.2515 12.0002L16.404 8.8476L15.1525 7.59616L12 10.7487L8.62571 7.37433L7.37427 8.62577L10.7486 12.0002L7.37443 15.3744L8.62587 16.6259L12 13.2516L15.1524 16.404L16.4038 15.1526Z"
        fill={Colors.Blue[500]}
      />
    </Symbol>
  )
}
