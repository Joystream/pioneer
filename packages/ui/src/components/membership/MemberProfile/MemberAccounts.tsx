import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { AccountRow } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { Label } from '../../typography'

interface Props {
  member: BaseMember
}
export const MemberAccounts = ({ member }: Props) => {
  const { allAccounts } = useAccounts()
  const rootAccount = allAccounts.find((a) => a.address === member.rootAccount)
  const controllerAccount = allAccounts.find((a) => a.address === member.controllerAccount)

  return (
    <AccountsDisplay>
      <AccountLabel>Root account</AccountLabel>
      {!!rootAccount && (
        <AccountRow>
          <AccountInfo account={rootAccount} />
        </AccountRow>
      )}
      <AccountLabel>Controller account</AccountLabel>
      {!!controllerAccount && (
        <AccountRow>
          <AccountInfo account={controllerAccount} />
        </AccountRow>
      )}
    </AccountsDisplay>
  )
}

const AccountsDisplay = styled.div`
  display: flex;
  flex-direction: column;
`

const AccountLabel = styled(Label)`
  margin: 16px 14px 6px;
`
