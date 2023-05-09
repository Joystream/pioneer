import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { Address } from '@/common/types'
import { BN } from '@polkadot/util'

export interface Staking {
  eraStartedOn: Date
  eraDuration: Date
  idealStaking: BN
  currentStaking: BN
  validatorsCount: Number
  activeValidatorsCount: Number
  nominatorsCount: Number
  activNominatorsCount: Number
  totalRewards: BN
  lastRewards: BN
}

export interface ValidatorProps {
  accountId: Address
  verified: boolean
  active: boolean
  startedOn: Date
  commision: Number
  health: Number
  APR: Number
  staked: BN
  selfStaked: BN
  totalReward: BN
  claimableReward: BN
  nominators: Address[]
}

export interface NominatorProps {
  accountId: Address
  active: Boolean
  startedOn: Date
  staked: BN
  totalRewarks: BN
  claimableReward: BN
  validators: Nominating[]
}

interface Nominating {
  to: Address
  staking: BN
  stakingOn: Date
}

export const useValidatorsStatistics = () => {
  const { api } = useApi()
  // const [staking, setStaking] = useState<Staking | any>(null)
  // const [validators, setValidators] = useState<ValidatorProps[]>([])
  // const [nominators, setNominators] = useState<NominatorProps[]>([])
  const activeValidatorsCount = useFirstObservableValue(() => api?.query.staking.validatorCount(), [api?.isConnected])
  const allValidatorsCount = useFirstObservableValue(
    () => api?.query.staking.counterForValidators(),
    [api?.isConnected]
  )

  const activeEra = useFirstObservableValue(() => api?.query.staking.activeEra(), [api?.isConnected])
  const totalStake = activeEra
    ? useFirstObservableValue(() => api?.query.staking.erasTotalStake(activeEra.unwrap().index), [api?.isConnected])
    : 0
  const idealStaking = 0
  const eraDuration = 21600000

  return {
    activeValidatorsCount,
    allValidatorsCount,
    totalStake,
    idealStaking,
    eraDuration,
    activeEra
  }
}
