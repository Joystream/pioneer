import BN from 'bn.js'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { areLocksConflicting } from '@/accounts/model/lockTypes'
import { LockType } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'

export const useHasRequiredStake = (stake: number, lock: LockType) => {
  const balances = useMyBalances()
  const myAccounts = useMyAccounts()

  const compatibleAccounts = Object.entries(balances).filter(
    ([, balances]) => !areLocksConflicting(lock, balances.locks)
  )

  if (compatibleAccounts.length < 1) {
    return {
      hasRequiredStake: false,
      accountsWithLockedFounds: null,
      transferableAccounts: null,
    }
  }

  const requiredStake = new BN(stake)
  const hasRequiredStake = !!compatibleAccounts.find(([, balances]) => balances.total.gte(requiredStake))

  if (hasRequiredStake) {
    return {
      hasRequiredStake: true,
      accountsWithLockedFounds: null,
      transferableAccounts: null,
    }
  }

  const accountsWithTransferableBalance = Object.entries(balances)
    .filter(([, balances]) => balances.transferable.gt(BN_ZERO))
    .sort(([, balancesA], [, balancesB]) => {
      return balancesB.transferable.sub(balancesA.transferable).toNumber()
    })

  const transferableTotal = accountsWithTransferableBalance.reduce(
    (sum, [, { transferable }]) => sum.add(transferable),
    BN_ZERO
  )

  if (transferableTotal.gte(requiredStake)) {
    return {
      hasRequiredStake: false,
      accountsWithLockedFounds: null,
      transferableAccounts: accountsWithTransferableBalance.map(([address]) =>
        myAccounts.allAccounts.find((account) => account.address === address)
      ),
    }
  }

  const accountsWithLockedFounds = compatibleAccounts.reduce((acc, [compatibleAccountAddress, balances]) => {
    const total = balances.total

    let otherAccountsSum = BN_ZERO
    const otherAccounts = []

    for (const [address, balances] of accountsWithTransferableBalance) {
      if (address !== compatibleAccountAddress) {
        otherAccountsSum = otherAccountsSum.add(balances.transferable)
        otherAccounts.push(address)
      }

      if (otherAccountsSum.add(total).gte(requiredStake)) {
        return {
          ...(acc ?? {}),
          [compatibleAccountAddress]: otherAccounts.map((address) =>
            myAccounts.allAccounts.find((account) => account.address === address)
          ),
        }
      }
    }

    return acc
  }, {})

  return {
    hasRequiredStake,
    accountsWithLockedFounds:
      accountsWithLockedFounds && isEmptyObject(accountsWithLockedFounds) ? null : accountsWithLockedFounds,
    transferableAccounts: null,
  }
}

const isEmptyObject = (someObject: Record<any, any>) => {
  return Object.keys(someObject).length <= 0
}
