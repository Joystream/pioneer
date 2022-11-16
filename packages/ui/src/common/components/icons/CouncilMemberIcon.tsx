import React from 'react'

import { Icon } from './Icon'

export const CouncilMemberIcon = React.memo(({ className }: { className?: string }) => (
  <Icon className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" color="currentColor">
    <path
      d="M12.0546 3.00016C12.0364 3.00005 12.0182 3 12 3C11.9812 3 11.9625 3.00006 11.9438 3.00017C9.8984 3.02998 8.24951 4.69731 8.24951 6.74977C8.24951 8.82083 9.92844 10.4998 11.9995 10.4998C14.0706 10.4998 15.7495 8.82083 15.7495 6.74977C15.7495 4.69708 14.1002 3.0296 12.0546 3.00016Z"
      fill="currentColor"
    />
    <path
      d="M17.9995 18.7088C16.4073 20.1336 14.3048 21 12 21C9.6947 21 7.59184 20.1333 5.99951 18.7079V17.9998C5.99951 14.6861 8.6858 11.9998 11.9995 11.9998C15.3132 11.9998 17.9995 14.6861 17.9995 17.9998V18.7088Z"
      fill="currentColor"
    />
  </Icon>
))
