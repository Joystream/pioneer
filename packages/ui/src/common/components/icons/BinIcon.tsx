import React from 'react'

import { Icon } from './Icon'

export const BinIcon = React.memo(({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 3L8 2H16L17 3V6H21V8H20V21L19 22H5L4 21V8H3V6H7V3ZM9 6H15V4H9V6ZM6 8V20H18V8H6Z"
      fill="currentColor"
    />
  </Icon>
))
