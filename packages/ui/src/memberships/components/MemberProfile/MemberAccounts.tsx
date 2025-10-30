import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '../../../common/components/page/PageContent'
import { SidePaneLabel } from '../../../common/components/SidePane'
import { Member } from '../../types'

import { MemberAccount } from './MemberAccount'

export const MemberAccounts = ({ member }: { member: Member }) => {
  return (
    <AccountsDisplay gap={16}>
      <SidePaneLabel text="Root account" />
      {!!member.rootAccount && <MemberAccount account={member.rootAccount} name="Root Account" />}
      <SidePaneLabel text="Controller account" />
      {!!member.controllerAccount && <MemberAccount account={member.controllerAccount} name="Controller Account" />}

      {!!(member.boundAccounts.length !== 0) && (
        <>
          <SidePaneLabel text="Bound accounts" />
          {member.boundAccounts.map((account) => {
            return <MemberAccount account={account} name="Bound Account" />
          })}
        </>
      )}
    </AccountsDisplay>
  )
}

const AccountsDisplay = styled(RowGapBlock)`
  padding: 24px;
  @media (max-width: 424px) {
    padding: 24px 16px;
  }
`
