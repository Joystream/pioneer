import React from 'react'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { AccountRow } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { isDefined } from '@/common/utils'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'

type Props = {
  account: string
  name: string
}

export const MemberAccount = ({ account, name }: Props) => {
  const balance = useBalance(account)
  return (
    <div>
      {!!account && (
        <AccountMemberRow>
          <UnknownAccountInfo address={account} placeholderName={name} />
          <TokenValue value={balance?.total} isLoading={!isDefined(balance?.total)} />
        </AccountMemberRow>
      )}
    </div>
  )
}

export const AccountMemberRow = styled(AccountRow)`
  grid-template-rows: 2fr;
  -webkit-box-align: center;
  -ms-flex-align: center;
  justify-items: end;
  padding: 8px 14px 8px 14px;
`
