import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesMain } from '@/app/pages/Bounty/components/BountiesMain'
import { BountyEmptyFilter, BountyFilters } from '@/bounty/components/BountiesFilters'
import { BountiesList } from '@/bounty/components/BountiesList'
import { useBounties } from '@/bounty/hooks/useBounties'
import { BountyOrderByInput } from '@/common/api/queries'
import { SearchProcess } from '@/common/components/page/SearchProcess'
import { Pagination } from '@/common/components/Pagination'
import { SimpleSelect } from '@/common/components/selects'
import { useSort } from '@/common/hooks/useSort'

const sortingOptions = ['Latest', 'Earliest']

export const BountiesPast = () => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const { t } = useTranslation('bounty')
  const [filters, setFilters] = useState(BountyEmptyFilter)
  const { order, getSortProps } = useSort<BountyOrderByInput>('createdAt')
  const { onSort, isDescending } = getSortProps('createdAt')

  const { isLoading, bounties, pagination } = useBounties({ order, filters, status: 'past' })

  return (
    <BountiesLayout>
      <BountiesMain />
      <BountyFilters searchSlot={searchSlot} onApply={setFilters} />
      {isLoading ? (
        <>
          <SimpleSelect
            title="Sorting"
            options={sortingOptions}
            value={isDescending ? 'Latest' : 'Earliest'}
            onChange={onSort}
          />
          <SearchProcess title={t('list.searching')} description={t('list.searchingText')} />
        </>
      ) : (
        <BountiesList bounties={bounties} />
      )}
      <Pagination {...pagination} />
    </BountiesLayout>
  )
}
