import React from 'react'

import { Account } from '../../../common/types'
import { Option, OptionsListComponent } from '../../selects'
import { OptionAccount } from './OptionAccount'

interface Props {
  options: Account[]
  onChange: (option: Account) => void
}

export const OptionListAccount = React.memo(({ options, onChange }: Props) => (
  <OptionsListComponent>
    {options.map((option) => (
      <Option key={option.address} onClick={() => onChange && onChange(option)}>
        <OptionAccount option={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
