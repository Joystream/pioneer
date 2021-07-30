import React from 'react'

import { Icon } from './Icon'

export function AnswerIcon({ className }: { className?: string }) {
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
        d="M0.666626 2.08382L1.4082 1.33203H14.5917L15.3333 2.08382V11.7365L14.5917 12.4883L8.95691 12.4883L4.74922 15.332L3.5963 14.7065V12.4883H1.4082L0.666626 11.7365V2.08382ZM3.88003 4.58982H12.1197V6.26047H3.88003V4.58982ZM8.82385 7.93111H3.88003V9.60176H8.82385V7.93111Z"
        fill="currentColor"
      />
    </Icon>
  )
}
