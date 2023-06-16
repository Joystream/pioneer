import { BN } from '@polkadot/util'
import { useMemo } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

import { ERA_DURATION } from '../constants/constant'

export const useStakingStatistics = () => {
  const { api } = useApi()
  const activeEra = useFirstObservableValue(
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
  const totalIssuance = useFirstObservableValue(() => api?.query.balances.totalIssuance(), [api?.isConnected])
  const currentStaking = useFirstObservableValue(
    () => api?.query.staking.erasTotalStake(eraIndex),
    [eraIndex, api?.isConnected]
  )
  const activeValidators = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])
  const activeNominators = useFirstObservableValue(() => api?.query.staking.nominators.entries(), [api?.isConnected])
  const allValidatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForValidators(),
    [api?.isConnected]
  )
  const allNominatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForNominators(),
    [api?.isConnected]
  )
  const lastValidatorRewards = useFirstObservableValue(
    () => api?.query.staking.erasValidatorReward(eraIndex.sub(new BN(1))),
    [eraIndex, api?.isConnected]
  )
  const totalRewards = useFirstObservableValue(() => api?.derive.staking.erasRewards(), [api?.isConnected])

  return useMemo(
    () => ({
      eraStartedOn,
      eraDuration: ERA_DURATION,
      now,
      idealStaking: new BN(totalIssuance ?? 0).div(new BN(2)),
      currentStaking: new BN(currentStaking ?? 0),
      activeValidatorsCount: activeValidators?.length ?? 0,
      acitveNominatorsCount: activeNominators?.length ?? 0,
      allValidatorsCount: allValidatorsCount?.toNumber() ?? 0,
      allNominatorsCount: allNominatorsCount?.toNumber() ?? 0,
      totalRewards: totalRewards?.reduce((total: BN, reward) => total.add(reward.eraReward), new BN(0)),
      lastRewards: new BN(lastValidatorRewards?.toString() ?? 0),
    }),
    [
      eraStartedOn,
      ERA_DURATION,
      now,
      totalIssuance,
      currentStaking,
      activeValidators,
      allValidatorsCount,
      lastValidatorRewards,
      activeNominators,
      allNominatorsCount,
    ]
  )
}
