import React from 'react'

import { Icon } from './Icon'

export const TransferIcon = React.memo(({ className }: { className?: string }) => (
  <Icon
    size="16"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.01061 8.34823L5.31143 9.82643L4.61945 10.9626L1.33337 8.85138L1.38734 7.68413L13.7408 1.33325L14.6667 2.09081L11.7309 14.4869L10.7512 14.8967L7.67263 12.9206L6.09552 15.3683L4.89904 14.9986V11.9833H6.20386V12.7718L6.93528 11.6366L7.82513 11.4382L10.6765 13.2685L13.0662 3.17867L3.01061 8.34823Z"
      fill="currentColor"
      className="blackPart"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1579 5.80433L7.28517 11.1581L6.24561 10.196L10.1183 4.84229L11.1579 5.80433Z"
      fill="currentColor"
      className="primaryPart"
    />
  </Icon>
))
