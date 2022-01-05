import React, { useMemo } from 'react'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { conflictingLocks } from '@/accounts/model/lockTypes'
import { Account, AddressToBalanceMap, LockType } from '@/accounts/types'
import { BalanceInfoInRow, InfoTitle, InfoValue, ItemWrapper } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Address } from '@/common/types'

import { AccountMoveFundsLocks } from './AccountMoveFundsLocks'
import { MemberRow } from './styles'

interface MemberRowsListProps {
  accounts: Address[]
  balances: AddressToBalanceMap
  lock?: LockType
}

export const MemberRowsList = ({ accounts, balances, lock }: MemberRowsListProps) => {
  const { allAccounts } = useMyAccounts()

  const accountsWithIncompatibleLocks = useMemo(
    () =>
      Object.entries(balances)
        .map(([address, balances]) => ({
          address: address,
          locks: conflictingLocks(lock ?? 'Proposals', balances.locks),
        }))
        .filter((el) => el.locks.length),
    [balances]
  )

  const addressesWithIncompatibleLocks = useMemo(
    () => accountsWithIncompatibleLocks.map((account) => account.address),
    [accountsWithIncompatibleLocks]
  )

  return (
    <ItemWrapper>
      {accounts.map((address) => (
        <MemberRow key={address}>
          <AccountInfo account={allAccounts.find((account) => account.address === address) as Account} />
          <BalanceInfoInRow>
            <InfoTitle>
              <AccountMoveFundsLocks
                address={address}
                addressesWithIncompatibleLocks={addressesWithIncompatibleLocks}
                accountsWithIncompatibleLocks={accountsWithIncompatibleLocks}
              />
            </InfoTitle>
            <InfoValue>
              <TokenValue value={balances[address] && balances[address].transferable} />
            </InfoValue>
          </BalanceInfoInRow>
        </MemberRow>
      ))}
    </ItemWrapper>
  )
}
