import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const MarketingWorkerIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4706 11.9091V12.9091H18.4706H19.4706V11.9091H17.4706ZM18.4706 12.9091H19.4706V19.0294C19.4706 20.67 18.1406 22 16.5 22C14.8594 22 13.5294 20.67 13.5294 19.0294V15.9394H15.5294V19.0294C15.5294 19.5654 15.9639 20 16.5 20C17.036 20 17.4706 19.5654 17.4706 19.0294V12.9091H18.4706Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.70585 0.0999756V18.4455L12.3103 13.9091H18.4706C21.0002 13.9091 23 11.8052 23 9.27274C23 6.74032 21.0002 4.63638 18.4706 4.63638H12.3103L5.70585 0.0999756ZM7.70585 3.90005L11.6896 6.63638H18.4706C19.8398 6.63638 21 7.78819 21 9.27274C21 10.7573 19.8398 11.9091 18.4706 11.9091H11.6896L7.70585 14.6454V3.90005Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.35295 7.84851C2.82639 7.84851 2 8.50735 2 9.87881C2 11.2503 2.82639 11.9091 3.35295 11.9091H4.35295V13.9091H3.35295C1.28051 13.9091 0 11.8545 0 9.87881C0 7.9031 1.28051 5.84851 3.35295 5.84851H4.35295V7.84851H3.35295Z"
      fill={Colors.Blue[500]}
    />
  </Icon>
))
