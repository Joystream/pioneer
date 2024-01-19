import { BN } from '@polkadot/util'
import { useMemo } from 'react'
import { combineLatest, map, merge, of, scan, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

import { CommonValidatorsQueries } from '../providers/useValidatorsQueries'

type ActiveEra = { index: number; startedOn: number; eraStake: BN; eraPoints: number }

export const useStakingStatistics = ({
  activeEra$,
  activeValidators$,
  stakers$,
  validatorsRewards$,
}: Partial<CommonValidatorsQueries> = {}) => {
  const { api } = useApi()

  const activeEra = useObservable<Partial<ActiveEra>>(() => {
    if (!api || !activeEra$) return

    return activeEra$.pipe(
      switchMap((era) => {
        const eraStake$ = api.query.staking.erasTotalStake(era.index).pipe(map((eraStake) => ({ eraStake })))

        const eraPoints$ = api.query.staking
          .erasRewardPoints(era.index)
          .pipe(map((eraPoints) => ({ eraPoints: eraPoints.total.toNumber() })))

        return merge(of(era), eraStake$, eraPoints$)
      }),
      scan((activeEra, prop) => ({ ...activeEra, ...prop }), {})
    )
  }, [api?.isConnected, activeEra$])

  const totalIssuance = useFirstObservableValue(() => api?.query.balances.totalIssuance(), [api?.isConnected])

  const allNominatorsCount = useFirstObservableValue(
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
    eraRewardPoints: activeEra?.eraPoints,
    eraStake: activeEra?.eraStake,
    idealStaking: totalIssuance?.divn(2),
    stakingPercentage,
    activeValidatorsCount,
    activeNominatorsCount,
    allNominatorsCount,
    totalRewards: validatorsRewards?.reduce((sum, { totalReward }) => sum.add(totalReward), BN_ZERO),
    lastRewards: validatorsRewards?.at(-1)?.totalReward,
  }
}
