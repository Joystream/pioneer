import React from 'react'

import { Option, OptionsListComponent } from '../../../common/components/selects'
import { Account } from '../../../common/types'
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
