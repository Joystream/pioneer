import React from 'react'

import { Loading } from '@/common/components/Loading'
import { SidePaneColumn, SidePaneLabel, SidePaneRow, SidePaneTable, SidePaneText } from '@/common/components/SidePane'
import { EmptyBody } from '@/proposals/modals/VoteRationale/VoteRationale'
import { StakeChangedActivity } from '@/working-groups/types'

type Props = { activity: StakeChangedActivity }

export const StakeChangedDetails = React.memo(({ activity }: Props) => {
  if (!activity) {
    return (
      <EmptyBody>
        <Loading />
      </EmptyBody>
    )
  }

  return (
    <SidePaneTable>
      <SidePaneColumn>
        <SidePaneLabel text="label" />
        <SidePaneText>text</SidePaneText>
      </SidePaneColumn>
      <SidePaneRow>
        <SidePaneLabel text="labe" />
        {/* <BlockTime block={registeredAtBlock} /> */}
      </SidePaneRow>
      <SidePaneRow>
        <SidePaneLabel text="label" />
        <SidePaneText>text</SidePaneText>
      </SidePaneRow>
    </SidePaneTable>
  )
})
