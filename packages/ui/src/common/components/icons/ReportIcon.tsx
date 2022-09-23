import React from 'react'

import { Icon } from '@/common/components/icons/Icon'

export const ReportIcon = React.memo(({ className }: { className?: string }) => {
  return (
    <Icon className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33348 2.66732C3.33329 4.17505 3.33333 5.26726 3.33337 6.5617C3.33339 7.00875 3.3334 7.47992 3.33341 8.00065H7.27623L8.60956 9.33398L11.6292 9.33398L10.003 6.66732L11.6292 4.00065L8.05727 4.00065L6.72394 2.66732L3.33348 2.66732ZM3.33342 9.33398V14.6673H2.00008V8.66732C2.00008 7.87003 2.00006 7.19191 2.00004 6.56171C1.99999 5.08416 1.99971 3.87004 2 2.00065L2.66667 1.334L7.27623 1.33398L8.60956 2.66732L14 2.66732L11.5647 6.66732L14 10.6673L8.05727 10.6673L6.72394 9.33398H3.33342Z"
        fill="#3F38FF"
      />
    </Icon>
  )
})
