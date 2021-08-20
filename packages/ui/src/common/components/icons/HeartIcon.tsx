import React from 'react'

import { Icon } from './Icon'

interface HeartIconProps {
  className?: any
}

export const HeartIcon = React.memo(({ className }: HeartIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      className="heartInnerFill"
      fillRule="evenodd"
      d="M16.5 3a6.01 6.01 0 00-3.27.98A5.74 5.74 0 0012 5.05a5.74 5.74 0 00-1.23-1.07A6.01 6.01 0 007.5 3 5.4 5.4 0 002 8.4c0 3.7 3.39 6.72 8.54 11.29l.01.02L12 21l1.45-1.28.04-.04C18.62 15.11 22 12.09 22 8.4A5.4 5.4 0 0016.5 3z"
      fill="transparent"
    />
    <path
      fillRule="evenodd"
      d="M10.55 19.7L12 21l1.45-1.28.04-.04C18.62 15.11 22 12.09 22 8.4A5.4 5.4 0 0016.5 3a6.03 6.03 0 00-3.27.98A5.87 5.87 0 0012 5.05a5.87 5.87 0 00-1.23-1.07A6.03 6.03 0 007.5 3 5.4 5.4 0 002 8.4c0 3.7 3.4 6.72 8.54 11.3zm1.57-1.48a61.61 61.61 0 006-5.78C19.48 10.82 20 9.58 20 8.4A3.4 3.4 0 0016.5 5a4.04 4.04 0 00-2.99 1.36L12 8.1l-1.51-1.74A4.04 4.04 0 007.5 5 3.4 3.4 0 004 8.4c0 1.18.52 2.42 1.88 4.04a61.24 61.24 0 006 5.77l.13.11.1-.1z"
      fill="currentColor"
    />
  </Icon>
))
