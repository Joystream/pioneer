import React, { useRef, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountyEmptyFilter, BountyFilters } from '@/bounty/components/BountiesFilters'
import { BountiesList } from '@/bounty/components/BountiesList'
import { useBounties } from '@/bounty/hooks/useBounties'
import { BountyOrderByInput } from '@/common/api/queries'
import { MainPanel } from '@/common/components/page/PageContent'
import { SearchProcess } from '@/common/components/page/SearchProcess'
import { Pagination } from '@/common/components/Pagination'
import { useSort } from '@/common/hooks/useSort'

export const BountiesCurrent = memo(() => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const { t } = useTranslation('bounty')
  const [filters, setFilters] = useState(BountyEmptyFilter)
  const { order, getSortProps } = useSort<BountyOrderByInput>('createdAt')

  const { isLoading, bounties, pagination } = useBounties({ order, filters, status: 'active' })

  return (
    <BountiesLayout>
      <MainPanel>
        <BountyFilters searchSlot={searchSlot} onApply={setFilters} periodFilter />
        {isLoading ? (
          <SearchProcess title={t('list.searching')} description={t('list.searchingText')} />
        ) : (
          <BountiesList getSortProps={getSortProps} bounties={bounties} />
        )}
        <Pagination {...pagination} />
      </MainPanel>
    </BountiesLayout>
  )
})
