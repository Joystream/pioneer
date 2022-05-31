import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const StorageWorkerIcon = React.memo(({ className }: StyledIcon) => (
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
      d="M2 13C2.5 13 2.44772 13.0001 3 13.0001H22C22 14 22 13.4478 22 14.0001V23.0001C21.5 23 21.5523 23.0001 21 23.0001H2.00002C2.00004 22.5 2 22.5524 2 22.0001V13ZM4 15.0001V21.0001H20V15.0001H4Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.00002 1C2.00002 1 2.44774 1.00002 3.00002 1.00002H21C21.5523 1.00002 21.5 1 22 1.00002V11C21 11 21.5523 11 21 11H2C2 10.5 2.00002 10.5523 2.00002 10V1ZM4.00002 3.00002V9.00002H20V3.00002H4.00002Z"
      fill={Colors.Black[900]}
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M6 17H11V19H6V17Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M6 5H11V7H6V5Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M15 17L18 17L18 19L15 19L15 17Z" fill={Colors.Blue[500]} />
    <path fillRule="evenodd" clipRule="evenodd" d="M15 5L18 5L18 7L15 7L15 5Z" fill={Colors.Blue[500]} />
  </Icon>
))
