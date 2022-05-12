import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const InvitationIcon = React.memo(({ className }: StyledIcon) => (
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
      d="M23 7L12.0001 15L1 7V23H23V7ZM2.9001 21.1V11.1137L12.0001 17.4442L21.1001 11.1137V21.1H2.9001Z"
      fill={Colors.Black[900]}
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M4 3H20V11L18 12V4.92857H6V12L4 11V3Z" fill={Colors.Black[900]} />
    <path d="M8 7H16V9H8V7Z" fill={Colors.Blue[500]} />
  </Icon>
))
