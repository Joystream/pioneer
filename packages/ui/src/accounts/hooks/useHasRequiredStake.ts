import { useEffect, useState, useMemo } from 'react'

import { useAccounts } from '@/accounts/hooks/useAccounts'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useBalances } from '@/accounts/hooks/useBalances'
import { useTotalBalances } from '@/accounts/hooks/useTotalBalances'
import { Account } from '@/accounts/types'
import { Address } from '@/common/types'

export const useHasRequiredStake = (address: Address, stake: number) => {
  const [hasRequiredStake, setHasRequiredStake] = useState<boolean | undefined>(undefined)
  const balance = useBalance(address)
  const balances = useBalances()
  const { allAccounts } = useAccounts()
  const { transferable: totalTransferable, locked: totalLocked } = useTotalBalances()
  const transferable = balance?.transferable
  const totalTransferableToNumber = totalTransferable.toNumber()
  const totalLockedToNumber = totalLocked.toNumber()

  useEffect(() => {
    if (transferable) {
      setHasRequiredStake(transferable.toNumber() >= stake)
    }
  }, [transferable])

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
