import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OverviewInfoElement } from '@/overview/components/OverviewInfoElement'
import { OverviewWrapper } from '@/overview/components/OverviewWrapper'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useProposalsCount } from '@/proposals/hooks/useProposalsCount'

import { ProposalsTilesList } from './ProposalsTilesList'

export const ProposalsOverview = () => {
  const { t } = useTranslation('overview')
  const { proposals } = useProposals({ status: 'active' })
  const { count, loading: countLoading } = useProposalsCount('all')
  const { count: approvedCount, loading: approvedCountLoading } = useProposalsCount('approved')
  const { count: rejectedCount, loading: rejectedCountLoading } = useProposalsCount('rejected')

  const infoElements = useMemo(
    () => (
      <>
        {<OverviewInfoElement value={count} label={t('proposals.new')} isLoading={countLoading} />}
        {<OverviewInfoElement value={approvedCount} label={t('proposals.approved')} isLoading={approvedCountLoading} />}
        {<OverviewInfoElement value={rejectedCount} label={t('proposals.rejected')} isLoading={rejectedCountLoading} />}
      </>
    ),
    [t, count, approvedCount, rejectedCount]
  )

  return (
    <OverviewWrapper
      title={t('proposals.title')}
      linkPath={ProposalsRoutes.current}
      infoElements={infoElements}
      scroller={<ProposalsTilesList proposals={proposals} />}
    />
  )
}
