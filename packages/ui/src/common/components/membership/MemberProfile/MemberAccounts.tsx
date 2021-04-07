import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '../../../../accounts/components/AccountInfo'
import { useAccounts } from '../../../../accounts/hooks/useAccounts'
import { accountOrNamed } from '../../../../accounts/model/accountOrNamed'
import { BaseMember } from '../../../types'
import { AccountRow } from '../../Modals'
import { MembershipLabel } from '../../typography/MembershipLabel'

export const MemberAccounts = ({ member }: { member: BaseMember }) => {
  const { allAccounts } = useAccounts()

  const rootAccount = accountOrNamed(allAccounts, member.rootAccount, 'Root Account')
  const controllerAccount = accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account')

  return (
    <AccountsDisplay>
      <MembershipLabel text="Root account" />
      {!!rootAccount && (
        <AccountRow>
          <AccountInfo account={rootAccount} />
        </AccountRow>
      )}
      <MembershipLabel text="Controller account" />
      {!!controllerAccount && (
        <AccountRow>
          <AccountInfo account={controllerAccount} />
        </AccountRow>
      )}
    </AccountsDisplay>
  )
}

const AccountsDisplay = styled.div`
  display: grid;
  grid-row-gap: 16px;
  padding: 24px;
`
