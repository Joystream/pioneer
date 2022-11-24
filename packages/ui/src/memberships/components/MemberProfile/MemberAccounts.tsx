import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'
import { AccountRow } from '../../../common/components/Modal'
import { RowGapBlock } from '../../../common/components/page/PageContent'
import { SidePaneLabel } from '../../../common/components/SidePane'
import { Member } from '../../types'

export const MemberAccounts = ({ member }: { member: Member }) => (
  <AccountsDisplay gap={16}>
    <SidePaneLabel text="Root account" />
    {!!member.rootAccount && (
      <AccountRow>
        <UnknownAccountInfo address={member.rootAccount} placeholderName="Root Account" />
      </AccountRow>
    )}
    <SidePaneLabel text="Controller account" />
    {!!member.controllerAccount && (
      <AccountRow>
        <UnknownAccountInfo address={member.controllerAccount} placeholderName="Controller Account" />
      </AccountRow>
    )}

    {!!member.boundAccounts.length && (
      <>
        <SidePaneLabel text="Bound accounts" />
        {member.boundAccounts.map((account) => (
          <AccountRow key={account}>
            <UnknownAccountInfo address={account} placeholderName="Bound Account" />
          </AccountRow>
        ))}
      </>
    )}
  </AccountsDisplay>
)

const AccountsDisplay = styled(RowGapBlock)`
  padding: 24px;
`
