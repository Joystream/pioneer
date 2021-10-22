import React from 'react'

import { Colors } from '@/common/constants'

import { Icon } from '../Icon'

interface ProposalIconProps {
  className?: string
}

export const ProposalIcon = React.memo(({ className }: ProposalIconProps) => (
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
      d="M7.5 1H20.5L21.5 2V19H8.5L7.5 18V1ZM9.5 3V17H19.5V3H9.5Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 5H6.5V7H5.5V21H15.5V20H17.5V22L16.5 23H4.5L3.5 22V5Z"
      fill={Colors.Black[900]}
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M11 9H18V11H11V9Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M11 5H18V7H11V5Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M11 13H18V15H11V13Z" fill={Colors.Blue[500]} />
  </Icon>
))
