import React from 'react'
import { generatePath } from 'react-router'

import { PastElectionsColLayout } from '@/app/pages/Council/PastElections/PastElections'
import { TableListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
import { formatDateString } from '@/common/model/formatters'
import { CouncilRoutes } from '@/council/constants'
import { PastElection } from '@/council/types/PastElection'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fileds'

interface PastElectionsListRowProps {
  election: PastElection
}

export const PastElectionsListRow = ({ election }: PastElectionsListRowProps) => {
  return (
    <TableListItem
      $colLayout={PastElectionsColLayout}
      borderless
      as={GhostRouterLink}
      to={generatePath(CouncilRoutes.pastElection, { id: election.id })}
    >
      <Info>#{election.id}</Info>
      <Info>{formatDateString(election.finishedAt)}</Info>
      <TokenValue value={election.totalStake} />
      <Fraction numerator={election.revealedVotes} denominator={election.totalVotes} sameSize />
      <CountInfo count={election.totalCandidates} />
    </TableListItem>
  )
}
