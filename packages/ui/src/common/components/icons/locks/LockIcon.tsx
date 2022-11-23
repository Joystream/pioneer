import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const LockIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      d="M19.5 9.875H17.9062V5.625C17.9062 3.96797 16.5633 2.625 14.9062 2.625H9.09375C7.43672 2.625 6.09375 3.96797 6.09375 5.625V9.875H4.5C4.08516 9.875 3.75 10.2102 3.75 10.625V20.625C3.75 21.0398 4.08516 21.375 4.5 21.375H19.5C19.9148 21.375 20.25 21.0398 20.25 20.625V10.625C20.25 10.2102 19.9148 9.875 19.5 9.875ZM7.78125 5.625C7.78125 4.90078 8.36953 4.3125 9.09375 4.3125H14.9062C15.6305 4.3125 16.2188 4.90078 16.2188 5.625V9.875H7.78125V5.625ZM18.5625 19.6875H5.4375V11.5625H18.5625V19.6875Z"
      fill={Colors.Black[900]}
    />
    <path
      d="M10.9794 17.7297V15.9393C10.6785 15.7391 10.4539 15.4556 10.338 15.1296C10.222 14.8035 10.2207 14.4518 10.3341 14.125C10.4476 13.7982 10.67 13.5133 10.9694 13.3111C11.2687 13.1089 11.6296 13 12 13C12.3704 13 12.7313 13.1089 13.0306 13.3111C13.33 13.5133 13.5524 13.7982 13.6659 14.125C13.7793 14.4518 13.778 14.8035 13.662 15.1296C13.5461 15.4556 13.3215 15.7391 13.0206 15.9393V17.7297C13.0206 17.8784 12.8894 18 12.729 18H11.2971C11.1912 17.9925 10.9794 17.9279 10.9794 17.7297Z"
      fill={Colors.Blue[500]}
    />
  </Icon>
))
