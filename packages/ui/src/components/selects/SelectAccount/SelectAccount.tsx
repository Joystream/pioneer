import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Account } from '../../../common/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { useBalance } from '../../../hooks/useBalance'
import { useDebounce } from '../../../hooks/useDebounce'
import { useKeyring } from '../../../hooks/useKeyring'
import { useToggle } from '../../../hooks/useToggle'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { TokenValue } from '../../typography'
import { EmptyOption, SelectComponent, SelectedOption } from '../selects'
import { filterByText, isValidAddress } from './helpers'
import { OptionListAccount } from './OptionListAccount'

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
  const [isOpen, toggleOpen] = useToggle()
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
      toggleOpen()
      setSelectedOption(option)
      onChange(option)
      setFilterInput('')
    },
    [filter, toggleOpen]
  )

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        toggleOpen()
        setFilterInput('')
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        toggleOpen()
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
      <Toggle onClick={toggleOpen} isOpen={isOpen}>
        {selectedOption && (
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
          <EmptyOption
            ref={textInput}
            type="text"
            placeholder="Select account or paste account address"
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
