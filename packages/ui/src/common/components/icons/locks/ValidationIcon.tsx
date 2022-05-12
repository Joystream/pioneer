import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const ValidationIcon = React.memo(({ className }: StyledIcon) => (
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
      d="M9.4 5.94702L16.8 10.4409V18.559L9.4 23.0529L2 18.559V10.4409L9.4 5.94702ZM3.8 12.5469L8.5 15.4011V20.4005L3.8 17.5462V12.5469ZM10.3 20.4005L15 17.5462V12.5469L10.3 15.4011V20.4005ZM9.4 13.8418L14.1661 10.9474L9.4 8.05294L4.63388 10.9474L9.4 13.8418Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.545 2.29914L17.3147 7.31508L13.8999 4.88261L14.9442 3.41653L17.1448 4.98406L21.2991 1L22.545 2.29914Z"
      fill={Colors.Blue[500]}
    />
  </Icon>
))
