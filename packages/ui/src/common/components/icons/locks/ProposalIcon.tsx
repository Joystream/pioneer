import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const ProposalIcon = React.memo(({ className }: StyledIcon) => (
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
      d="M7.5 1H20.5H21.5V19H7.5V18V1ZM9.5 3V17H19.5V3H9.5Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 5H5.5V7V21H15.5H17.5V22V23H3.5V22V5Z"
      fill={Colors.Black[900]}
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M11 9H18V11H11V9Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M11 5H18V7H11V5Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M11 13H18V15H11V13Z" fill={Colors.Blue[500]} />
  </Icon>
))
