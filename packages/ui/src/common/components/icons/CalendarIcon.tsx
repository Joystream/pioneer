import React from 'react'

import { Icon } from './Icon'

export const CalendarIcon = React.memo(({ className }: { className?: string }) => (
  <Icon
    size="16"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 3V4H16V3H18V4H21L22 5V21L21 22H3L2 21V5L3 4H6V3H8ZM4 8V6H20V8H4ZM4 10V20H20V10H4Z"
      fill="currentColor"
      className="blackPart"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 12H7V14H9V12ZM9 16H7V18H9V16ZM11 12H13V14H11V12ZM13 16H11V18H13V16ZM15 12H17V14H15V12ZM17 16H15V18H17V16Z"
      fill="currentColor"
      className="primaryPart"
    />
  </Icon>
))
