import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const VoteIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <g clipPath="url(#clip0_136_5831)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.86951 11.1415H6.00006L4.00006 16V24H20.0001V16L17.9954 11.1574H16.1307L18.1307 16H5.86951L7.86951 11.1415ZM5.80006 17.8H18.2001V22.2H5.80006V17.8Z"
        fill={Colors.Black[900]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4799 0.338257L18.8406 5.69896L12 12.5396L6.63928 7.17889L13.4799 0.338257ZM9.46771 7.17889L12 9.71116L16.0122 5.69896L13.4799 3.16668L9.46771 7.17889Z"
        fill={Colors.Blue[500]}
      />
    </g>
    <defs>
      <clipPath id="clip0_136_5831">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
))
