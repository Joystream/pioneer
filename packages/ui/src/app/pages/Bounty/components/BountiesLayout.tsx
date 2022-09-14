import React, { useRef, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { BountyEmptyFilter, BountyFilters } from '@/bounty/components/BountiesFilters'
import { BountiesList } from '@/bounty/components/BountiesList'
import { BountyStatus, QueryExtraFilter, useBounties } from '@/bounty/hooks/useBounties'
import { BountyOrderByInput } from '@/common/api/queries'
import { EmptyTab } from '@/common/components/EmptyTab'
import { Loader } from '@/common/components/icons'
import { MainPanel } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { useSort } from '@/common/hooks/useSort'

import { BountiesHeader } from './BountiesHeader'

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
              <Loader />
            ) : (
              <>
                <BountyFilters searchSlot={searchSlot} onApply={setFilters} periodFilter />
                {isLoading ? <Loader /> : <BountiesList getSortProps={getSortProps} bounties={bounties} />}
                <Pagination {...pagination} />
              </>
            )}
          </MainPanel>
        )
      }
    />
  )
}
