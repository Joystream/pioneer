import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import styled from 'styled-components'
import { Account } from '../../../common/types'
import { Colors, Sizes } from '../../../constants'
import { useAccounts } from '../../../hooks/useAccounts'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { TokenValue } from '../../typography'
import { OptionListAccount } from './OptionListAccount'
import { filterByText, isValidAddress } from './helpers'
import { useKeyring } from '../../../hooks/useKeyring'

interface Props {
  onChange: (account: Account) => void
  filter?: (account: Account) => boolean
  selected?: Account
}

export const filterAccount = (filterOut: Account | undefined) => {
  return filterOut ? (account: Account) => account.address !== filterOut.address : () => true
}

export const SelectAccount = React.memo(({ onChange, filter, selected }: Props) => {
  const { allAccounts } = useAccounts()
  const options = allAccounts.filter(filter || (() => true))
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Account | undefined>(selected)
  const balance = useBalance(selectedOption)
  const selectNode = useRef<HTMLDivElement>(null)
  const textInput = useRef<HTMLInputElement>(null)

  const [filterInput, setFilterInput] = useState('')
  const filterText = useDebounce(filterInput, 500)
  const filteredOptions = useMemo(() => filterByText(options, filterText), [filterText, options])
  const keyring = useKeyring()

  const onOptionClick = useCallback(
    (option: Account) => {
      setIsOpen(false)
      setSelectedOption(option)
      onChange(option)
      setFilterInput('')
    },
    [filter]
  )

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        setIsOpen(false)
        setFilterInput('')
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false)
        setFilterInput('')
      }
    }
    document.addEventListener('keydown', escListener)

    return () => document.removeEventListener('keydown', escListener)
  }, [isOpen])

  useEffect(() => {
    isOpen && textInput.current?.focus()
  }, [isOpen])

  useEffect(() => {
    filteredOptions.length === 0 &&
      isValidAddress(filterText, keyring) &&
      onOptionClick({ name: 'Unsaved Account', address: filterText })
  }, [filteredOptions])

  return (
    <SelectComponent ref={selectNode}>
      <Toggle onClick={() => !isOpen && setIsOpen(true)} isOpen={isOpen}>
        {selectedOption && !isOpen && (
          <SelectedOption>
            <AccountInfo account={selectedOption} />
            <BalanceInfoInRow>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balance?.transferable} />
              </InfoValue>
            </BalanceInfoInRow>
          </SelectedOption>
        )}
        {(!selectedOption || isOpen) && (
          <Empty
            ref={textInput}
            type={'text'}
            placeholder={'Select account or paste account address'}
            autoComplete="off"
            value={filterInput}
            onChange={(t) => setFilterInput(t.target.value)}
          />
        )}
        <ToggleButton>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {isOpen && <OptionListAccount onChange={onOptionClick} options={filteredOptions} />}
    </SelectComponent>
  )
})

const SelectedOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: ${Sizes.accountSelectHeight};
  max-height: ${Sizes.accountSelectHeight};
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
