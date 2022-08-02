import { DeriveBalancesAll } from '@polkadot/api-derive/types'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const useVesting = (address: string) => {
  const { api, connectionState } = useApi()

  const balances = useObservable(address ? api?.derive.balances.all(address) : undefined, [connectionState, address])
  if (balances === undefined) {
    return null
  }

  return asVesting(balances)
}

export type Vesting = Pick<DeriveBalancesAll, 'vesting' | 'vestingTotal' | 'vestedBalance' | 'vestedClaimable'>

const asVesting = (balances: DeriveBalancesAll): Vesting => ({
  vesting: balances.vesting,
  vestingTotal: balances.vestingTotal,
  vestedClaimable: balances.vestedClaimable,
  vestedBalance: balances.vestedBalance,
})
