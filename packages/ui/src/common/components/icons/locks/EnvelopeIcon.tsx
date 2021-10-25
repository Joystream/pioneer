import React from 'react'

import { Colors } from '@/common/constants'

import { Icon } from '../Icon'

interface EnvelopeIconProps {
  className?: string
}

export const EnvelopeIcon = React.memo(({ className }: EnvelopeIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.535 1.27625H11.4651L7.78007 4H10.8084L12.0001 3.11916L13.1918 4H16.2201L12.535 1.27625ZM19 6.05469V8.293L20.456 9.36914L12.0001 15.2515L3.54424 9.36914L5 8.29315V6.05483L1.1001 8.93737V22L2.0001 22.9H22.0001L22.9001 22V8.93737L19 6.05469ZM2.9001 21.1V11.1137L12.0001 17.4442L21.1001 11.1137V21.1H2.9001Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.6001 4.59998H18.4001V13H16.6001V6.39998H7.4001V13H5.6001V4.59998Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 7.59998V9.39998H15L14.9994 7.59998H9ZM9 10.1V11.9H14L13.9993 10.1H9Z"
      fill={Colors.Blue[500]}
    />
  </Icon>
))
