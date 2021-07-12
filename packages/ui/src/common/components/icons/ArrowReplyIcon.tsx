import React from 'react'

import { Icon } from './Icon'

interface ArrowReplyIconProps {
  className?: any
}

export const ArrowReplyIcon = React.memo(({ className }: ArrowReplyIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 13 17"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M0.0998535 12V0H1.89985V11.1H9.82706L7.86346 9.1364L9.13625 7.8636L12.6362 11.3636V12.6364L9.13625 16.1364L7.86346 14.8636L9.82706 12.9H0.999853L0.0998535 12Z"
      fill="currentColor"
    />
  </Icon>
))
