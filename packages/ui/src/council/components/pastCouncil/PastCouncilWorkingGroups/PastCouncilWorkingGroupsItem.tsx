import BN from 'bn.js'
import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { ArrowRightIcon } from '@/common/components/icons'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Sizes, Transitions } from '@/common/constants'
import { PastCouncilWorkingGroupsLayout } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroups'
import { PastCouncilWorkingGroup } from '@/council/types/PastCouncilWorkingGroup'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { groupNameToURLParam } from '@/working-groups/model/workingGroupName'

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
          {!totalBudget.eqn(0) ? workingGroup.budget.muln(100).div(totalBudget).toNumber() : 0}%
        </TextMedium>
        <LinkButtonGhost
          to={generatePath(WorkingGroupsRoutes.group, { name: groupNameToURLParam(workingGroup.name) })}
          size="medium"
        >
          Go to working group <ArrowRightIcon />
        </LinkButtonGhost>
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

  > *:last-child {
    justify-self: end;
  }
`

const PastCouncilWorkingGroupTitle = styled(TextMedium)`
  text-transform: capitalize;
`
