import React from 'react'

import { Icon, StyledIcon } from '../Icon'

export const ProposalIcon = ({ className }: StyledIcon) => (
  <Icon size="20" viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 5H5V5.83333V16.6667H12.5H14.1667V18.3333L13.3333 19.1667H3.33333L2.5 18.3333V5Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 1.71301H6.66669V14.213V15.0001H18.3334V2.50005L17.5 1.71301ZM15.8334 7.50007H9.16669V9.16673H15.8334V7.50007ZM9.16669 4.16673H15.8334V5.8334H9.16669V4.16673ZM15.8334 10.8334H9.16669V12.5001H15.8334V10.8334Z"
      fill="currentColor"
    />
  </Icon>
)
