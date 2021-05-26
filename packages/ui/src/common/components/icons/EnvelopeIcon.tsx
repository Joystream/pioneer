import React from 'react'

import { Icon } from './Icon'

interface EnvelopeIconProps {
  className?: any
}

export const EnvelopeIcon = React.memo(({ className }: EnvelopeIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.3567 0.85083H7.64343L5.18671 2.66667H7.20558L8.00006 2.07944L8.79455 2.66667H10.8134L8.3567 0.85083ZM12.6667 4.03646V5.52867L13.6373 6.2461L8.00006 10.1677L2.36283 6.2461L3.33333 5.52876V4.03655L0.733398 5.95825V14.6667L1.3334 15.2667H14.6667L15.2667 14.6667V5.95825L12.6667 4.03646ZM1.9334 14.0667V7.40916L8.00006 11.6295L14.0667 7.40916V14.0667H1.9334Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.7334 3.06665H12.2667V8.66665H11.0667V4.26665H4.9334V8.66665H3.7334V3.06665Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 5.06665V6.26665H10L9.99958 5.06665H6ZM6 6.73332V7.93332H9.33333L9.33283 6.73332H6Z"
      fill="#3F38FF"
    />
  </Icon>
))
