import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { ListItem } from '@/common/components/List'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label, TokenValue } from '@/common/components/typography'

export interface MyRoleAccountProps {
  account: Account
  canChangeAccount?: boolean
  canMoveTokens?: boolean
}

export const MyRoleAccount = ({ account, canChangeAccount, canMoveTokens }: MyRoleAccountProps) => {
  const balance = useBalance(account.address)

  return (
    <ContentWithTabs>
      <RoleAccountHeader>
        <Label>{account.name}</Label>
        <ButtonsGroup>
          {canChangeAccount === true && <ButtonGhost size="small">Change {account.name}</ButtonGhost>}
          {canMoveTokens === true && <ButtonPrimary size="small">Move excess tokens</ButtonPrimary>}
        </ButtonsGroup>
      </RoleAccountHeader>
      <ListItem>
        <RoleAccount>
          <UnknownAccountInfo address={account.address} placeholderName={account.name as string} />
          <RoleAccountBalances>
            <RoleAccountBalance>
              <Label>Total balance</Label>
              <TokenValue value={balance?.total} />
            </RoleAccountBalance>
            <RoleAccountBalance>
              <Label>Locked balance</Label>
              <TokenValue value={balance?.locked} />
            </RoleAccountBalance>
          </RoleAccountBalances>
        </RoleAccount>
      </ListItem>
    </ContentWithTabs>
  )
}

const RoleAccountHeader = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

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
