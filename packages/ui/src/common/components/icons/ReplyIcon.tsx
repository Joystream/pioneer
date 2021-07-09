import React from 'react'

import { Icon } from './Icon'

interface ReplyIconProps {
  className?: any
}

export const ReplyIcon = React.memo(({ className }: ReplyIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 13 12"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      d="M6.82118 7.88236V11.3333L0.333374 6L6.82118 0.666672V4.11765C10.2338 4.11765 13 6.92675 13 10.3922C13 10.5635 12.9939 10.7329 12.9803 10.9004C12.5085 9.98944 11.8004 9.22677 10.9327 8.69485C10.0649 8.16292 9.07053 7.88196 8.05695 7.88236H6.82118ZM5.58541 8.70306V6.62746H8.05695C8.93435 6.62746 9.78147 6.79749 10.5637 7.11248C10.1001 6.56585 9.52567 6.12739 8.87974 5.82709C8.2338 5.52679 7.53159 5.37174 6.82118 5.37255H5.58541V3.29695L2.29763 6L5.58541 8.70306Z"
      fill="currentColor"
    />
  </Icon>
))
