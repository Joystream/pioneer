import { BN } from '@polkadot/util'
import { useMemo } from 'react'
import { combineLatest, map, merge, of, scan, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

import { CommonValidatorsQueries } from '../providers/useValidatorsQueries'

type ActiveEra = { eraStartedOn: number; eraStake: BN; eraPoints: number; activeNominatorsCount: number }

export const useStakingStatistics = ({
  activeValidators$,
  validatorsRewards$,
}: Partial<CommonValidatorsQueries> = {}) => {
  const { api } = useApi()

  const activeEra = useObservable<Partial<ActiveEra>>(() => {
    if (!api || !activeValidators$) return

    return api.query.staking.activeEra().pipe(
      switchMap((activeEra) => {
        const eraIndex = activeEra.unwrap().index
        const eraStartedOn = activeEra.unwrap().start.unwrap().toNumber()

        const eraStake$ = api.query.staking.erasTotalStake(eraIndex).pipe(map((eraStake) => ({ eraStake })))

        const eraPoints$ = api.query.staking
          .erasRewardPoints(eraIndex)
          .pipe(map((eraPoints) => ({ eraPoints: eraPoints.total.toNumber() })))

        const activeNominatorsCount$ = activeValidators$.pipe(
          switchMap((activeValidators) => {
            const erasStakers = activeValidators.map((address) => api.query.staking.erasStakers(eraIndex, address))
            return combineLatest(erasStakers)
          }),
          map((stakers) => {
            const nominators = stakers.map((validator) => validator.others.map((nominator) => nominator.who.toString()))
            return { activeNominatorsCount: new Set(nominators?.flat()).size }
          })
        )

        return merge(of({ eraStartedOn }), eraStake$, eraPoints$, activeNominatorsCount$).pipe(
          scan((activeEra, prop) => ({ ...activeEra, ...prop }), {})
        )
      })
    )
  }, [api?.isConnected])

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

  const validatorsRewards = useObservable(() => validatorsRewards$, [validatorsRewards$])

  return {
    eraStartedOn: activeEra?.eraStartedOn,
    eraRewardPoints: activeEra?.eraPoints,
    eraStake: activeEra?.eraStake,
    idealStaking: totalIssuance?.divn(2),
    stakingPercentage,
    activeValidatorsCount,
    activeNominatorsCount: activeEra?.activeNominatorsCount,
    allNominatorsCount,
    totalRewards: validatorsRewards?.reduce((sum, { totalReward }) => sum.add(totalReward), BN_ZERO),
    lastRewards: validatorsRewards?.[0]?.totalReward,
  }
}
