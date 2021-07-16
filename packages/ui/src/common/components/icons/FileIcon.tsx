import React from 'react'

import { Icon } from './Icon'

export const FileIcon = React.memo(() => (
  <Icon size="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="none" color="currentColor">
    <path
      d="M2 1.33301H9.60947L14 5.72353L14 14.3524L13 15.333H2V1.33301ZM3.33333 2.66634V13.9997H12.6667L12.6667 6.27582L9.05719 2.66634H3.33333Z"
      fill="currentColor"
      className="blackPart"
    />
    <path d="M8.66669 2H10V5.33333H13.3334V6.66667H8.66669V2Z" fill="currentColor" className="blackPart" />
    <path d="M5.33331 8.66602H10.6666V9.99935H5.33331V8.66602Z" fill="currentColor" className="primaryPart" />
    <path d="M5.33331 11.333H10.6666V12.6663H5.33331V11.333Z" fill="currentColor" className="primaryPart" />
  </Icon>
))
