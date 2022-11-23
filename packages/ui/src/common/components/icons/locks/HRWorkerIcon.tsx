import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const HRWorkerIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="23"
    viewBox="0 0 23 23"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 15.5858L22.4142 21L21 22.4142L15.5858 17L17 15.5858Z"
      fill={Colors.Blue[500]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2ZM0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z"
      fill={Colors.Black[900]}
    />
  </Icon>
))
