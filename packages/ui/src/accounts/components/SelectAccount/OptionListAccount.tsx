import React from 'react'

import { Option, OptionsListComponent } from '../../../common/components/selects'
import { AccountOption } from '../../types'

import { OptionAccount } from './OptionAccount'

interface Props {
  options: AccountOption[]
  onChange: (option: AccountOption) => void
}

export const OptionListAccount = React.memo(({ options, onChange }: Props) => (
  <OptionsListComponent>
    {options.map((option) => (
      <Option key={option.address} onClick={() => onChange && onChange(option)} disabled={!!option.optionLocks?.length}>
        <OptionAccount option={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
