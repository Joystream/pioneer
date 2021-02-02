import React from 'react'
import styled from 'styled-components'
import { Account } from '../../../hooks/types'
import { useBalance } from '../../../hooks/useBalance'
import { BorderRad, Colors, Transitions } from '../../../constants'
import { AccountInfo } from '../../AccountInfo'
import { BalanceInfo, InfoTitle, InfoValue } from '../../../modals/TransferModal/TransferModal'
import { TokenValue } from '../../TokenValue'

export interface SelectAccountOption {
  account: Account
}

interface Props {
  option: SelectAccountOption
  onChange?: (option: SelectAccountOption) => void
}

export function OptionAccount({ option, onChange }: Props) {
  const { account } = option
  const balance = useBalance(account)

  return (
    <OptionComponentContainer>
      <OptionComponent onClick={() => onChange && onChange(option)}>
        <AccountInfo account={account} />
        <BalanceInfo>
          <InfoTitle>Total balance</InfoTitle>
          <InfoValue>
            <TokenValue value={balance?.total} />
          </InfoValue>
        </BalanceInfo>
      </OptionComponent>
    </OptionComponentContainer>
  )
}

export const OptionComponentContainer = styled.li`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

export const OptionComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0.5em;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1em;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.25em;
  transition: ${Transitions.all};
  min-height: 94px;
  padding: 16px 132px 16px 14px;

  &:active,
  &:focus {
    outline: none;
  }
`
