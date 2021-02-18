import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Sizes, Transitions } from '../../../constants'
import { Account } from '../../../common/types'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../typography'

interface Props {
  account: Account
  onChange?: (account: Account) => void
}

export function OptionAccount({ account, onChange }: Props) {
  const balance = useBalance(account)

  return (
    <OptionComponentContainer onClick={() => onChange && onChange(account)}>
      <OptionComponent>
        <AccountInfo account={account} />
        <BalanceInfoInRow>
          <InfoTitle>Transferable balance</InfoTitle>
          <InfoValue>
            <TokenValue value={balance?.transferable} />
          </InfoValue>
        </BalanceInfoInRow>
      </OptionComponent>
    </OptionComponentContainer>
  )
}

export const OptionComponentContainer = styled.li`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: transparent;
`

export const OptionComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: ${Colors.White};
  cursor: pointer;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  min-height: ${Sizes.accountSelectHeight};
  padding: 10px 72px 10px 16px;

  &:active,
  &:focus {
    outline: none;
  }
`
