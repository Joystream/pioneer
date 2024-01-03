import { useEffect, useMemo, useState } from 'react'
import { firstValueFrom } from 'rxjs'

import { toBalances } from '@/accounts/model/toBalances'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { Address } from '@/common/types'
import { isDefined } from '@/common/utils'

import { AddressToBalanceMap, Balances } from '../types'

import { useMyBalances } from './useMyBalances'

export const useBalance = (address: Address = ''): Balances | null => {
  const { api } = useApi()

  const allMyBalances = useMyBalances()
  const myBalances = allMyBalances?.[address]

  const balances = useFirstObservableValue(() => {
    return isDefined(allMyBalances) && address && !myBalances ? api?.derive.balances.all(address) : undefined
  }, [address, !myBalances])

  if (myBalances) {
    return myBalances
  }

  return balances ? toBalances(balances) : null
}

export const useBalances = (addresses: Address[] | undefined): Map<string, Balances | undefined> => {
  const { api } = useApi()
  const allMyBalances = useMyBalances()

  const [definedBalances, setDefinedBalances] = useState(new Map<string, Balances>())
  useEffect(() => {
    addresses?.forEach((address) => {
      if (definedBalances.has(address)) return
      addressToBalances(api, allMyBalances, address).then((balances) => {
        if (balances) setDefinedBalances((entries) => new Map([...entries.entries(), [address, balances]]))
      })
    })
  }, [api, allMyBalances, addresses])

  return useMemo(() => new Map(addresses?.map((address) => [address, definedBalances.get(address)])), [definedBalances])
}

const addressToBalances = async (
  api: Api | undefined,
  allMyBalances: AddressToBalanceMap | undefined,
  address: string
): Promise<Balances | undefined> => {
  if (!allMyBalances) return
  const myBalances = allMyBalances[address]
  if (myBalances) return myBalances

  if (!api) return
  return toBalances(await firstValueFrom(api.derive.balances.all(address)))
}
