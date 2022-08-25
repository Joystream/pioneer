import React from 'react'

import { Icon } from './Icon'

interface ReplyIconProps {
  className?: any
}

export const RepliesIcon = React.memo(({ className }: ReplyIconProps) => (
  <Icon width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.666992 2.08529L1.40857 1.3335H14.5921L15.3337 2.08529V11.7379L14.5921 12.4897H8.95727L4.74959 15.3335L3.59666 14.708V12.4897H1.40857L0.666992 11.7379V2.08529Z"
      fill="#C4CAD6"
    />
    <path
      d="M7.7561 7.8433V10.0002L4 6.66683L7.7561 3.3335V5.49036C9.7318 5.49036 11.3333 7.24605 11.3333 9.41193C11.3333 9.51899 11.3298 9.62487 11.3219 9.72957C11.0487 9.16023 10.6388 8.68356 10.1364 8.35111C9.63406 8.01865 9.05835 7.84305 8.47154 7.8433H7.7561Z"
      fill="white"
    />
  </Icon>
))
