import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors, Sizes } from '../../../constants'
import { Account } from '../../../hooks/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfo, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { TokenValue } from '../../typography'
import { OptionListAccount } from './OptionListAccount'

interface Props {
  onChange: (account: Account) => void
  filter?: (account: Account) => boolean
}

export const filterAccount = (filterOut: Account | undefined) => {
  return filterOut ? (account: Account) => account.address !== filterOut.address : () => true
}

export function SelectAccount({ onChange, filter }: Props) {
  const { allAccounts } = useAccounts()
  const options = allAccounts.filter(filter || (() => true))
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Account>(options[0])
  const balance = useBalance(selectedOption)

  const onOptionClick = (option: Account) => {
    setIsOpen(false)
    setSelectedOption(option)
    onChange(option)
  }

  return (
    <SelectComponent>
      <Toggle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {selectedOption && (
          <SelectedOption>
            <AccountInfo account={selectedOption} />
            <BalanceInfo>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balance?.transferable} />
              </InfoValue>
            </BalanceInfo>
          </SelectedOption>
        )}
        {!selectedOption && <Empty type={'text'} placeholder={'Select account or paste account address'} />}
        <ToggleButton>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {isOpen && <OptionListAccount onChange={onOptionClick} options={options} />}
    </SelectComponent>
  )
}

const SelectedOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: ${Sizes.accountSelectHeight};
  padding: 10px 28px 10px 16px;
`

const Empty = styled.input`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  width: 100%;
  height: 100%;
  padding: 16px;
  border: none;
  outline: none;

  &::placeholder {
    font-size: 14px;
    line-height: 45px;
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
`

const SelectComponent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
`
