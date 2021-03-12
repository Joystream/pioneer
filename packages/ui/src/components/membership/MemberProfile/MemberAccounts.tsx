import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { AccountRow } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { MembershipLabel } from '../../typography/MembershipLabel'

interface Props {
  member: BaseMember
}
export const MemberAccounts = ({ member }: Props) => {
  const { allAccounts } = useAccounts()
  const rootAccount = allAccounts.find((a) => a.address === member.rootAccount)
  const controllerAccount = allAccounts.find((a) => a.address === member.controllerAccount)

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
