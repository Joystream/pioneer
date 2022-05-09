import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

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

interface Props extends Pick<SelectProps<Account>, 'id' | 'selected' | 'disabled' | 'onBlur'> {
  onChange?: (selected: Account) => void
  filter?: (option: Account) => boolean
  minBalance?: BN
  name?: string
}

export const BaseSelectAccount = React.memo(({ id, onChange, filter, selected, disabled, onBlur }: Props) => {
  const { allAccounts } = useMyAccounts()
  const options = allAccounts.filter(filter || (() => true))

  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => filterByText(options, search), [search, options])
  const keyring = useKeyring()

  useEffect(() => {
    filteredOptions.length === 0 &&
      isValidAddress(search, keyring) &&
      (!selected || selected.address !== search) &&
      onChange?.(accountOrNamed(allAccounts, search, 'Unsaved account'))
  }, [filteredOptions, search, selected])

  const change = (selected: Account, close: () => void) => {
    onChange?.(selected)
    close()
  }

  return (
    <Select
      id={id}
      selected={selected}
      onChange={change}
      onBlur={onBlur}
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

export const SelectAccount = ({ name, ...props }: Props) => {
  const form = useFormContext()

  if (!form || !name) {
    return <BaseSelectAccount {...props} />
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <BaseSelectAccount {...props} selected={field.value} onChange={field.onChange} onBlur={field.onBlur} />
      )}
    />
  )
}
