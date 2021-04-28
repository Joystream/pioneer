import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'
import { AccountRow } from '../../../common/components/Modal'
import { SidePaneLabel } from '../../../common/components/typography/SidePaneLabel'
import { Member } from '../../types'

export const MemberAccounts = ({ member }: { member: Member }) => (
  <AccountsDisplay>
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
  </AccountsDisplay>
)

const AccountsDisplay = styled.div`
  display: grid;
  grid-row-gap: 16px;
  padding: 24px;
`
