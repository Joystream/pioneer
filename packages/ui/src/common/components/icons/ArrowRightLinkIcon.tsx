import React from 'react'

import { Icon } from './Icon'

interface Props {
  onClick?: () => void
  className?: string
}

export const ArrowRightLinkIcon = React.memo(({ onClick, className }: Props) => (
  <Icon
    size="16"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    onClick={onClick}
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M8.66683 8.65527H3.3335V7.34166H8.66683V8.65527Z" fill="#757575" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7241 7.99845L7.52881 12.1317L8.47162 13.0605L13.6097 7.99845L8.47162 2.93636L7.52881 3.86523L11.7241 7.99845Z"
      fill="#757575"
    />
  </Icon>
))
