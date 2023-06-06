import { useEffect, useMemo, useState } from 'react'
import { useApi } from '@/api/hooks/useApi'
import { map } from 'rxjs'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import { BN, u8aToString } from '@polkadot/util'

import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'
import { Verification, State } from '../types'

export const useValidatorsList = () => {
  const { api } = useApi()
  const activeValidatorsAddress = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])
  const [search, setSearch] = useState('')
  const [verification, setVerification] = useState<Verification>(null)
  const [state, setState] = useState<State>(null)
  const allValidators = useFirstObservableValue(
    () =>
      api?.query.staking.validators.entries().pipe(
        map((entry) =>
          entry.map(([key, value]) => {
            const member = false
            const address = encodeAddress(key.args[0])
            const verification = true
            const state = true
            const _totalRewards = api?.derive.staking.stakerRewards(address)
            console.log(_totalRewards)
            const totalRewards = new BN(231231230009088)
            const APR = 12
            const startedOn = Date.now()
            return {
              member,
              address,
              verification,
              state,
              totalRewards,
              APR,
              startedOn,
            }
          })
        )
      ),
    [api?.isConnected]
  )

  const visibleValidators = useMemo(() => {
    return allValidators
  }, [allValidators, search, verification, state])
  return {
    visibleValidators,
    filter: {
      search,
      setSearch,
      verification,
      setVerification,
      state,
      setState,
    },
  }
}