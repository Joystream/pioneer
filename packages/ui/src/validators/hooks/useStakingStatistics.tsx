import { useState, useEffect, useMemo } from 'react'
import { useApi } from '@/api/hooks/useApi'
import { map } from 'rxjs'
import { BN } from '@polkadot/util'
import { ERA_DURATION } from '../constants/constant'

import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

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
  const { eraIndex, eraStartedOn } = useMemo(() => activeEra ?? { eraIndex: new BN(0), eraStartedOn: new Date(0) }, [activeEra])
  const now = useObservable(() => api?.query.timestamp.now(), [api?.isConnected])
  const [idealStaking] = useState(0)
  const currentStaking = useFirstObservableValue(
    () => api?.query.staking.erasTotalStake(eraIndex),
    [api?.isConnected, eraIndex]
  )
  const activeValidators = useFirstObservableValue(() => api?.query.session.validators(), [api?.isConnected])
  const allValidatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForValidators(),
    [api?.isConnected]
  )
  const lastEraRewards = useFirstObservableValue(
    () => api?.query.staking.erasRewardPoints(eraIndex.sub(new BN(1))),
    [[api?.isConnected, eraIndex]]
  )

  return {
    eraStartedOn,
    eraDuration: ERA_DURATION,
    now,
    idealStaking,
    currentStaking,
    activeValidatorsCount: activeValidators?.length,
    allValidatorsCount,
    // totalRewards,
    lastRewards: lastEraRewards?.total.mul(new BN(10000000000)),
  }
}
