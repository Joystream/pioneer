import React from 'react'

import { List } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { PastCouncilListItem } from '@/council/components/pastCouncil/PastCouncilsList/PastCouncilListItem'
import { PastCouncil } from '@/council/types/PastCouncil'

import { PastCouncilColLayout, PastCouncilListHeaders } from './styles'

interface Props {
  isLoading: boolean
  councils?: PastCouncil[]
}

export const PastCouncilsList = ({ councils, isLoading }: Props) => {
  if (isLoading) {
    return <Loading />
  }

  if (!councils?.length) {
    return <NotFoundText>There are no past councils</NotFoundText>
  }

  return (
    <RowGapBlock gap={4}>
      <PastCouncilListHeaders $colLayout={PastCouncilColLayout}>
        <ListHeader>Term</ListHeader>
        <ListHeader>Term Ended</ListHeader>
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
