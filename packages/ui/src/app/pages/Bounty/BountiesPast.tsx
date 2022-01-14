import React, { memo } from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'

export const BountiesPast = memo(() => {
  return <BountiesLayout bountyStatus="past" />
})
