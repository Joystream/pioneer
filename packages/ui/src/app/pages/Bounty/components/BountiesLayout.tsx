import React, { useRef, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyEmptyFilter, BountyFilters } from '@/bounty/components/BountiesFilters'
import { BountiesHeader } from '@/bounty/components/BountiesHeader'
import { BountiesList } from '@/bounty/components/BountiesList'
import { BountyStatus, QueryExtraFilter, useBounties } from '@/bounty/hooks/useBounties'
import { BountyOrderByInput } from '@/common/api/queries'
import { EmptyTab } from '@/common/components/EmptyTab'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { useSort } from '@/common/hooks/useSort'

export interface LayoutProps {
  tilesComponent?: React.ReactNode
  extraFilter?: QueryExtraFilter<unknown>
  bountyStatus?: BountyStatus
  hasNoMember?: boolean
}

export const BountiesLayout = ({ tilesComponent, extraFilter, bountyStatus = 'active', hasNoMember }: LayoutProps) => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState(BountyEmptyFilter)
  const { order, getSortProps } = useSort<BountyOrderByInput>('createdAt')

  const { isLoading, bounties, pagination } = useBounties({ order, filters, status: bountyStatus, extraFilter })

  const isInitialLoading = filters === BountyEmptyFilter && isLoading

  return (
    <PageLayout
      header={<BountiesHeader />}
      main={
        hasNoMember ? (
          <EmptyTab />
        ) : (
          <MainPanel>
            {tilesComponent}
            {isInitialLoading ? (
              <Loading />
            ) : (
              <>
                <BountyFilters searchSlot={searchSlot} onApply={setFilters} periodFilter />
                {isLoading ? <Loading /> : <BountiesList getSortProps={getSortProps} bounties={bounties} />}
                <Pagination {...pagination} />
              </>
            )}
          </MainPanel>
        )
      }
    />
  )
}
