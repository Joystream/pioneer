import { toBalances } from '@/accounts/model/toBalances'
import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'

import { Balances } from '../types'

import { useMyBalances } from './useMyBalances'

export const useBalance = (address?: Address): Balances | null => {
  const { api, connectionState } = useApi()
  const allMyBalances = useMyBalances()
  const myBalances = address && allMyBalances[address]

  const balances = useObservable(!myBalances && address ? api?.derive.balances.all(address) : undefined, [
    connectionState,
    address,
  ])

  if (myBalances) {
    return myBalances
  }

  return balances ? toBalances(balances) : null
}
