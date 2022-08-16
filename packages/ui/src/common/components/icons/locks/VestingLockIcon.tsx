import React from 'react'

import { Icon, StyledIcon } from '../Icon'

export const VestingLockIcon = React.memo(({ className }: StyledIcon) => (
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
      d="M0.833374 0.833313H2.50004V17.5H19.1667V19.1666H0.833374V0.833313Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5893 10.5893L10.0337 11.1448L8.85521 9.96632L9.41077 9.41077L10.5893 10.5893ZM9.47817 11.7004L8.36706 12.8115L7.18854 11.633L8.29966 10.5219L9.47817 11.7004ZM7.8115 13.3671L6.70039 14.4782L5.52188 13.2997L6.63299 12.1885L7.8115 13.3671ZM6.14483 15.0337L5.58928 15.5893L4.41077 14.4108L4.96632 13.8552L6.14483 15.0337Z"
      fill="#3F38FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0893 8.08928L10.5893 10.5893L9.41077 9.41077L11.9108 6.91077L13.0893 8.08928Z"
      fill="#3F38FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.16663 4.16669L15.8333 10.8334L18.3333 1.66669L9.16663 4.16669ZM12.3759 5.01896L14.981 7.62406L15.9579 4.04205L12.3759 5.01896Z"
      fill="#3F38FF"
    />
  </Icon>
))
