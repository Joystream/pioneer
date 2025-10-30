import React from 'react'

import { Icon } from './Icon'

export const VerifiedMemberIcon = React.memo(({ className }: { className?: string }) => (
  <Icon className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" color="currentColor">
    <path d="M20 7.5975L9.90608 18L4 12.735L5.78463 11.0132L9.77205 14.5679L18.0857 6L20 7.5975Z" fill="currentColor" />
  </Icon>
))
