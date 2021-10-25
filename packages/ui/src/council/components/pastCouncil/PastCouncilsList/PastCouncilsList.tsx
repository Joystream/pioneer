import BN from 'bn.js'
import React from 'react'
import { generatePath } from 'react-router'

import { BlockTime } from '@/common/components/BlockTime'
import { List } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { CouncilRoutes } from '@/council/constants'
import { PastCouncil } from '@/council/types/PastCouncil'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fileds'

import { PastCouncilColLayout, PastCouncilListHeaders, PastCouncilTableListItem } from './styles'

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
          <PastCouncilTableListItem
            $colLayout={PastCouncilColLayout}
            $isPast
            as={GhostRouterLink}
            to={generatePath(CouncilRoutes.pastCouncil, { id: council.id })}
          >
            <Info>#{council.id}</Info>
            <BlockTime
              block={{
                network: 'OLYMPIA',
                timestamp: new Date().toString(),
                number: council.endedAtBlock,
              }}
              layout="reverse-start"
              lessInfo
            />
            <TokenValue value={new BN(0)} />
            <TokenValue value={new BN(0)} />
            <CountInfo count={0} />
            <CountInfo count={0} />
          </PastCouncilTableListItem>
        ))}
      </List>
    </RowGapBlock>
  )
}
