import React from 'react'

import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { List } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useSort } from '@/common/hooks/useSort'
import { PastCouncilListItem } from '@/council/components/pastCouncil/PastCouncilsList/PastCouncilListItem'
import { usePastCouncils } from '@/council/hooks/usePastCouncils'

import { PastCouncilColLayout, PastCouncilListHeaders } from './styles'

export const PastCouncilsList = () => {
  const { order, getSortProps } = useSort<ElectedCouncilOrderByInput>('electedAtBlock')
  const { isLoading, councils, pagination } = usePastCouncils({ order })

  if (isLoading) {
    return <Loading />
  }

  if (!councils?.length) {
    return <NotFoundText>There are no past councils</NotFoundText>
  }

  return (
    <RowGapBlock gap={4}>
      <PastCouncilListHeaders $colLayout={PastCouncilColLayout}>
        <SortHeader {...getSortProps('electedAtBlock')}>Term</SortHeader>
        <SortHeader {...getSortProps('endedAtBlock')}>Term Ended</SortHeader>
        <ListHeader>Total Spent</ListHeader>
        <ListHeader>Spent on Proposals</ListHeader>
        <ListHeader>Proposals approved</ListHeader>
        <ListHeader>Proposals Rejected</ListHeader>
      </PastCouncilListHeaders>
      <List>
        {councils.map((council) => (
          <PastCouncilListItem key={council.id} council={council} />
        ))}
      </List>
      <Pagination {...pagination} />
    </RowGapBlock>
  )
}
