import React, { ReactNode, useState } from 'react'

import { List } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { TableOrder } from '@/common/types/TableOrder'
import { PastCouncilListItem } from '@/council/components/pastCouncil/PastCouncilsList/PastCouncilListItem'
import { PastCouncilsOrderKey, usePastCouncils } from '@/council/hooks/usePastCouncils'

import { PastCouncilColLayout, PastCouncilListHeaders } from './styles'

export const PastCouncilsList = () => {
  const [order, setOrder] = useState<TableOrder<PastCouncilsOrderKey>>({ key: 'cycle', isDescending: true })
  const { isLoading, councils } = usePastCouncils({
    isDescending: order.isDescending,
    orderKey: order.key,
  })
  const sort = (sortKey: PastCouncilsOrderKey) => {
    setOrder({ key: sortKey, isDescending: sortKey === order.key ? !order.isDescending : true })
  }

  if (isLoading) {
    return <Loading />
  }

  if (!councils?.length) {
    return <NotFoundText>There are no past councils</NotFoundText>
  }

  return (
    <RowGapBlock gap={4}>
      <PastCouncilListHeaders $colLayout={PastCouncilColLayout}>
        <SortHeader order={order} sort={sort} sortKey="cycle">
          Term
        </SortHeader>
        <SortHeader order={order} sort={sort} sortKey="termEnded">
          Term Ended
        </SortHeader>
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
    </RowGapBlock>
  )
}

interface SortHeaderProps {
  sortKey: PastCouncilsOrderKey
  order: TableOrder<PastCouncilsOrderKey>
  children: ReactNode
  sort: (sortKey: PastCouncilsOrderKey) => void
}

const SortHeader = ({ sortKey, order, children, sort }: SortHeaderProps) => (
  <ListHeader onClick={() => sort(sortKey)}>
    <HeaderText>
      {children}
      {order.key === sortKey && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
    </HeaderText>
  </ListHeader>
)
