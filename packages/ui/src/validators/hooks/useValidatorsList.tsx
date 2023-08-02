import { BN } from '@polkadot/util'
import { useEffect, useState } from 'react'
import { of, map, switchMap, Observable, combineLatest } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { Address } from '@/common/types'
import { MemberWithDetails } from '@/memberships/types'
import { ProxyApi } from '@/proxyApi'

import { Verification, State, Validator } from '../types'

const verifiedValidators = [
  'j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW',
  'j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP',
  'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
  'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
]

const validatorsWithMembership = [
  {
    address: 'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
    membership: {
      id: '0',
      handle: 'alice',
      rootAccount: 'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
      controllerAccount: 'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
      boundAccounts: [],
      inviteCount: 0,
      roles: [],
      isVerified: true,
      isFoundingMember: true,
      isCouncilMember: true,
      createdAt: '2023/08/01',
      entry: {
        type: 'genesis',
      },
      invitees: [],
      externalResources: [
        { source: 'TWITTER', value: 'Alice_twitter' },
        { source: 'DISCORD', value: 'Alice_discord' },
        { source: 'TELEGRAM', value: 'Alice_telegram' },
      ],
    } as MemberWithDetails,
  },
  {
    address: 'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
    membership: {
      id: '1',
      handle: 'bob',
      rootAccount: 'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
      controllerAccount: 'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
      boundAccounts: [],
      inviteCount: 0,
      roles: [],
      isVerified: true,
      isFoundingMember: false,
      isCouncilMember: false,
      createdAt: '2023/08/02',
      entry: {
        type: 'genesis',
      },
      invitees: [],
      externalResources: [
        { source: 'TWITTER', value: 'Bob_twitter' },
        { source: 'DISCORD', value: 'Bob_discord' },
      ],
    } as MemberWithDetails,
  },
  { address: 'j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN', membership: undefined },
  { address: 'j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP', membership: undefined },
]

const getMember = (address: Address) =>
  validatorsWithMembership.find((validator) => validator.address === address)?.membership

export const useValidatorsList = () => {
  const { api } = useApi()
  const [search, setSearch] = useState('')
  const [verification, setVerification] = useState<Verification>(null)
  const [state, setState] = useState<State>(null)
  const [visibleValidators, setVisibleValidators] = useState<Validator[]>([])

  const getValidatorInfo = (address: string, api: ProxyApi): Observable<Validator> => {
    const activeValidators$ = api.query.session.validators()
    const stakingInfo$ = api.query.staking
      .activeEra()
      .pipe(switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)))
    const rewardHistory$ = api.derive.staking.stakerRewards(address)
    const validatorInfo$ = api.query.staking.validators(address)
    return combineLatest([activeValidators$, stakingInfo$, rewardHistory$, validatorInfo$]).pipe(
      map(([activeValidators, stakingInfo, rewardHistory, validatorInfo]) => {
        const encodedAddress = encodeAddress(address)
        return {
          member: getMember(encodedAddress),
          address: encodedAddress,
          verification: verifiedValidators.includes(encodedAddress),
          state: activeValidators.includes(address),
          totalRewards: rewardHistory.reduce((total: BN, data) => total.add(data.eraReward), new BN(0)),
          APR:
            rewardHistory.length === 0 || stakingInfo.total.toBn().isZero()
              ? 0
              : new BN(rewardHistory[rewardHistory.length - 1].eraReward)
                  .mul(new BN(1460 * 100))
                  .mul(validatorInfo.commission.toBn())
                  .div(new BN('1000000000'))
                  .div(stakingInfo.total.toBn())
                  .toNumber(),
          startedOn: Date.now(),
        }
      })
    )
  }

  const getValidatorsInfo = (api: ProxyApi) => {
    return api.query.staking.validators.entries().pipe(
      switchMap((entries) => {
        const validatorAddresses = entries.map((entry) => entry[0].args[0].toString())
        const validatorInfoObservables = validatorAddresses.map((address) => getValidatorInfo(address, api))
        return combineLatest(validatorInfoObservables)
      })
    )
  }

  const allValidators = useFirstObservableValue(() => (api ? getValidatorsInfo(api) : of([])), [api?.isConnected])

  useEffect(() => {
    if (allValidators) {
      setVisibleValidators(
        allValidators
          .filter((validator) => {
            if (state === 'active') return validator.state
            else if (state === 'waiting') return !validator.state
            else return true
          })
          .filter((validator) => {
            if (verification === 'verified') return validator.verification
            else if (verification === 'unverified') return !validator.verification
            else return true
          })
          .filter((validator) => {
            return validator.address.includes(search) || validator.member?.handle.includes(search)
          })
      )
    }
  }, [allValidators, search, verification, state])

  return {
    visibleValidators,
    length: visibleValidators.length,
    filter: {
      search,
      setSearch,
      verification,
      setVerification,
      state,
      setState,
    },
  }
}
