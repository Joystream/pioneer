import React from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import { PastElectionsColLayout } from '@/app/pages/Council/PastElections/PastElections'
import { BlockTime } from '@/common/components/BlockTime'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
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
    <PastElectionsListRowItem
      $colLayout={PastElectionsColLayout}
      as={GhostRouterLink}
      to={generatePath(CouncilRoutes.pastElection, { id: election.id })}
    >
      <Info>#{election.id}</Info>
      <BlockTime
        block={{
          network: 'OLYMPIA',
          timestamp: formatDateString(election.finishedAt),
          number: parseFloat(election.finishedAt),
        }}
        layout="reverse-start"
        lessInfo
      />
      <TokenValue value={election.totalStake} />
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
