import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyMain } from '@/app/pages/Bounty/components/BountyMain'
import { BountyRouteParams } from '@/bounty/constants'
import { useBounty } from '@/bounty/hooks/useBounty'
import { Loading } from '@/common/components/Loading'

const Header = () => <div>Header</div>

export const Bounty = () => {
  const { id } = useParams<BountyRouteParams>()
  const { bounty, isLoading } = useBounty(id)

  if (isLoading || !bounty) {
    return <Loading />
  }

  return <PageLayout main={<BountyMain bounty={bounty} />} header={<Header />} />
}
