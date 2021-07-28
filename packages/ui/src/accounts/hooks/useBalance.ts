import { toBalances } from '@/accounts/model/toBalances'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'

import { Balances } from '../types'

export const useBalance = (address?: Address): Balances | null => {
  const { api, connectionState } = useApi()

  const balances = useObservable(address ? api?.derive.balances.all(address) : undefined, [connectionState, address])

  if (balances === undefined) {
    return null
  }

  return toBalances(balances)
}
