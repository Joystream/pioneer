import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyMain } from '@/app/pages/Bounty/components/BountyMain'
import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'
import { BountyRouteParams } from '@/bounty/constants'
import { useBounty } from '@/bounty/hooks/useBounty'
import { Loading } from '@/common/components/Loading'
import { useRefetch } from '@/common/hooks/useRefetch'

export const Bounty = () => {
  const { id } = useParams<BountyRouteParams>()
  const { isLoading, bounty, refetch } = useBounty(id)
  useRefetch({ type: 'set', payload: refetch })

  if (isLoading || !bounty) {
    return <Loading />
  }

  return <PageLayout main={<BountyMain bounty={bounty} />} header={<BountyPreviewHeader bounty={bounty} />} />
}
