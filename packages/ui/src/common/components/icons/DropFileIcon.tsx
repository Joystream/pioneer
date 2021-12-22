import React from 'react'

import { Icon } from './Icon'

interface DropFileIconProps {
  size?: number
  className?: string
}

export const DropFileIcon = React.memo(({ size = 48, className }: DropFileIconProps) => (
  <Icon
    size={size}
    viewBox="0 0 48 48"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      d="M25 36H5C4.44772 36 4 35.5523 4 35V3C4 2.44772 4.44772 2 5 2H28M36 25V9.5M28 2V8.5C28 9.05228 28.4477 9.5 29 9.5H36M28 2L36 9.5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M36 44H29C28.4477 44 28 43.5523 28 43V29C28 28.4477 28.4477 28 29 28H43C43.5523 28 44 28.4477 44 29V43C44 43.5523 43.5523 44 43 44H40"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <path d="M36 44L36 34" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
    <path d="M33 37L36 34L39 37" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
  </Icon>
))
