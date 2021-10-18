import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { TextMedium } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { Election } from '@/council/types/Election'

interface PastElectionsListRowProps {
  election: Election
}

export const PastElectionsListRow = ({ election }: PastElectionsListRowProps) => {
  return (
    <PastElectionsListRowItem>
      <TextMedium>#{election.cycleId}</TextMedium>
      <TextMedium>#{election.cycleId}</TextMedium>
      <TextMedium>#{election.cycleId}</TextMedium>
    </PastElectionsListRowItem>
  )
}

const PastElectionsListRowItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
  transition: ${Transitions.all};
`
