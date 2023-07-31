import { BN } from '@polkadot/util'
import { useEffect, useState } from 'react'
import { of, map, switchMap, Observable, combineLatest } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { ProxyApi } from '@/proxyApi'

import { Verification, State, Validator } from '../types'

export const useValidatorsList = () => {
  const { api } = useApi()
  const [search, setSearch] = useState('')
  const [verification, setVerification] = useState<Verification>(null)
  const [state, setState] = useState<State>(null)
  const [visibleValidators, setVisibleValidators] = useState<Validator[]>([])

  const getValidatorInfo = (address: string, api: ProxyApi): Observable<Validator> => {
    const activeValidators$ = api.query.session.validators()
    const stakingInfo$ = api.query.staking
      .activeEra()
      .pipe(switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)))
    const rewardHistory$ = api.derive.staking.stakerRewards(address)
    const validatorInfo$ = api.query.staking.validators(address)
    return combineLatest([activeValidators$, stakingInfo$, rewardHistory$, validatorInfo$]).pipe(
      map(([activeValidators, stakingInfo, rewardHistory, validatorInfo]) => {
        return {
          address: encodeAddress(address),
          verification: Math.random() > 0.5,
          state: activeValidators.includes(address),
          totalRewards: rewardHistory.reduce((total: BN, data) => total.add(data.eraReward), new BN(0)),
          APR:
            rewardHistory.length === 0 || stakingInfo.total.toBn().isZero()
              ? 0
              : new BN(rewardHistory[rewardHistory.length - 1].eraReward)
                  .mul(new BN(1460 * 100))
                  .mul(validatorInfo.commission.toBn())
                  .div(new BN('1000000000'))
                  .div(stakingInfo.total.toBn())
                  .toNumber(),
          startedOn: Date.now(),
        }
      })
    )
  }

  const getValidatorsInfo = (api: ProxyApi) => {
    return api.query.staking.validators.entries().pipe(
      switchMap((entries) => {
        const validatorAddresses = entries.map((entry) => entry[0].args[0].toString())
        const validatorInfoObservables = validatorAddresses.map((address) => getValidatorInfo(address, api))
        return combineLatest(validatorInfoObservables)
      })
    )
  }

  const allValidators = useFirstObservableValue(() => (api ? getValidatorsInfo(api) : of([])), [api?.isConnected])

  useEffect(() => {
    if (allValidators) {
      setVisibleValidators(
        allValidators
          .filter((validator) => {
            if (state === 'active') return validator.state
            else if (state === 'waiting') return !validator.state
            else return true
          })
          .filter((validator) => {
            if (verification === 'verified') return validator.verification
            else if (verification === 'unverified') return !validator.verification
            else return true
          })
          .filter((validator) => {
            return validator.address.includes(search)
          })
      )
    }
  }, [allValidators, search, verification, state])

  return {
    visibleValidators,
    length: visibleValidators.length,
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
