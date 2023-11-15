import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '../../../common/components/page/PageContent'
import { SidePaneLabel } from '../../../common/components/SidePane'
import { Member } from '../../types'

import { MemberBounds } from './MemberBounds'

export const MemberAccounts = ({ member }: { member: Member }) => {
  return (
    <AccountsDisplay gap={16}>
      <SidePaneLabel text="Root account" />
      {!!member.rootAccount && <MemberBounds account={member.rootAccount} name="Root Account" />}
      <SidePaneLabel text="Controller account" />
      {!!member.controllerAccount && <MemberBounds account={member.controllerAccount} name="Controller Account" />}

      {!!(member.boundAccounts.length !== 0) && (
        <>
          <SidePaneLabel text="Bound accounts" />
          {member.boundAccounts.map((account) => {
            return <MemberBounds account={account} name="Bound Account" />
          })}
        </>
      )}
    </AccountsDisplay>
  )
}

const AccountsDisplay = styled(RowGapBlock)`
  padding: 24px;
`
