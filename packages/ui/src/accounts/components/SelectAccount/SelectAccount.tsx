import React, { useEffect, useMemo, useState } from 'react'

import { Select } from '../../../common/components/selects'
import { useKeyring } from '../../../common/hooks/useKeyring'
import { Account, Address } from '../../../common/types'
import { useAccounts } from '../../hooks/useAccounts'
import { accountOrNamed } from '../../model/accountOrNamed'
import { isValidAddress } from '../../model/isValidAddress'
import { filterByText } from './helpers'
import { OptionAccount } from './OptionAccount'
import { OptionListAccount } from './OptionListAccount'

export const filterAccount = (filterOut: Account | Address | undefined) => {
  const filterOutAddress = typeof filterOut === 'string' ? filterOut : filterOut?.address
  return filterOut ? (account: Account) => account.address !== filterOutAddress : () => true
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
      setSelectedOption(accountOrNamed(allAccounts, search, 'Unsaved account'))
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
