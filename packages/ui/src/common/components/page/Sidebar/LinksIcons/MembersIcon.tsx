import React from 'react'

import { Icon } from '../../../icons'

export const MembersIcon = () => (
  <Icon
    size="16"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className="nav-icon"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M20 18H15V20H20V18ZM13 16V22H20.5L22 20.5V16H13Z" fill="#3F38FF" />
    <path
      className="whitePart"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 6H9V4H4V6ZM11 8V2H3.5L2 3.5V8H11Z"
      fill="currentColor"
    />
    <path
      className="whitePart"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 4H15V12H20V4ZM13 2V14H22V2H13Z"
      fill="currentColor"
    />
    <path
      className="whitePart"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 12H4V20H9V12ZM2 10V22H11V10H2Z"
      fill="currentColor"
    />
  </Icon>
)
