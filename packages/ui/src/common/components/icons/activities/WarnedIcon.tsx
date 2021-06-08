import React from 'react'

import { Icon, StyledIcon } from '../Icon'

export const WarnedIcon = ({ className }: StyledIcon) => (
  <Icon size="20" viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM10.8333 5V11.6667H9.16667V5H10.8333ZM10 13.3333C9.53976 13.3333 9.16667 13.7064 9.16667 14.1667C9.16667 14.6269 9.53976 15 10 15C10.4602 15 10.8333 14.6269 10.8333 14.1667C10.8333 13.7064 10.4602 13.3333 10 13.3333Z"
      fill="currentColor"
    />
  </Icon>
)
