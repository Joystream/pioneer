import React from 'react'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { AccountRow } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { isDefined } from '@/common/utils'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'
import { RowGapBlock } from '../../../common/components/page/PageContent'
import { SidePaneLabel } from '../../../common/components/SidePane'
import { Member } from '../../types'

import { MemberBounds } from './MemberBounds'

export const MemberAccounts = ({ member }: { member: Member }) => {
  const rootBalance = useBalance(member.rootAccount)
  const countrolBalance = useBalance(member.controllerAccount)

  return (
    <AccountsDisplay gap={16}>
      <SidePaneLabel text="Root account" />
      {!!member.rootAccount && (
        <AccountMemberRow>
          <UnknownAccountInfo address={member.rootAccount} placeholderName="Root Account" />
          <TokenValue value={rootBalance?.total} isLoading={!isDefined(rootBalance?.total)} />
        </AccountMemberRow>
      )}
      <SidePaneLabel text="Controller account" />
      {!!member.controllerAccount && (
        <AccountMemberRow>
          <UnknownAccountInfo address={member.controllerAccount} placeholderName="Controller Account" />
          <TokenValue value={countrolBalance?.total} isLoading={!isDefined(countrolBalance?.total)} />
        </AccountMemberRow>
      )}

      {!!(member.boundAccounts.length !== 0) && (
        <>
          <SidePaneLabel text="Bound accounts" />
          {member.boundAccounts.map((account) => {
            return <MemberBounds account={account} />
          })}
        </>
      )}
    </AccountsDisplay>
  )
}

const AccountsDisplay = styled(RowGapBlock)`
  padding: 24px;
`

export const AccountMemberRow = styled(AccountRow)`
  grid-template-rows: 2fr;
  -webkit-box-align: center;
  -ms-flex-align: center;
  justify-items: end;
  padding: 8px 14px 8px 14px;
`
