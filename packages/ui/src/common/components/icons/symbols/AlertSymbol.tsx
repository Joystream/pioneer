import React from 'react'

import { Colors } from '../../../constants'

import { Symbol, SymbolProps } from './common'

export function AlertSymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className || 'symbol'}
    >
      <path
        className="blackPart"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9515 1.57408L12.5286 1.55859L23.7844 21.5586L23.0001 22.9H1.00011L0.207275 21.5741L10.9515 1.57408ZM11.7626 3.86763L2.50525 21.1H21.4609L11.7626 3.86763Z"
        fill={Colors.Black[900]}
      />
      <path
        className="primaryPart"
        d="M10.875 18.375C10.875 18.6734 10.9935 18.9595 11.2045 19.1705C11.4155 19.3815 11.7016 19.5 12 19.5C12.2984 19.5 12.5845 19.3815 12.7955 19.1705C13.0065 18.9595 13.125 18.6734 13.125 18.375C13.125 18.0766 13.0065 17.7905 12.7955 17.5795C12.5845 17.3685 12.2984 17.25 12 17.25C11.7016 17.25 11.4155 17.3685 11.2045 17.5795C10.9935 17.7905 10.875 18.0766 10.875 18.375ZM11.4375 15.75H12.5625C12.6656 15.75 12.75 15.6656 12.75 15.5625V9.1875C12.75 9.08437 12.6656 9 12.5625 9H11.4375C11.3344 9 11.25 9.08437 11.25 9.1875V15.5625C11.25 15.6656 11.3344 15.75 11.4375 15.75Z"
        fill={Colors.Blue[500]}
      />
    </Symbol>
  )
}
