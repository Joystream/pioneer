import { toBalances } from '@/accounts/model/toBalances'
import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { Address } from '@/common/types'
import { isDefined } from '@/common/utils'

import { Balances } from '../types'

import { useMyBalances } from './useMyBalances'

export const useBalance = (address: Address = ''): Balances | null => {
  const { api } = useApi()

  const allMyBalances = useMyBalances()
  const myBalances = allMyBalances?.[address]

  const balances = useFirstObservableValue(
    () => (isDefined(allMyBalances) && address && !myBalances ? api?.derive.balances.all(address) : undefined),
    [address, !myBalances]
  )

  if (myBalances) {
    return myBalances
  }

  return balances ? toBalances(balances) : null
}
