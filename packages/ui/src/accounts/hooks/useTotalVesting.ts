import { useMemo } from 'react'
import { combineLatest } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { BN_ZERO } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

const baseTotalVesting = {
  totalVestingLocked: BN_ZERO,
  totalVestedClaimed: BN_ZERO,
  totalVestedClaimable: BN_ZERO,
}

export const useTotalVesting = (): typeof baseTotalVesting => {
  const { api, isConnected } = useApi()
  const { allAccounts } = useMyAccounts()
  const addresses = allAccounts.map((account) => account.address)
  const balancesObs = useMemo(
    () => (api ? addresses.map((address) => api.derive.balances.all(address)) : []),
    [!api, addresses.length]
  )
  const result = useObservable(combineLatest(balancesObs), [isConnected, balancesObs])

  return (
    useMemo(
      () =>
        result?.reduce(
          (prev, next) => ({
            totalVestedClaimed: prev.totalVestedClaimed.add(next.vestingTotal),
            totalVestingLocked: prev.totalVestingLocked.add(next.vestingLocked),
            totalVestedClaimable: prev.totalVestedClaimable.add(next.vestedClaimable),
          }),
          { ...baseTotalVesting }
        ),
      [result]
    ) ?? baseTotalVesting
  )
}
