import React from 'react'

import { Icon } from './Icon'

export interface ArrowRightIconProps {
  white?: boolean
}

export const ArrowRightIcon = ({ white }: ArrowRightIconProps) => {
  return (
    <Icon size="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="none" color="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.3679 8.09566L4.90051 12.5631L5.90448 13.567L11.3758 8.09566L5.90448 2.62431L4.90051 3.62827L9.3679 8.09566Z"
        fill={white ? 'white' : 'black'}
      />
    </Icon>
  )
}
