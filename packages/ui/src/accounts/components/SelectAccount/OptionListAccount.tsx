import React from 'react'

import { Option, OptionsListComponent } from '../../../common/components/selects'
import { AccountOption } from '../../types'

import { AccountLockTooltip } from './AccountLockTooltip'
import { OptionAccount } from './OptionAccount'

interface Props {
  options: AccountOption[]
  onChange: (option: AccountOption) => void
}

export const OptionListAccount = React.memo(({ options, onChange }: Props) => {
  const freeAccounts = options.filter((option) => (option.optionLocks ? option.optionLocks?.length === 0 : true))
  const lockedAccounts = options.filter((option) => !!option.optionLocks?.length)
  return (
    <OptionsListComponent>
      {freeAccounts.map((option) => (
        <Option key={option.address} onClick={() => onChange && onChange(option)}>
          <OptionAccount option={option} />
        </Option>
      ))}
      {lockedAccounts.map((option) => (
        <AccountLockTooltip locks={option.optionLocks}>
          <Option key={option.address} onClick={() => onChange && onChange(option)} disabled>
            <OptionAccount option={option} />
          </Option>
        </AccountLockTooltip>
      ))}
    </OptionsListComponent>
  )
})
