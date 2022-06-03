import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Sizes, Transitions } from '@/common/constants'
import { PastCouncilWorkingGroupsLayout } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroups'
import { PastCouncilWorkingGroup } from '@/council/types/PastCouncilWorkingGroup'

interface Props {
  workingGroup: PastCouncilWorkingGroup
  totalBudget: BN
}

export const PastCouncilWorkingGroupsItem = ({ workingGroup, totalBudget }: Props) => {
  return (
    <PastCouncilWorkingGroupWrapper id="workingGroups-item">
      <PastCouncilWorkingGroupWrap $colLayout={PastCouncilWorkingGroupsLayout} as="div">
        <PastCouncilWorkingGroupTitle bold>{workingGroup.name}</PastCouncilWorkingGroupTitle>
        <TokenValue value={workingGroup.totalPaidReward} />
        <TokenValue value={workingGroup.totalMissedReward} />
        <TokenValue value={workingGroup.budget} />
        <TextMedium bold>
          {!totalBudget.isZero() ? workingGroup.budget.muln(100).div(totalBudget).toNumber() : 0}%
        </TextMedium>
      </PastCouncilWorkingGroupWrap>
    </PastCouncilWorkingGroupWrapper>
  )
}

const PastCouncilWorkingGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

const PastCouncilWorkingGroupWrap = styled(TableListItem)`
  height: ${Sizes.accountHeight};
  margin-top: -1px;
  padding-right: 16px;
`

const PastCouncilWorkingGroupTitle = styled(TextMedium)`
  text-transform: capitalize;
`
