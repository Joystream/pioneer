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
  const { proposals, isLoading: proposalsLoading } = useProposals({ status: 'active', fetchAll: true })
  const {
    toBeDecided: { count, isLoading: countLoading },
    approved: { count: approvedCount, isLoading: approvedCountLoading },
    rejected: { count: rejectedCount, isLoading: rejectedCountLoading },
  } = useProposalsCount()

  const infoElements = useMemo(
    () => (
      <>
        {<OverviewInfoElement value={count} label={t('proposals.new')} isLoading={countLoading} />}
        {<OverviewInfoElement value={approvedCount} label={t('proposals.approved')} isLoading={approvedCountLoading} />}
        {<OverviewInfoElement value={rejectedCount} label={t('proposals.rejected')} isLoading={rejectedCountLoading} />}
      </>
    ),
    [t, countLoading, approvedCountLoading, rejectedCountLoading]
  )

  return (
    <OverviewWrapper
      title={t('proposals.title')}
      linkPath={ProposalsRoutes.current}
      infoElements={infoElements}
      scroller={<ProposalsTilesList proposals={proposals} isLoading={proposalsLoading} />}
    />
  )
}
