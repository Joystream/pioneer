import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { filterAccounts } from '@/accounts/model/filterAccounts'
import { useKeyring } from '@/common/hooks/useKeyring'
import { Address } from '@/common/types'

import { Select, SelectedOption, SelectProps } from '../../../common/components/selects'
import { useMyAccounts } from '../../hooks/useMyAccounts'
import { accountOrNamed } from '../../model/accountOrNamed'
import { isValidAddress } from '../../model/isValidAddress'
import { Account } from '../../types'

import { filterByText } from './helpers'
import { OptionAccount } from './OptionAccount'
import { OptionListAccount } from './OptionListAccount'

export const filterAccount = (filterOut: Account | Address | undefined) => {
  const filterOutAddress = typeof filterOut === 'string' ? filterOut : filterOut?.address
  return filterOut ? (account: Account) => account.address !== filterOutAddress : () => true
}

interface Props extends Pick<SelectProps<Account>, 'id' | 'selected' | 'disabled'> {
  onChange: (selected: Account) => void
  filter?: (option: Account) => boolean
  minBalance?: BN
}

export const SelectAccount = React.memo(({ id, onChange, filter, selected, disabled }: Props) => {
  const { allAccounts } = useMyAccounts()
  const balances = useMyBalances()
  const options = useMemo(() => filterAccounts(allAccounts, false, balances).filter(filter || (() => true)), [
    balances,
    allAccounts,
    filter,
  ])

  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => filterByText(options, search), [search, options])
  const keyring = useKeyring()

  useEffect(() => {
    filteredOptions.length === 0 &&
      isValidAddress(search, keyring) &&
      (!selected || selected.address !== search) &&
      onChange(accountOrNamed(allAccounts, search, 'Unsaved account'))
  }, [filteredOptions, search, selected])

  const change = (selected: Account, close: () => void) => {
    onChange(selected)
    close()
  }

  return (
    <Select
      id={id}
      selected={selected}
      onChange={change}
      disabled={disabled}
      renderSelected={renderSelected}
      placeholder="Select account or paste account address"
      renderList={(onOptionClick) => <OptionListAccount onChange={onOptionClick} options={filteredOptions} />}
      onSearch={(search) => setSearch(search)}
    />
  )
})

const renderSelected = (option: Account) => (
  <SelectedOption>
    <OptionAccount option={option} />
  </SelectedOption>
)
