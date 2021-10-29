import React from 'react'
import styled from 'styled-components'

import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Sizes, Transitions } from '@/common/constants'
import { PastCouncilWorkingGroupsLayout } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroups'
import { PastCouncilWorkingGroup } from '@/council/types/PastCouncilWorkingGroup'

interface Props {
  workingGroup: PastCouncilWorkingGroup
}

export const PastCouncilWorkingGroupsItem = ({ workingGroup }: Props) => {
  return (
    <PastCouncilWorkingGroupWrapper id="pastCouncil-workingGroups-item">
      <PastCouncilWorkingGroupWrap $colLayout={PastCouncilWorkingGroupsLayout} as="div">
        <TextMedium bold>{workingGroup.name}</TextMedium>
        <TokenValue value={workingGroup.totalPaidReward} />
        <TokenValue value={workingGroup.totalMissedReward} />
        <TextMedium bold>30%</TextMedium>
      </PastCouncilWorkingGroupWrap>
    </PastCouncilWorkingGroupWrapper>
  )
}

const PastCouncilWorkingGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const PastCouncilWorkingGroupWrap = styled(TableListItem)`
  height: ${Sizes.accountHeight};
  margin-top: -1px;
  padding-right: 16px;
`
