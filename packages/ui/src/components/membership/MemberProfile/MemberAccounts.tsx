import React from 'react'
import styled from 'styled-components'

import { Account, Address, BaseMember } from '../../../common/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { AccountRow } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { MembershipLabel } from '../../typography/MembershipLabel'

export const accountOrNamed = (allAccounts: Account[], address: Address | string, name: string) => {
  const existing = allAccounts.find((account) => account.address === address)

  return existing ?? { address: address, name: name }
}

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
