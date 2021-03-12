import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { AccountRow } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { MembershipLabel } from '../../typography/MembershipLabel'

interface Props {
  member: BaseMember
}
export const MemberAccounts = ({ member }: Props) => {
  const rootAccount = { address: member.rootAccount, name: 'Root Account' }
  const controllerAccount = { address: member.controllerAccount, name: 'Controller Account' }

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
