import { BN } from '@polkadot/util'
import { useMemo } from 'react'
import { combineLatest, map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

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

  const totalIssuance = useFirstObservableValue(() => api?.query.balances.totalIssuance(), [api?.isConnected])
  const currentStaking = useFirstObservableValue(
    () => activeEra && api && api.query.staking.erasTotalStake(activeEra.eraIndex),
    [api?.isConnected, activeEra]
  )
  const activeValidators = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])
  const stakers = useFirstObservableValue(
    () =>
      activeValidators &&
      api &&
      activeEra &&
      combineLatest(activeValidators.map((address) => api.query.staking.erasStakers(activeEra.eraIndex, address))),
    [api?.isConnected, activeEra, activeValidators]
  )
  const acitveNominators = useMemo(() => {
    const nominators = stakers?.map((validator) => validator.others.map((nominator) => nominator.who.toString()))
    const uniqueNominators = [...new Set(nominators?.flat())]
    return uniqueNominators
  }, [stakers])
  const allValidatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForValidators(),
    [api?.isConnected]
  )
  const allNominatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForNominators(),
    [api?.isConnected]
  )
  const lastValidatorRewards = useFirstObservableValue(
    () => activeEra && api && api.query.staking.erasValidatorReward(activeEra.eraIndex.subn(1)),
    [activeEra, api?.isConnected]
  )
  const totalRewards = useFirstObservableValue(() => api?.derive.staking.erasRewards(), [api?.isConnected])
  const stakingPercentage = useMemo(
    () => (totalIssuance && currentStaking ? currentStaking.muln(1000).div(totalIssuance).toNumber() / 10 : 0),
    [currentStaking, totalIssuance]
  )
  const eraRewardPoints = useObservable(
    () => activeEra && api && api.query.staking.erasRewardPoints(activeEra.eraIndex),
    [api?.isConnected, activeEra]
  )
  return {
    eraStartedOn: activeEra?.eraStartedOn,
    eraRewardPoints,
    idealStaking: new BN(totalIssuance ?? 0).divn(2),
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
