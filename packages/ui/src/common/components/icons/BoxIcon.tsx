import React from 'react'

import { Icon } from './Icon'

interface BoxIconProps {
  className?: any
}

export const BoxIcon = React.memo(({ className }: BoxIconProps) => (
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
      d="M7.99998 0.959229L13.9333 4.66756V11.6844L7.99998 15.0219L2.06665 11.6844V4.66756L7.99998 0.959229ZM3.26665 6.02602V10.9825L7.39998 13.3075V8.35102L3.26665 6.02602ZM8.59998 8.33982V13.3075L12.7333 10.9825V5.33266L7.99998 2.37433L3.84219 4.97294L7.99026 7.30623L11.0246 5.48561L11.642 6.51461L8.59998 8.33982Z"
      fill="black"
    />
  </Icon>
))
