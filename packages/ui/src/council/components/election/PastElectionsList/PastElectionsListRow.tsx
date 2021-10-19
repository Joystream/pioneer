import React from 'react'

import { PastElectionsColLayout } from '@/app/pages/Council/PastElections'
import { TableListItem } from '@/common/components/List'
import { TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
import { formatDateString } from '@/common/model/formatters'
import { PastElection } from '@/council/types/PastElection'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fileds'

interface PastElectionsListRowProps {
  election: PastElection
}

export const PastElectionsListRow = ({ election }: PastElectionsListRowProps) => {
  return (
    <TableListItem $colLayout={PastElectionsColLayout} borderless>
      <Info>#{election.cycleId}</Info>
      <Info>{formatDateString(election.finishedAt)}</Info>
      <TokenValue value={election.totalStake} />
      <Fraction numerator={election.revealedVotes} denominator={election.totalVotes} sameSize />
      <CountInfo count={election.totalCandidates} />
    </TableListItem>
  )
}
