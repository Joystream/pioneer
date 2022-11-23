import React from 'react'

import { Colors } from '@/common/constants'

import { Symbol, SymbolProps } from './common'

export function VotingSymbol({ className }: SymbolProps) {
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
        d="M6.67743 5.42773H9.32272L8.25605 6.4944H7.7441L6.67743 5.42773ZM5.74724 5.42773H4.44801H4.13609L3.98317 5.6996L2.79923 7.80439L2.68915 8.00008H2.66669V16.0001H13.3334V8.00008H13.3111L13.2009 7.8043L12.0165 5.69951L11.8635 5.42773H11.5517H10.2529L9.18625 6.4944H11.2398L12.0871 8.00008H3.91299L4.75993 6.4944H6.8139L5.74724 5.42773ZM3.86669 9.20008H12.1334V14.8001H3.86669V9.20008Z"
        fill={Colors.Black[900]}
      />
      <path
        className="primaryPart"
        d="M7.99995 6.75055L5.36896 4.11956L8.98657 0.501953L11.6176 3.13294L7.99995 6.75055Z"
        fill={Colors.Blue[500]}
      />
    </Symbol>
  )
}
