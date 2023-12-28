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

  const validatorRewardPointsHistory = useFirstObservableValue(
    () => api?.query.staking.erasRewardPoints.entries(),
    [api?.isConnected]
  )
  const activeValidators = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])

  const getValidatorInfo = (validator: ValidatorMembership, api: Api): Observable<ValidatorWithDetails> => {
    if (!activeValidators || !validatorRewardPointsHistory) return of()
    const { stashAccount: address, commission } = validator
    const stakingInfo$ = api.query.staking
      .activeEra()
      .pipe(switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)))
    const rewardHistory$ = api.derive.staking.stakerRewards(address)
    const slashingSpans$ = api.query.staking.slashingSpans(address)
    return combineLatest([stakingInfo$, rewardHistory$, slashingSpans$]).pipe(
      map(([stakingInfo, rewardHistory, slashingSpans]) => {
        const apr =
          rewardHistory.length && !stakingInfo.total.toBn().isZero()
            ? last(rewardHistory)
                .eraReward.toBn()
                .muln(ERAS_PER_YEAR)
                .muln(commission)
                .div(stakingInfo.total.toBn())
                .toNumber()
            : 0
        const rewardPointsHistory = validatorRewardPointsHistory.map((entry) => ({
          era: entry[0].args[0].toNumber(),
          rewardPoints: (entry[1].individual.toJSON()[address] ?? 0) as number,
        }))
        return {
          ...validator,
          isActive: activeValidators.includes(address),
          totalRewards: rewardHistory.reduce((total: BN, data) => total.add(data.eraReward), new BN(0)),
          rewardPointsHistory,
          APR: apr,
          slashed: slashingSpans.isSome
            ? slashingSpans.unwrap().prior.length + (slashingSpans.unwrap().lastNonzeroSlash.toNumber() > 0 ? 1 : 0)
            : 0,
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
    () =>
      api && validators && validatorRewardPointsHistory && activeValidators
        ? getValidatorsInfo(api, validators)
        : of([]),
    [api?.isConnected, validators, validatorRewardPointsHistory, activeValidators]
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
            if (isVerified === 'verified') return validator.isVerifiedValidator
            else if (isVerified === 'unverified') return !validator.isVerifiedValidator
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
