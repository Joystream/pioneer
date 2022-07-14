import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyMain } from '@/app/pages/Bounty/components/BountyMain'
import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'
import { BountyRouteParams } from '@/bounty/constants'
import { useBounty } from '@/bounty/hooks/useBounty'
import { Loading } from '@/common/components/Loading'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'

export const Bounty = () => {
  const { id } = useParams<BountyRouteParams>()
  const history = useHistory()
  const { isLoading, bounty } = useBounty(id)

  useRefetchQueries(
    { when: bounty && !bounty.isTerminated, interval: MILLISECONDS_PER_BLOCK, include: ['GetBounty'] },
    [bounty]
  )

  if (!bounty) {
    if (!isLoading) history.replace('/404')
    return <Loading />
  }

  return <PageLayout main={<BountyMain bounty={bounty} />} header={<BountyPreviewHeader bounty={bounty} />} />
}
