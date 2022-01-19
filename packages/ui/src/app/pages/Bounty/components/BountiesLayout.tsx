import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyEmptyFilter, BountyFilters } from '@/bounty/components/BountiesFilters'
import { BountiesList } from '@/bounty/components/BountiesList'
import { BountyStatus, QueryExtraFilter, useBounties } from '@/bounty/hooks/useBounties'
import { BountyOrderByInput } from '@/common/api/queries'
import { EmptyTab } from '@/common/components/EmptyTab'
import { MainPanel } from '@/common/components/page/PageContent'
import { SearchProcess } from '@/common/components/page/SearchProcess'
import { Pagination } from '@/common/components/Pagination'
import { useSort } from '@/common/hooks/useSort'

import { BountiesHeader } from './BountiesHeader'

export interface LayoutProps {
  tilesComponent?: React.ReactNode
  extraFilter?: QueryExtraFilter<unknown>
  bountyStatus?: BountyStatus
  noMember?: boolean
}

export const BountiesLayout = ({
  tilesComponent,
  extraFilter,
  bountyStatus = 'active',
  noMember,
}: LayoutProps) => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const { t } = useTranslation('bounty')
  const [filters, setFilters] = useState(BountyEmptyFilter)
  const { order, getSortProps } = useSort<BountyOrderByInput>('createdAt')

  const { isLoading, bounties, pagination } = useBounties({ order, filters, status: bountyStatus, extraFilter })

  return (
    <PageLayout
      header={<BountiesHeader />}
      main={
        noMember ? (
          <EmptyTab />
        ) : (
          <MainPanel>
            {tilesComponent}
            <BountyFilters searchSlot={searchSlot} onApply={setFilters} periodFilter />
            {isLoading ? (
              <SearchProcess title={t('list.searching')} description={t('list.searchingText')} />
            ) : (
              <BountiesList getSortProps={getSortProps} bounties={bounties} />
            )}
            <Pagination {...pagination} />
          </MainPanel>
        )
      }
    />
  )
}
