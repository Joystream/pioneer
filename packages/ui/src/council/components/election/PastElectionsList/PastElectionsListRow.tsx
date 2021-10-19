import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { TotalValue } from '@/common/components/statistics'
import { TextBig, TextInlineBig, TextMedium } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { PastElection } from '@/council/types/PastElection'

interface PastElectionsListRowProps {
  election: PastElection
}

export const PastElectionsListRow = ({ election }: PastElectionsListRowProps) => {
  return (
    <PastElectionsListRowItem>
      <TextBig bold>#{election.cycleId}</TextBig>
      <TextMedium>{election.finishedAt}</TextMedium>
      <TotalValue value={election.totalStake} />
      <TextMedium>
        <TextInlineBig bold>{election.revealedVotes}</TextInlineBig>/{election.totalVotes}
      </TextMedium>
      <TextBig bold>{election.totalCandidates}</TextBig>
    </PastElectionsListRowItem>
  )
}

const PastElectionsListRowItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
  transition: ${Transitions.all};
`
