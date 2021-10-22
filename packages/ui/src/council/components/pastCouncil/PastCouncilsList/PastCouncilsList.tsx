import BN from 'bn.js'
import React from 'react'
import { generatePath } from 'react-router'

import { BlockTime } from '@/common/components/BlockTime'
import { List, TableListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { CouncilRoutes } from '@/council/constants'
import { PastCouncil } from '@/council/types/PastCouncil'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fileds'

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
    <List>
      {councils.map((council) => (
        <TableListItem
          $colLayout={'50px 1fr 1fr 1fr 1fr 1fr'}
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
            lessInfo
          />
          <TokenValue value={new BN(0)} />
          <TokenValue value={new BN(0)} />
          <CountInfo count={0} />
          <CountInfo count={0} />
        </TableListItem>
      ))}
    </List>
  )
}
