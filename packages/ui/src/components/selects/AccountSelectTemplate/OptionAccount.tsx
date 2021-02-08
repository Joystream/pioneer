import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Sizes, Transitions } from '../../../constants'
import { Account } from '../../../hooks/types'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfo, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../typography'

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
