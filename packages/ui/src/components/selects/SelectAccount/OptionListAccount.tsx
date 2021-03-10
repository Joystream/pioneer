import React from 'react'
import { Account } from '../../../common/types'
import { Option, OptionsListComponent } from '../selects'
import { OptionListProps } from '../types'
import { OptionAccount } from './OptionAccount'

export const OptionListAccount = React.memo(({ options, onChange }: OptionListProps<Account>) => (
  <OptionsListComponent>
    {options.map((option) => (
      <Option key={option.address} onClick={() => onChange && onChange(option)}>
        <OptionAccount account={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
