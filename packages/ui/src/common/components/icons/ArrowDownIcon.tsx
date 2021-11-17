import React from 'react'

import { Icon } from './Icon'

export const ArrowDownIcon = React.memo(() => (
  <Icon
    size="16"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    transform="scale(1 -1)"
    style={{ top: '2px' }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.86199 6.86464L12.3294 11.332L13.3333 10.3281L7.86199 4.85671L2.39064 10.3281L3.3946 11.332L7.86199 6.86464Z"
      fill="#8C96A6"
    />
  </Icon>
))
