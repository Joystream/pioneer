import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyMain } from '@/app/pages/Bounty/components/BountyMain'
import { BountyRouteParams } from '@/bounty/constants'

const Header = () => <div>Header</div>

export const Bounty = () => {
  const { id } = useParams<BountyRouteParams>()

  return <PageLayout main={<BountyMain bountyStage="Expired" />} header={<Header />} />
}
