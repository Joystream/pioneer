import React, { memo } from 'react'
import styled from 'styled-components'

import { BountyOrderByInput } from '@/common/api/queries'
import { CountBadge } from '@/common/components/CountBadge'
import { Loading } from '@/common/components/Loading'
import { Pagination } from '@/common/components/Pagination'
import { SimpleSelect } from '@/common/components/selects'
import { TextBig } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useSort } from '@/common/hooks/useSort'

import { useBounties } from '../hooks/useBounties'

import { BountyListItem } from './BountyListItem/BountyListItem'

export const BountiesList = memo(() => {
  const { order, getSortProps } = useSort<BountyOrderByInput>('createdAt')
  const { onSort, isDescending } = getSortProps('createdAt')
  const { isLoading, bounties, pagination } = useBounties({ order })

  if (isLoading) {
    return <Loading />
  }

  if (!bounties?.length) {
    return <NotFoundText>No Bounties</NotFoundText>
  }

  return (
    <div>
      <Title bold value>
        Bounties
        <Counter count={bounties.length} />
      </Title>
      <SimpleSelect
        title="Sorting"
        options={['Latest', 'Earliest']}
        value={isDescending ? 'Latest' : 'Earliest'}
        onChange={onSort}
      />
      {bounties.map((bounty) => {
        return <BountyListItem {...bounty} />
      })}
      <Pagination {...pagination} />
    </div>
  )
})

const Title = styled(TextBig)`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  width: fit-content;
`

const Counter = styled(CountBadge)`
  margin-left: 12px;
`
