import React from 'react'

import { Icon } from './Icon'

export const CrossIcon = React.memo(({ className, onClick }: { className?: string; onClick?: () => void }) => (
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
      d="M13.4095 12.1366L20.273 19L19.0002 20.2728L12.1367 13.4094L5.27331 20.2728L4.00051 19L10.864 12.1366L4.00018 5.27279L5.27297 4L12.1367 10.8638L19.0005 4L20.2733 5.27279L13.4095 12.1366Z"
      fill="currentColor"
    />
  </Icon>
))
