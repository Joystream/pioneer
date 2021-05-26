import React, { memo } from 'react'

import { Colors } from '@/common/constants/styles'

import { Icon } from './Icon'

export const HelpIcon = memo(() => (
  <Icon size="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="none" color="currentColor">
    <path
      d="M0.5 8C0.5 3.86014 3.86014 0.5 8 0.5C12.1399 0.5 15.5 3.86014 15.5 8C15.5 12.1399 12.1399 15.5 8 15.5C3.86014 15.5 0.5 12.1399 0.5 8Z"
      stroke={Colors.Black[300]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.44666 8.113L10.0467 7.49967C10.4267 7.11967 10.6667 6.58634 10.6667 5.99967C10.6667 4.52634 9.47333 3.33301 7.99999 3.33301C6.52666 3.33301 5.33333 4.52634 5.33333 5.99967H6.66666C6.66666 5.26634 7.26666 4.66634 7.99999 4.66634C8.73333 4.66634 9.33333 5.26634 9.33333 5.99967C9.33333 6.36634 9.18666 6.69967 8.93999 6.93967L8.11333 7.77967C7.63333 8.26633 7.33333 8.933 7.33333 9.66633V9.99967H8.66666C8.66666 8.99967 8.96666 8.59967 9.44666 8.113ZM7.33311 12.6663H8.66644V11.333H7.33311V12.6663Z"
      fill={Colors.Black[500]}
    />
  </Icon>
))
