import React, { useEffect, useMemo, useState } from 'react'
import { Account } from '../../../common/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { useKeyring } from '../../../hooks/useKeyring'
import { Select } from '../../selects'
import { filterByText, isValidAddress } from './helpers'
import { OptionAccount } from './OptionAccount'
import { OptionListAccount } from './OptionListAccount'

export const filterAccount = (filterOut: Account | undefined) => {
  return filterOut ? (account: Account) => account.address !== filterOut.address : () => true
}

interface Props {
  onChange: (selected: Account) => void
  filter?: (option: Account) => boolean
  selected?: Account
  disabled?: boolean
}

export const SelectAccount = React.memo(({ onChange, filter, selected }: Props) => {
  const { allAccounts } = useAccounts()
  const options = allAccounts.filter(filter || (() => true))
  const [selectedOption, setSelectedOption] = useState(selected)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => filterByText(options, search), [search, options])
  const keyring = useKeyring()

  useEffect(() => {
    filteredOptions.length === 0 &&
      isValidAddress(search, keyring) &&
      (!selectedOption || selectedOption.address !== search) &&
      setSelectedOption({ name: 'Unsaved Account', address: search })
  }, [filteredOptions, search, selectedOption])

  return (
    <Select
      selected={selectedOption}
      onChange={onChange}
      disabled={false}
      renderSelected={(option) => <OptionAccount option={option} />}
      placeholder="Select account or paste account address"
      renderList={(onOptionClick) => <OptionListAccount onChange={onOptionClick} options={filteredOptions} />}
      onSearch={(search) => setSearch(search)}
    />
  )
})
