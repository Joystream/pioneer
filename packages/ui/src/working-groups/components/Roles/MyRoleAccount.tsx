import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { ListItem } from '@/common/components/List'
import { Label, TokenValue } from '@/common/components/typography'

export interface MyRoleAccountProps {
  account: Account
}

export const MyRoleAccount = ({ account }: MyRoleAccountProps) => {
  const balance = useBalance(account.address)

  return (
    <ListItem>
      <RoleAccount>
        <UnknownAccountInfo address={account.address} placeholderName={account.name as string} />
        <RoleAccountBalances>
          <RoleAccountBalance>
            <Label>Total balance</Label>
            <TokenValue value={balance?.total} />
          </RoleAccountBalance>
          {account.name === 'Stake Account' && (
            <RoleAccountBalance>
              <Label>Locked balance</Label>
              <TokenValue value={balance?.locked} />
            </RoleAccountBalance>
          )}
        </RoleAccountBalances>
      </RoleAccount>
    </ListItem>
  )
}

const RoleAccount = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  justify-items: end;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px 64px 16px 16px;
  margin-left: -1px;
`
const RoleAccountBalances = styled.div`
  width: 100%;
`

const RoleAccountBalance = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  justify-items: end;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
`
