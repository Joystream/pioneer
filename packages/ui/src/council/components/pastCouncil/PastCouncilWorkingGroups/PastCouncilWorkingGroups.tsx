import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { BN_ZERO } from '@/common/constants'
import { PastCouncilTabsHeaders } from '@/council/components/pastCouncil/PastCouncilTabs'
import { PastCouncilWorkingGroupsItem } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroupsItem'
import { usePastCouncilWorkingGroups } from '@/council/hooks/usePastCouncilWorkingGroups'

interface Props {
  councilId: string
}

export const PastCouncilWorkingGroups = ({ councilId }: Props) => {
  const { isLoading, workingGroups } = usePastCouncilWorkingGroups(councilId)

  const totalBudget = workingGroups?.reduce((a, b) => a.add(b.budget), BN_ZERO) ?? BN_ZERO

  if (isLoading) {
    return <Loading />
  }

  return (
    <RowGapBlock gap={4} id="pastCouncil-workingGroups">
      <PastCouncilTabsHeaders $colLayout={PastCouncilWorkingGroupsLayout}>
        <ListHeader>Working Group</ListHeader>
        <ListHeader>Total paid rewards</ListHeader>
        <ListHeader>Total missed rewards</ListHeader>
        <ListHeader>Budget</ListHeader>
        <ListHeader>% of total budget</ListHeader>
      </PastCouncilTabsHeaders>
      <List>
        {workingGroups?.map((workingGroup) => (
          <ListItem key={workingGroup.id} borderless>
            <PastCouncilWorkingGroupsItem workingGroup={workingGroup} totalBudget={totalBudget} />
          </ListItem>
        ))}
      </List>
    </RowGapBlock>
  )
}

export const PastCouncilWorkingGroupsLayout = 'repeat(5,1fr)'
