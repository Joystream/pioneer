import { BN } from '@polkadot/util'
import { useEffect, useState } from 'react'
import { of, map, switchMap, Observable, combineLatest } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { ERAS_PER_YEAR } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { last } from '@/common/utils'

import { Verification, State, ValidatorWithDetails, ValidatorMembership } from '../types'

import { useValidators } from './useValidators'

export const useValidatorsList = () => {
  const { api } = useApi()
  const [search, setSearch] = useState('')
  const [isVerified, setIsVerified] = useState<Verification>(null)
  const [isActive, setIsActive] = useState<State>(null)
  const [visibleValidators, setVisibleValidators] = useState<ValidatorWithDetails[]>([])
  const { validatorsWithMembership: validators } = useValidators()

  const getValidatorInfo = (validator: ValidatorMembership, api: Api): Observable<ValidatorWithDetails> => {
    const { stashAccount: address, commission } = validator
    const activeValidators$ = api.query.session.validators()
    const stakingInfo$ = api.query.staking
      .activeEra()
      .pipe(switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)))
    const rewardHistory$ = api.derive.staking.stakerRewards(address)
    return combineLatest([activeValidators$, stakingInfo$, rewardHistory$]).pipe(
      map(([activeValidators, stakingInfo, rewardHistory]) => {
        const apr =
          rewardHistory.length && !stakingInfo.total.toBn().isZero()
            ? last(rewardHistory)
                .eraReward.toBn()
                .muln(ERAS_PER_YEAR)
                .muln(commission)
                .div(stakingInfo.total.toBn())
                .toNumber()
            : 0
        const validatorMembership = validators?.find(({ stashAccount }) => stashAccount === address)
        return {
          ...validator,
          isVerified: validatorMembership?.isVerifiedValidator,
          isActive: activeValidators.includes(address),
          totalRewards: rewardHistory.reduce((total: BN, data) => total.add(data.eraReward), new BN(0)),
          APR: apr,
          staking: {
            total: stakingInfo.total.toBn(),
            own: stakingInfo.own.toBn(),
            others: stakingInfo.others.map((nominator) => ({
              address: nominator.who.toString(),
              staking: nominator.value.toBn(),
            })),
          },
        }
      })
    )
  }

  const getValidatorsInfo = (api: Api, validators: ValidatorMembership[]) => {
    const validatorInfoObservables = validators.map((validator) => getValidatorInfo(validator, api))
    return combineLatest(validatorInfoObservables)
  }

  const allValidatorsWithDetails = useFirstObservableValue(
    () => (api && validators ? getValidatorsInfo(api, validators) : of([])),
    [api?.isConnected, validators]
  )

  useEffect(() => {
    if (allValidatorsWithDetails) {
      setVisibleValidators(
        allValidatorsWithDetails
          .filter((validator) => {
            if (isActive === 'active') return validator.isActive
            else if (isActive === 'waiting') return !validator.isActive
            else return true
          })
          .filter((validator) => {
            if (isVerified === 'verified') return validator.isVerified
            else if (isVerified === 'unverified') return !validator.isVerified
            else return true
          })
          .filter((validator) => {
            return (
              encodeAddress(validator.stashAccount).includes(search) || validator.membership?.handle.includes(search)
            )
          })
      )
    }
  }, [allValidatorsWithDetails, search, isVerified, isActive])

  return {
    visibleValidators,
    length: visibleValidators.length,
    filter: {
      search,
      setSearch,
      isVerified,
      setIsVerified,
      isActive,
      setIsActive,
    },
  }
}
