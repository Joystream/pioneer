import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Sizes, Transitions } from '../../../constants'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfo, InfoTitle, InfoValue } from '../../../modals/common'
import { ButtonApply } from '../../../pages/Profile/Accounts'
import { AccountInfo } from '../../AccountInfo'
import { ArrowDownIcon } from '../../icons/ArrowDownIcon'
import { TokenValue } from '../../TokenValue'
import { SelectAccountOption } from './OptionAccount'
import { OptionListAccount, OptionListAccountProps } from './OptionListAccount'

export function SelectAccount({ options, onChange }: OptionListAccountProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectAccountOption>(options[0])
  const balance = useBalance(selectedOption?.account)

  const onOptionClick = (option: SelectAccountOption) => {
    setIsOpen(false)
    setSelectedOption(option)
    onChange(option)
  }

  return (
    <SelectComponent>
      <SelectButton onClick={() => setIsOpen(!isOpen)} isListOpen={isOpen}>
        {selectedOption && (
          <SelectedOption>
            <AccountInfo account={selectedOption.account} />
            <BalanceInfo>
              <InfoTitle>Total balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balance?.total} />
              </InfoValue>
            </BalanceInfo>
          </SelectedOption>
        )}
        {!selectedOption && <Empty type={'text'} placeholder={'Select account or paste account address'} />}
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
  min-height: ${Sizes.accountSelect};
  padding: 16px 132px 16px 14px;
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
    line-height: 20px;
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

interface OpenListProps {
  isListOpen: boolean
}

const SelectButton = styled.div<OpenListProps>`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 0.5em;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: ${Sizes.accountSelect};
  margin: 0;
  padding: 0;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  font-size: 1em;
  cursor: pointer;
  transition: ${Transitions.all};

  ${ButtonApply} svg {
    transition: ${Transitions.all};
    transform: scaleY(${(props) => (props.isListOpen ? '-1' : '1')});
  }

  &:hover {
    border-color: ${Colors.Blue[200]};
  }

  &:focus-within,
  &:active,
  &:focus {
    border-color: ${Colors.Blue[300]};
  }
`
