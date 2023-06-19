import { BN } from '@polkadot/util'
import { useMemo } from 'react'
import { combineLatest, map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { ERA_DURATION } from '../constants/constant'

export const useStakingStatistics = () => {
  const { api } = useApi()
  const activeEra = useObservable(
    () =>
      api?.query.staking.activeEra().pipe(
        map((activeEra) => ({
          eraIndex: activeEra?.unwrap().index,
          eraStartedOn: activeEra?.unwrap().start,
        }))
      ),
    [api?.isConnected]
  )
  const { eraIndex, eraStartedOn } = useMemo(
    () => activeEra ?? { eraIndex: new BN(0), eraStartedOn: new Date(0) },
    [activeEra, api?.isConnected]
  )
  const now = useObservable(() => api?.query.timestamp.now(), [api?.isConnected])
  const totalIssuance = useObservable(() => api?.query.balances.totalIssuance(), [api?.isConnected])
  const currentStaking = useObservable(() => api?.query.staking.erasTotalStake(eraIndex), [eraIndex, api?.isConnected])
  const activeValidators = useObservable(() => api?.query.session.validators(), [api?.isConnected])
  const stakers = useObservable(() => {
    if (activeValidators && api)
      return combineLatest(activeValidators.map((address) => api.query.staking.erasStakers(eraIndex, address)))
  }, [api?.isConnected, activeValidators, eraIndex])
  const acitveNominators = useMemo(() => {
    const nominators = stakers?.map((validator) => validator.others.map((nominator) => nominator.who.toString()))
    const uniqueNominators = [...new Set(nominators?.flat())]
    return uniqueNominators
  }, [stakers])
  const allValidatorsCount = useObservable(() => api?.query.staking.counterForValidators(), [api?.isConnected])
  const allNominatorsCount = useObservable(() => api?.query.staking.counterForNominators(), [api?.isConnected])
  const lastValidatorRewards = useObservable(
    () => api?.query.staking.erasValidatorReward(eraIndex.sub(new BN(1))),
    [eraIndex, api?.isConnected]
  )
  const totalRewards = useObservable(() => api?.derive.staking.erasRewards(), [api?.isConnected])
  const stakingPercentage = useMemo(
    () => (totalIssuance && currentStaking ? currentStaking.muln(1000).div(totalIssuance).toNumber() / 10 : 0),
    [currentStaking, totalIssuance]
  )
  const eraRewardPoints = useObservable(
    () => api?.query.staking.erasRewardPoints(eraIndex),
    [eraIndex, api?.isConnected]
  )
  return {
    eraStartedOn,
    eraDuration: ERA_DURATION,
    eraRewardPoints,
    now,
    idealStaking: new BN(totalIssuance ?? 0).div(new BN(2)),
    currentStaking: new BN(currentStaking ?? 0),
    stakingPercentage,
    activeValidatorsCount: activeValidators?.length ?? 0,
    acitveNominatorsCount: acitveNominators.length,
    allValidatorsCount: allValidatorsCount?.toNumber() ?? 0,
    allNominatorsCount: allNominatorsCount?.toNumber() ?? 0,
    totalRewards: totalRewards?.reduce((total: BN, reward) => total.add(reward.eraReward), new BN(0)),
    lastRewards: new BN(lastValidatorRewards?.toString() ?? 0),
  }
}
