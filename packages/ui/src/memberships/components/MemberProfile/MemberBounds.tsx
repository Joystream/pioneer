import React from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { TokenValue } from '@/common/components/typography'
import { isDefined } from '@/common/utils'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'

import { AccountMemberRow } from './MemberAccounts'

type Props = {
  account: string
}

export const MemberBounds = ({ account }: Props) => {
  const balance = useBalance(account)
  return (
    <div>
      {!!account && (
        <AccountMemberRow>
          <UnknownAccountInfo address={account} placeholderName="Bound Account" />
          <TokenValue value={balance?.total} isLoading={!isDefined(balance?.total)} />
        </AccountMemberRow>
      )}
    </div>
  )
}
