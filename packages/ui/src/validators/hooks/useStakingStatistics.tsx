import { useEffect, useState } from 'react'
import { useApi } from '@/api/hooks/useApi'
import { map } from 'rxjs'
import { BN } from '@polkadot/util'

import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'

export interface Staking {
  eraStartedOn: Date
  eraDuration: Date
  idealStaking: BN
  currentStaking: BN
  allValidatorsCount: Number
  activeValidatorsCount: Number
  allNominatorsCount: Number
  activNominatorsCount: Number
  totalRewards: BN
  lastRewards: BN
}

export const useStakingStatistics = () => {
  const { api } = useApi()
  const activeEra = useObservable(() => api?.query.staking.activeEra(), [api?.isConnected])
  const now = useObservable(() => api?.query.timestamp.now(), [api?.isConnected])
  const [eraStartedOn, setEraStartedOn] = useState(activeEra?.unwrap().start)
  const [eraDuration] = useState(21600000)
  useEffect(() => {
    setEraStartedOn(activeEra?.unwrap().start)
  }, [activeEra])
  const [idealStaking] = useState(0)
  const currentStaking = useFirstObservableValue(
    () => api?.query.staking.erasTotalStake(activeEra?.unwrap().index ?? 0),
    [api?.isConnected,activeEra]
  )
  const activeValidatorsCount = useFirstObservableValue(() => api?.query.staking.validatorCount(), [api?.isConnected])
  const allValidatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForValidators(),
    [api?.isConnected]
  )
  const allNominators = useFirstObservableValue(() => api?.query.staking.nominators.entries(), [api?.isConnected])

  return {
    eraStartedOn,
    eraDuration,
    now,
    idealStaking,
    currentStaking,
    activeValidatorsCount,
    allValidatorsCount,
  }
}
