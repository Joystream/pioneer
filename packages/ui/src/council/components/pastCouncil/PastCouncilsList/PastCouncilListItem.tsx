import BN from 'bn.js'
import React from 'react'
import { generatePath } from 'react-router'

import { BlockTime } from '@/common/components/BlockTime'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import {
  PastCouncilColLayout,
  PastCouncilTableListItem,
} from '@/council/components/pastCouncil/PastCouncilsList/styles'
import { CouncilRoutes } from '@/council/constants'
import { useGetCouncilBlockRangeQuery, useGetCouncilExecutedProposalsCountQuery } from '@/council/queries'
import { PastCouncil } from '@/council/types/PastCouncil'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fileds'

interface Props {
  council: PastCouncil
}

const usePastCouncilProposals = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: {
      where: {
        id,
      },
    },
  })

  const council = rangeData?.electedCouncilByUniqueInput

  const { loading: loadingData, data } = useGetCouncilExecutedProposalsCountQuery({
    variables: {
      startBlock: council?.electedAtBlock ?? 0,
      endBlock: council?.endedAtBlock ?? 0,
    },
  })

  return {
    isLoading: loadingRange || loadingData,
    approved: data?.proposalExecutedEventsConnection.totalCount ?? 0,
  }
}

export const PastCouncilListItem = ({ council }: Props) => {
  const { approved } = usePastCouncilProposals(council.id)

  return (
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
      <CountInfo count={approved} />
      <CountInfo count={0} />
    </PastCouncilTableListItem>
  )
}
