import { toBalances } from '@/accounts/model/toBalances'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'
import { isDefined } from '@/common/utils'

import { Balances } from '../types'

import { useMyBalances } from './useMyBalances'

export const useBalance = (address: Address = ''): Balances | null => {
  const { api, connectionState } = useApi()

  const allMyBalances = useMyBalances()
  const myBalances = allMyBalances?.[address]

  const balances = useObservable(
    isDefined(allMyBalances) && address && !myBalances ? api?.derive.balances.all(address) : undefined,
    [address, myBalances, connectionState]
  )

  if (balances === undefined) {
    return null
  }

  return toBalances(balances)
}
