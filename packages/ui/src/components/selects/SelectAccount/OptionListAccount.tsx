import React from 'react'
import { Account } from '../../../common/types'
import { OptionsListComponent } from '../selects'
import { OptionListProps } from '../types'
import { OptionAccount } from './OptionAccount'

export const OptionListAccount = React.memo(({ options, onChange }: OptionListProps<Account>) => (
  <OptionsListComponent>
    {options.map((account) => (
      <OptionAccount key={account.address} account={account} onChange={onChange} />
    ))}
  </OptionsListComponent>
))
