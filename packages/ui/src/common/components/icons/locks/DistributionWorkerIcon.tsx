import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const DistributionWorkerIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3753 1.21913C11.7405 0.926956 12.2595 0.926956 12.6247 1.21913L16.7389 4.51049L15.4895 6.07223L12 3.28062L8.5105 6.07223L7.26111 4.51049L11.3753 1.21913Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.4896 7.26105L22.781 11.3752C23.0731 11.7405 23.0731 12.2594 22.781 12.6246L19.4896 16.7388L17.9279 15.4895L20.7195 11.9999L17.9279 8.51044L19.4896 7.26105Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5105 17.9277L12 20.7193L15.4895 17.9277L16.7389 19.4895L12.6247 22.7808C12.2595 23.073 11.7405 23.073 11.3753 22.7808L7.26111 19.4895L8.5105 17.9277Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.07223 8.51044L3.28062 11.9999L6.07223 15.4895L4.51049 16.7388L1.21913 12.6246C0.926956 12.2594 0.926956 11.7405 1.21913 11.3752L4.51049 7.26105L6.07223 8.51044Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0001 9.66663C10.7114 9.66663 9.66675 10.7113 9.66675 12C9.66675 13.2886 10.7114 14.3333 12.0001 14.3333C13.2887 14.3333 14.3334 13.2886 14.3334 12C14.3334 10.7113 13.2887 9.66663 12.0001 9.66663ZM7.66675 12C7.66675 9.60673 9.60685 7.66663 12.0001 7.66663C14.3933 7.66663 16.3334 9.60673 16.3334 12C16.3334 14.3932 14.3933 16.3333 12.0001 16.3333C9.60685 16.3333 7.66675 14.3932 7.66675 12Z"
      fill={Colors.Blue[500]}
    />
  </Icon>
))
