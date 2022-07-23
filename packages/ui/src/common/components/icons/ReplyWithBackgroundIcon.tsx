import React from 'react'

import { Icon } from './Icon'

interface ReplyWithBackgroundIconProps {
  className?: any
}

export const ReplyWithBackgorundIcon = ({ className }: ReplyWithBackgroundIconProps) => {
  return (
    <Icon
      size="16"
      viewBox="0 0 13 12"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666992 2.08504L1.40857 1.33325H14.5921L15.3337 2.08504V11.7377L14.5921 12.4895H8.95727L4.74959 15.3333L3.59666 14.7077V12.4895H1.40857L0.666992 11.7377V2.08504Z"
        fill="#C4CAD6"
      />
      <path
        d="M7.7561 7.84306V9.99992L4 6.66659L7.7561 3.33325V5.49011C9.7318 5.49011 11.3333 7.2458 11.3333 9.41168C11.3333 9.51874 11.3298 9.62462 11.3219 9.72933C11.0487 9.15998 10.6388 8.68332 10.1364 8.35086C9.63406 8.01841 9.05835 7.84281 8.47154 7.84306H7.7561Z"
        fill="white"
      />
    </Icon>
  )
}
