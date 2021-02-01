import React from 'react'
import styled from 'styled-components'
import { Account } from '../../../hooks/types'
import { useBalances } from '../../../hooks/useBalances'
import { Transitions } from '../../../constants'
import { AccountInfo } from '../../AccountInfo'
import { AccountRow, InfoTitle, InfoValue, TransactionInfoRow } from '../../../modals/TransferModal/TransferModal'
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
  const balances = useBalances([account])

  return (
    <OptionComponentContainer>
      <OptionComponent onClick={() => onChange && onChange(option)}>
        <AccountRow>
          <AccountInfo account={account} />
          <TransactionInfoRow>
            <InfoTitle>Total balance</InfoTitle>
            <InfoValue>
              <TokenValue value={balances?.map[account.address]?.total} />
            </InfoValue>
          </TransactionInfoRow>
        </AccountRow>
      </OptionComponent>
    </OptionComponentContainer>
  )
}

export const OptionComponentContainer = styled.li`
  display: flex;
  widht: 100%;
  height: 100%;
`

export const OptionComponent = styled.button`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-column-gap: 0.5em;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 1em;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.25em;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
  }
  &:active,
  &:focus {
    outline: none;
  }
`
