import { useEffect, useState, useMemo } from 'react'

import { useAccounts } from '@/accounts/hooks/useAccounts'
import { useBalances } from '@/accounts/hooks/useBalances'
import { useTotalBalances } from '@/accounts/hooks/useTotalBalances'
import { Account } from '@/accounts/types'
import { Address } from '@/common/types'

export const useHasRequiredStake = (stake: number) => {
  const [hasRequiredStake, setHasRequiredStake] = useState<boolean | undefined>(undefined)
  const balances = useBalances()
  const { allAccounts } = useAccounts()
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
      hasRequiredStake !== true &&
      totalTransferableToNumber <= stake &&
      totalLockedToNumber > 0 &&
      totalLockedToNumber + totalTransferableToNumber >= stake
    ) {
      return allAccounts.reduce((accounts, currentAccount) => {
        const subAccounts = allAccounts.filter(
          (subAccount) =>
            balances[subAccount.address] &&
            balances[subAccount.address].locked.toNumber() > 0 &&
            subAccount.address !== currentAccount.address
        )
        if (!subAccounts.length) return { ...accounts }
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
    if (allAccounts.length && hasRequiredStake !== true && totalTransferableToNumber >= stake) {
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
