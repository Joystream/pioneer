import React from 'react'
import styled from 'styled-components'

import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { PastCouncilWorkingGroupsLayout } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroups'
import { WorkingGroup } from '@/working-groups/types'

interface Props {
  workingGroup: Partial<WorkingGroup>
}

export const PastCouncilWorkingGroupsItem = ({ workingGroup }: Props) => {
  return (
    <PastCouncilWorkingGroupWrapper id="pastCouncil-workingGroups-item">
      <PastCouncilWorkingGroupWrap $colLayout={PastCouncilWorkingGroupsLayout}>
        <TextMedium bold>{workingGroup.name}</TextMedium>
        <TokenValue value={1300000} />
        <TokenValue value={1300000} />
        <TextMedium bold>30%</TextMedium>
      </PastCouncilWorkingGroupWrap>
    </PastCouncilWorkingGroupWrapper>
  )
}

const PastCouncilWorkingGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const PastCouncilWorkingGroupWrap = styled(TableListItem)`
  height: ${Sizes.accountHeight};
  margin-top: -1px;
  padding-right: 16px;
`
