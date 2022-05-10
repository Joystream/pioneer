import BN from 'bn.js'
import React from 'react'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { BlockTime } from '@/common/components/BlockTime'
import { LinkButtonLink } from '@/common/components/buttons/LinkButtons'
import { SidePaneTable, SidePaneText, SidePaneRow, SidePaneLabel } from '@/common/components/SidePane'
import { TokenValue } from '@/common/components/typography'

import { openingTitle } from '../../helpers'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const GeneralDetails = React.memo(({ application }: Props) => (
  <SidePaneTable>
    <SidePaneRow>
      <SidePaneLabel text="Opening" />
      <LinkButtonLink size="small" to={`/working-groups/openings/${application?.opening?.id}`}>
        {openingTitle(application)}
      </LinkButtonLink>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Status" />
      <SidePaneText>{application.status}</SidePaneText>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Your stake" />
      <SidePaneText>
        <TokenValue value={new BN(application.stake)} />
      </SidePaneText>
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Staking account" />
      <UnknownAccountInfo address={application.stakingAccount} placeholderName="Staking account" />
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Applied on" />
      <BlockTime block={application.createdAtBlock} />
    </SidePaneRow>
    <SidePaneRow>
      <SidePaneLabel text="Application ID" />
      <SidePaneText>{application.runtimeId}</SidePaneText>
    </SidePaneRow>
  </SidePaneTable>
))
