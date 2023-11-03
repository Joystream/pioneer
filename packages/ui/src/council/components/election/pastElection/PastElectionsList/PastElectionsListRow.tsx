import React from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import { PastElectionsColLayout } from '@/app/pages/Election/PastElections/PastElections'
import { BlockTime } from '@/common/components/BlockTime'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
import { ElectionRoutes } from '@/council/constants'
import { PastElection } from '@/council/types/PastElection'
import { CountInfo, Info } from '@/memberships/components/MemberListItem/Fields'

interface PastElectionsListRowProps {
  election: PastElection
}

export const PastElectionsListRow = ({ election }: PastElectionsListRowProps) => {
  return (
    <PastElectionsListRowItem
      $colLayout={PastElectionsColLayout}
      as={GhostRouterLink}
      to={generatePath(ElectionRoutes.pastElection, { id: election.id })}
    >
      <Info>#{election.cycleId}</Info>
      {election.finishedAtBlock ? (
        <BlockTime block={election.finishedAtBlock} layout="reverse-start" lessInfo />
      ) : (
        <></>
      )}
      <TokenValue value={election.totalCandidatesStake} />
      <TokenValue value={election.totalVoteStake} />
      <Fraction numerator={election.revealedVotes} denominator={election.totalVotes} sameSize />
      <CountInfo count={election.totalCandidates} />
    </PastElectionsListRowItem>
  )
}

const PastElectionsListRowItem = styled(TableListItem)`
  height: 76px;
  grid-column-gap: 24px;

  ${TableListItemAsLinkHover};
`
