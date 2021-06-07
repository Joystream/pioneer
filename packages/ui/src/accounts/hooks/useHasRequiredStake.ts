import { useEffect, useState, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useBalances } from '@/accounts/hooks/useBalances'
import { useTotalBalances } from '@/accounts/hooks/useTotalBalances'
import { Account } from '@/accounts/types'
import { Address } from '@/common/types'

export const useHasRequiredStake = (stake: number) => {
  const [hasRequiredStake, setHasRequiredStake] = useState<boolean | undefined>(undefined)
  const balances = useBalances()
  const { allAccounts } = useMyAccounts()
  const { transferable: totalTransferable, locked: totalLocked } = useTotalBalances()
  const totalTransferableToNumber = totalTransferable.toNumber()
  const totalLockedToNumber = totalLocked.toNumber()

  useEffect(() => {
    if (Object.keys(balances).length) {
      setHasRequiredStake(
        Object.keys(balances)
          .map((key) => balances[key].transferable)
          .some((value) => value.toNumber() >= stake)
      )
    }
  }, [balances])

  const accountsWithLockedFounds: { [key in Address]: Account[] } | null = useMemo(() => {
    if (
      allAccounts.length &&
      hasRequiredStake === false &&
      totalTransferableToNumber <= stake &&
      totalLockedToNumber > 0 &&
      totalLockedToNumber + totalTransferableToNumber >= stake
    ) {
      return allAccounts.reduce((accounts, currentAccount) => {
        const accountBalance = balances[currentAccount.address]
        const subAccounts = allAccounts.filter(
          (subAccount) =>
            balances[subAccount.address] &&
            balances[subAccount.address].transferable.toNumber() > 0 &&
            subAccount.address !== currentAccount.address
        )
        const totalTransferable = subAccounts.reduce((a, b) => a + balances[b.address].transferable.toNumber(), 0)
        if (
          !subAccounts.length ||
          accountBalance.locked.toNumber() <= 0 ||
          totalTransferable + accountBalance.locked.toNumber() < stake
        )
          return { ...accounts }
        return {
          ...{
            [currentAccount.address]: subAccounts,
          },
          ...accounts,
        }
      }, {})
    }
    return null
  }, [hasRequiredStake, totalTransferableToNumber, totalLockedToNumber, allAccounts])

  const transferableAccounts: Account[] | null = useMemo(() => {
    if (allAccounts.length && hasRequiredStake === false && totalTransferableToNumber >= stake) {
      return allAccounts.filter(
        (account) => balances[account.address] && balances[account.address].transferable.toNumber() > 0
      )
    }
    return null
  }, [hasRequiredStake, totalTransferableToNumber, allAccounts, accountsWithLockedFounds])

  return {
    hasRequiredStake,
    accountsWithLockedFounds,
    transferableAccounts,
  }
}
