import React from 'react'

import { Icon, StyledIcon } from '../Icon'

export const ClosedIcon = ({ className }: StyledIcon) => (
  <Icon size="20" viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
    <path
      d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5774 5.24403L9.99994 8.82145L6.42253 5.24403L5.24402 6.42255L8.82153 10.0001L5.24414 13.5774L6.42266 14.756L10.0001 11.1785L13.5775 14.756L14.756 13.5774L11.1785 9.99993L14.7559 6.42255L13.5774 5.24403Z"
      fill="white"
    />
  </Icon>
)
