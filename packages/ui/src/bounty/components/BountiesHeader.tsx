import React from 'react'

import { PageHeader } from '../../app/components/PageHeader'
import { BountiesTabs } from '../../app/pages/Bounty/components/BountiesTabs'

import { AddBountyButton } from './modalsButtons/AddBountyButton'

export const BountiesHeader = () => {
  return <PageHeader title="Bounty" tabs={<BountiesTabs />} buttons={<AddBountyButton />} />
}
