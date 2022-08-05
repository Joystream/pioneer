import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { filterByText } from '@/accounts/components/SelectAccount/helpers'
import { InfoValueWithLocks } from '@/accounts/components/SelectAccount/OptionAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { isValidAddress } from '@/accounts/model/isValidAddress'
import { Account, AccountOption } from '@/accounts/types'
import { VestingLockIcon } from '@/common/components/icons/locks/VestingLockIcon'
import { BalanceInfoInRow } from '@/common/components/Modal'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Option, OptionsListComponent, Select, SelectedOption } from '@/common/components/selects'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useKeyring } from '@/common/hooks/useKeyring'

interface SelectVestingAccountProps {
  selected?: Account
  onChange: (account: Account) => void
  id?: string
  disabled?: boolean
}

export const SelectVestingAccount = ({ selected, onChange, id, disabled }: SelectVestingAccountProps) => {
  const { allAccounts: options } = useMyAccounts()
  const selectedVesting = useBalance(selected?.address)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => filterByText(options, search), [search, options])
  const keyring = useKeyring()

  const notSelected = !selected || selected?.address !== search

  useEffect(() => {
    if (filteredOptions.length === 0 && isValidAddress(search, keyring) && notSelected) {
      onChange?.(accountOrNamed(options, search, 'Unsaved account'))
    }
  }, [filteredOptions, search, notSelected])

  const change = (selected: AccountOption, close: () => void) => {
    onChange?.(selected)
    close()
  }

  return (
    <Select
      id={id}
      selected={selected}
      onChange={change}
      disabled={disabled}
      renderSelected={(option) => (
        <SelectedOption>
          <VestingListItem option={option} vestingClaimable={selectedVesting?.vestedClaimable} />
        </SelectedOption>
      )}
      placeholder="Select account or paste account address"
      renderList={(onOptionClick) => (
        <OptionsListComponent>
          {filteredOptions.map((option) => (
            <OptionVesting key={option.name + 'vesting'} option={option} onClick={onOptionClick} />
          ))}
        </OptionsListComponent>
      )}
      onSearch={(search) => setSearch(search)}
    />
  )
}

const OptionVesting = ({ option, onClick }: { option: AccountOption; onClick?: (option: AccountOption) => void }) => {
  const vesting = useBalance(option.address)

  if (!vesting || vesting.vestedClaimable.lten(0)) {
    return null
  }

  return (
    <Option onClick={() => onClick?.(option)}>
      <VestingListItem option={option} vestingClaimable={vesting.vestedClaimable} />
    </Option>
  )
}

export const VestingListItem = ({ option, vestingClaimable }: { option: AccountOption; vestingClaimable?: BN }) => (
  <>
    <AccountInfo account={option} />
    <VestingInfoRow>
      <ColumnGapBlock gap={5}>
        <VestingLockIcon />
        <TextMedium bold>Vesting</TextMedium>
      </ColumnGapBlock>
      <InfoValueWithLocks>
        <TokenValue value={vestingClaimable} />
      </InfoValueWithLocks>
    </VestingInfoRow>
  </>
)

const VestingInfoRow = styled(BalanceInfoInRow)`
  width: 100%;
`
