import { BN } from '@polkadot/util'
import { of, map, switchMap, Observable, combineLatest } from 'rxjs'

import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { ERAS_PER_YEAR } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { last } from '@/common/utils'

import { ValidatorWithDetails, ValidatorMembership } from '../types'

type Props = { validatorWithMemberships: ValidatorMembership[]; skip: boolean }
export const useExtraValidatorDetails = ({ validatorWithMemberships: validators, skip }: Props) => {
  const { api } = useApi()

  const validatorRewardPointsHistory = useFirstObservableValue(
    () => (skip ? undefined : api?.query.staking.erasRewardPoints.entries()),
    [api?.isConnected, skip]
  )
  const activeValidators = useFirstObservableValue(
    () => (skip ? undefined : api?.query.session.validators()),
    [api?.isConnected, skip]
  )

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

  return allValidatorsWithDetails
}
