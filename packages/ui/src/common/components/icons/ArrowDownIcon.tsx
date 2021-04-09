import React from 'react'

import { Icon } from './Icon'

export function ArrowDownIcon({ className }: { className?: string }) {
  return (
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
        d="M8.13804 9.3253L3.67065 4.85791L2.66669 5.86187L8.13804 11.3332L13.6094 5.86187L12.6054 4.85791L8.13804 9.3253Z"
        fill="currentColor"
      />
    </Icon>
  )
}
