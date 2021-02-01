import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../../constants'
import { OptionListAccount, OptionListAccountProps } from './OptionListAccount'
import { SelectAccountOption } from './OptionAccount'
import { BalanceInfo, InfoTitle, InfoValue } from '../../../modals/TransferModal/TransferModal'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../TokenValue'
import { useBalances } from '../../../hooks/useBalances'
import { ArrowDownIcon } from '../../icons/ArrowDownIcon'
import { ButtonApply } from '../../../pages/Profile/Accounts'

export function SelectAccount({ options, onChange }: OptionListAccountProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectAccountOption>(options[0])
  const balances = useBalances(selectedOption ? [selectedOption.account] : [])

  const onOptionClick = (option: SelectAccountOption) => {
    setIsOpen(false)
    setSelectedOption(option)
    onChange(option)
  }

  return (
    <SelectComponent>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption && (
          <SelectedOption>
            <AccountInfo account={selectedOption.account} />
            <BalanceInfo>
              <InfoTitle>Total balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balances?.map[selectedOption.account.address]?.total} />
              </InfoValue>
            </BalanceInfo>
          </SelectedOption>
        )}
        {!selectedOption && <Empty>Select account</Empty>}
        <ButtonApply>
          <ArrowDownIcon />
        </ButtonApply>
      </SelectButton>
      {isOpen && <OptionListAccount onChange={onOptionClick} options={options} />}
    </SelectComponent>
  )
}

const SelectedOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: 94px;
  padding: 16px 132px 16px 14px;
`

const Empty = styled.p`
  padding: 16px 14px;
  text-align: left;
`

const SelectComponent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
`

const SelectButton = styled.button`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 0.5em;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  font-size: 1em;
  cursor: pointer;
  transition: ${Transitions.all};

  min-height: 94px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.75em;
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translateY(-50%) scaleY(1);
    transition: ${Transitions.all};
  }

  &:hover,
  &:active,
  &:focus {
  }

  &:active,
  &:focus {
    outline: none;
    &::after {
      transform: translateY(-50%) scaleY(-1);
    }
  }
`
