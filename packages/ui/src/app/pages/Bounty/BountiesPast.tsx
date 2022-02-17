import React, { memo } from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { TopContributors } from '@/bounty/components/TopContributors/TopContributors'

export const BountiesPast = memo(() => {
  return <BountiesLayout tilesComponent={<TopContributors />} bountyStatus="past" />
})
