import React from 'react'

import { Option, OptionsListComponent } from '@/common/components/selects'

import { AccountOption } from '../../types'

import { AccountLockTooltip } from './AccountLockTooltip'
import { OptionAccount } from './OptionAccount'

interface Props {
  options: AccountOption[]
  onChange: (option: AccountOption) => void
  className?: string
  isForStaking?: boolean
  isSmallVariant?: boolean
}

export const OptionListAccount = React.memo(({ options, onChange, className, isForStaking, isSmallVariant }: Props) => {
  const freeAccounts = options.filter((option) => (option.optionLocks ? option.optionLocks?.length === 0 : true))
  const lockedAccounts = options.filter((option) => !!option.optionLocks?.length)
  return (
    <OptionsListComponent className={className}>
      {freeAccounts.map((option) => (
        <Option key={option.address} onClick={() => onChange && onChange(option)} isSmallVariant={isSmallVariant}>
          <OptionAccount option={option} isForStaking={isForStaking} />
        </Option>
      ))}
      {lockedAccounts.map((option) => (
        <AccountLockTooltip boundaryClassName={className} key={option.address} locks={option.optionLocks}>
          <Option
            key={option.address}
            onClick={() => onChange && onChange(option)}
            disabled
            isSmallVariant={isSmallVariant}
          >
            <OptionAccount option={option} isForStaking={isForStaking} />
          </Option>
        </AccountLockTooltip>
      ))}
    </OptionsListComponent>
  )
})
