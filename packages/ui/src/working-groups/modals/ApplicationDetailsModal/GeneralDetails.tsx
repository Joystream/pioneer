import BN from 'bn.js'
import React from 'react'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'
import { AboutDateColumn } from '../../../common/components/AboutDateColumn'
import { SidePaneTable, SidePaneText, SidePaneRow } from '../../../common/components/SidePane'
import { TokenValue } from '../../../common/components/typography'
import { SidePaneLabel } from '../../../common/components/typography/SidePaneLabel'
import { openingTitle } from '../../helpers'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const GeneralDetails = React.memo(({ application }: Props) => (
  <SidePaneTable>
    <SidePaneRow>
      <SidePaneLabel text="Opening" />
      <SidePaneText>{openingTitle(application)}</SidePaneText>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Status" />
      <SidePaneText>{application.status}</SidePaneText>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Your stake" />
      <SidePaneText>
        <TokenValue value={new BN(100000)} />
      </SidePaneText>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Staking account" />
      <SidePaneText>
        <UnknownAccountInfo address={application.stakingAccount} placeholderName="Staking account" />
      </SidePaneText>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Applied on" />
      <AboutDateColumn time={application.createdAtTime} block={application.createdAtBlock} />
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Application ID" />
      <SidePaneText>{application.id}</SidePaneText>
    </SidePaneRow>
  </SidePaneTable>
))
