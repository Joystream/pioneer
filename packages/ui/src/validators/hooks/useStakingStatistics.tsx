import { useMemo } from 'react'
import { combineLatest, map, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, ERA_PER_MONTH } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'

import { CommonValidatorsQueries } from '../providers/useValidatorsQueries'

export const useStakingStatistics = ({
  activeEra$,
  activeValidators$,
  stakers$,
  validatorsRewards$,
}: Partial<CommonValidatorsQueries> = {}) => {
  const { api } = useApi()

  const activeEra = useObservable(() => {
    if (!api || !activeEra$) return

    return activeEra$.pipe(
      switchMap((era) => api.query.staking.erasTotalStake(era.index).pipe(map((eraStake) => ({ ...era, eraStake }))))
    )
  }, [api?.isConnected, activeEra$])

  const totalIssuance = useObservable(() => api?.query.balances.totalIssuance(), [api?.isConnected])

  const allNominatorsCount = useObservable(
    () => api?.query.staking.counterForNominators(),
    [api?.isConnected]
  )?.toNumber()

  const stakingPercentage = useMemo(() => {
    const stake = activeEra?.eraStake
    if (!stake || !totalIssuance?.gtn(0)) return 0
    return stake.muln(1000).div(totalIssuance).toNumber() / 10
  }, [activeEra?.eraStake, totalIssuance])

  const activeValidatorsCount = useObservable(() => activeValidators$, [activeValidators$])?.length ?? 0

  const activeNominatorsCount = useObservable(
    () =>
      stakers$?.pipe(
        switchMap((stakers) => combineLatest(Array.from(stakers.values()))),
        map((stakers) => {
          const nominators = stakers.flatMap((staker) => staker.others.map((nominator) => nominator.who.toString()))
          return new Set(nominators).size
        })
      ),
    [stakers$]
  )

  const validatorsRewards = useObservable(() => validatorsRewards$, [validatorsRewards$])

  return {
    eraIndex: activeEra?.index,
    eraStartedOn: activeEra?.startedOn,
    eraStake: activeEra?.eraStake,
    idealStaking: totalIssuance?.divn(2),
    stakingPercentage,
    activeValidatorsCount,
    activeNominatorsCount,
    allNominatorsCount,
    totalRewards: validatorsRewards
      ?.slice(-ERA_PER_MONTH) // Make it explicit that it's per month
      .reduce((sum, { totalReward }) => sum.add(totalReward), BN_ZERO),
    lastRewards: validatorsRewards?.at(-1)?.totalReward,
  }
}
