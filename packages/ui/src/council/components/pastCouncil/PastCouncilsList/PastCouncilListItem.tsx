import React from 'react'
import { generatePath } from 'react-router'

import { BlockTime } from '@/common/components/BlockTime'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import {
  PastCouncilColLayout,
  PastCouncilTableListItem,
} from '@/council/components/pastCouncil/PastCouncilsList/styles'
import { CouncilRoutes } from '@/council/constants'
import { usePastCouncilListStats } from '@/council/hooks/usePastCouncilListStats'
import { PastCouncil } from '@/council/types/PastCouncil'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fileds'

interface Props {
  council: PastCouncil
}

export const PastCouncilListItem = ({ council }: Props) => {
  const { isLoading, proposalsApproved, proposalsRejected, totalSpent, spentOnProposals } = usePastCouncilListStats(
    council.id
  )

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
      {isLoading ? <Loading /> : <TokenValue value={totalSpent} />}
      {isLoading ? <Loading /> : <TokenValue value={spentOnProposals} />}
      {isLoading ? <Loading /> : <CountInfo count={proposalsApproved} />}
      {isLoading ? <Loading /> : <CountInfo count={proposalsRejected} />}
    </PastCouncilTableListItem>
  )
}
