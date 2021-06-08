import React from 'react'

import { Icon, StyledIcon } from '../Icon'

export const DecreasedIcon = ({ className }: StyledIcon) => (
  <Icon size="20" viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2466 9.26392H12.4185V10.8334H18.3569L19.1667 10.0486V4.86945H17.5471V8.28665L10.9807 2.55977H9.89732L6.48011 5.54011L1.08343 0.833373L0 1.99994L5.93839 7.17913H7.02182L10.439 4.1988L16.2466 9.26392Z"
      fill="currentColor"
    />

    <rect y="8.33337" width="3.33333" height="10" fill="currentColor" />
    <rect x="5" y="10.8334" width="3.33333" height="7.5" fill="currentColor" />
    <rect x="10" y="13.3334" width="3.33333" height="5" fill="currentColor" />
    <rect x="15" y="15.8334" width="3.33333" height="2.5" fill="currentColor" />
  </Icon>
)
