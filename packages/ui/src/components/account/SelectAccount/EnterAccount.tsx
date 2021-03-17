import React, { useEffect, useState } from 'react'
import { Account } from '../../../common/types'
import { useKeyring } from '../../../hooks/useKeyring'
import { Select } from '../../selects'
import { isValidAddress } from './helpers'
import { OptionAccount } from './OptionAccount'

interface Props {
  onChange: (selected: Account) => void
  selected?: Account
  disabled?: boolean
  name: string
}

export const EnterAccount = React.memo(({ onChange, selected, name }: Props) => {
  const [selectedOption, setSelectedOption] = useState(selected)
  const [search, setSearch] = useState('')
  const keyring = useKeyring()

  useEffect(() => {
    isValidAddress(search, keyring) && setSelectedOption({ name, address: search })
  }, [search])

  return (
    <Select
      selected={selectedOption}
      onChange={onChange}
      disabled={false}
      renderSelected={(option) => <OptionAccount option={option} />}
      placeholder="Type or paste account address"
      renderList={() => undefined}
      onSearch={(search) => setSearch(search)}
    />
  )
})
