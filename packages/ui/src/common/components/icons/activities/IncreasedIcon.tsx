import React from 'react'

import { Icon, StyledIcon } from '../Icon'

export const IncreasedIcon = ({ className }: StyledIcon) => (
  <Icon size="20" viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2466 2.40283H12.4185V0.833374H18.3569L19.1667 1.6181V6.7973H17.5471V3.3801L10.9807 9.10698H9.89732L6.48011 6.12664L1.08343 10.8334L0 9.66681L5.93839 4.48761H7.02182L10.439 7.46795L16.2466 2.40283Z"
      fill="currentColor"
    />
    <rect width="3.33333" height="10" transform="matrix(-1 0 0 1 18.3333 8.33337)" fill="currentColor" />
    <rect width="3.33333" height="7.5" transform="matrix(-1 0 0 1 13.3333 10.8334)" fill="currentColor" />
    <rect width="3.33333" height="5" transform="matrix(-1 0 0 1 8.33331 13.3334)" fill="currentColor" />
    <rect width="3.33333" height="2.5" transform="matrix(-1 0 0 1 3.33331 15.8334)" fill="currentColor" />
  </Icon>
)
