import React from 'react'
import { generatePath } from 'react-router'

import { BlockTime } from '@/common/components/BlockTime'
import { Loader } from '@/common/components/icons'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import {
  PastCouncilColLayout,
  PastCouncilTableListItem,
} from '@/council/components/pastCouncil/PastCouncilsList/styles'
import { CouncilRoutes } from '@/council/constants'
import { usePastCouncilStats } from '@/council/hooks/usePastCouncilStats'
import { PastCouncil } from '@/council/types/PastCouncil'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fields'

interface Props {
  council: PastCouncil
}

export const PastCouncilListItem = ({ council }: Props) => {
  const { isLoading, proposalsApproved, proposalsRejected, totalSpent, spentOnProposals } = usePastCouncilStats(
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
      <BlockTime block={council.endedAt} layout="reverse-start" lessInfo />
      {isLoading ? <Loader /> : <TokenValue value={totalSpent} />}
      {isLoading ? <Loader /> : <TokenValue value={spentOnProposals} />}
      {isLoading ? <Loader /> : <CountInfo count={proposalsApproved} />}
      {isLoading ? <Loader /> : <CountInfo count={proposalsRejected} />}
    </PastCouncilTableListItem>
  )
}
