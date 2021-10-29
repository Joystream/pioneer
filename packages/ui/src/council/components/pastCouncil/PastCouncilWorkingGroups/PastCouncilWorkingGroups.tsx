import React, { useEffect } from 'react'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useToggle } from '@/common/hooks/useToggle'
import { PastCouncilTabsHeaders } from '@/council/components/pastCouncil/PastCouncilTabs'
import { PastCouncilWorkingGroupsItem } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroupsItem'

interface Props {
  councilId: string
}

export const PastCouncilWorkingGroups = ({ councilId }: Props) => {
  const [isLoading, toggleIsLoading] = useToggle(true)
  const workingGroups: any[] = [
    {
      id: 1,
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      toggleIsLoading()
    }, 500)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <RowGapBlock gap={4} id="pastCouncil-workingGroups">
      <PastCouncilTabsHeaders $colLayout={PastCouncilWorkingGroupsLayout}>
        <ListHeader>Working Group</ListHeader>
        <ListHeader>Total paid rewards</ListHeader>
        <ListHeader>Total missed rewards</ListHeader>
        <ListHeader>% of total budget</ListHeader>
      </PastCouncilTabsHeaders>
      <List>
        {workingGroups?.map((workingGroup) => (
          <ListItem key={workingGroup.id}>
            <PastCouncilWorkingGroupsItem workingGroup={{ name: 'Storage' }} />
          </ListItem>
        ))}
      </List>
    </RowGapBlock>
  )
}

export const PastCouncilWorkingGroupsLayout = 'repeat(3,1fr) 140px'
