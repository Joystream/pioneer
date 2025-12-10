import BN from 'bn.js'
import { combineLatest, filter, first, map, of, switchMap } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'

export type MyStakingRole = 'validator' | 'nominator' | 'inactive'

export interface UnlockingChunk {
  era: number
  value: BN
}

interface LedgerInfo {
  controller: string
  active: BN
  total: BN
  unlocking: UnlockingChunk[]
  claimedRewards: number[]
}

export interface MyStashPosition {
  stash: string
  controller?: string
  totalStake: BN
  activeStake: BN
  unlocking: UnlockingChunk[]
  claimedRewards: number[]
  nominations: string[]
  validatorPrefsSet: boolean
  role: MyStakingRole
}

const hasStake = (position: Pick<MyStashPosition, 'totalStake' | 'unlocking'>) => {
  if (!position.totalStake.isZero()) {
    return true
  }

  return position.unlocking.some((chunk) => !chunk.value.isZero())
}

export const useMyStashPositions = (): MyStashPosition[] | undefined => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  return useObservable(() => {
    if (!api || !allAccounts.length) {
      return of(undefined)
    }

    const isReady$ =
      'isReady' in api && typeof api.isReady === 'function'
        ? (api.isReady() as any).pipe(
            filter((ready: any) => Boolean(ready)),
            first()
          )
        : api.rpc.chain.getBlockHash(0).pipe(
            // Just wait for the first emission to ensure API is ready
            first(),
            map(() => true)
          )

    return isReady$.pipe(
      switchMap(() => {
        const addresses = allAccounts.map((account) => account.address)

        const addressIndexMap = new Map(addresses.map((address, index) => [address, index]))

        const bonded$ = api.query.staking.bonded.multi(addresses)
        const validators$ = api.query.staking.validators.multi(addresses)
        const nominators$ = api.query.staking.nominators.multi(addresses)

        return combineLatest([bonded$, validators$, nominators$]).pipe(
          switchMap(([bondedEntries, validatorPrefs, nominators]) => {
            const bondedWithController = bondedEntries.map((bonded, index) => ({
              stash: addresses[index],
              controller: bonded.isSome ? bonded.unwrap().toString() : undefined,
            }))

            const controllers = bondedWithController
              .map(({ controller }) => controller)
              .filter((controller): controller is string => !!controller)

            const ledger$ = controllers.length
              ? api.query.staking.ledger.multi(controllers).pipe(
                  map((ledgers) => {
                    const ledgerMap = new Map<string, LedgerInfo>()

                    ledgers.forEach((ledger, index) => {
                      const controller = controllers[index]
                      if (ledger.isNone) return
                      const ledgerData = ledger.unwrap()

                      ledgerMap.set(ledgerData.stash.toString(), {
                        controller,
                        active: ledgerData.active.toBn(),
                        total: ledgerData.total.toBn(),
                        unlocking: ledgerData.unlocking.map((chunk) => ({
                          era: chunk.era.toNumber(),
                          value: chunk.value.toBn(),
                        })),
                        claimedRewards: ledgerData.claimedRewards.map((era) => era.toNumber()),
                      })
                    })

                    return ledgerMap
                  })
                )
              : of(new Map<string, LedgerInfo>())

            return ledger$.pipe(
              map((ledgerMap) => {
                return bondedWithController
                  .map(({ stash }) => {
                    const addressIndex = addressIndexMap.get(stash) ?? 0
                    const ledgerInfo = ledgerMap.get(stash)
                    const validatorPref = validatorPrefs[addressIndex]
                    const nominationsOpt = nominators[addressIndex]

                    const validatorPrefsSet = !!validatorPref && !validatorPref.isEmpty
                    const nominations =
                      nominationsOpt && !nominationsOpt.isEmpty
                        ? nominationsOpt.unwrap().targets.map((target) => target.toString())
                        : []

                    const role: MyStakingRole = validatorPrefsSet
                      ? 'validator'
                      : nominations.length
                      ? 'nominator'
                      : 'inactive'

                    const totalStake = ledgerInfo?.total ?? BN_ZERO
                    const activeStake = ledgerInfo?.active ?? BN_ZERO
                    const unlocking = ledgerInfo?.unlocking ?? []
                    const claimedRewards = ledgerInfo?.claimedRewards ?? []

                    const position: MyStashPosition = {
                      stash,
                      controller: ledgerInfo?.controller,
                      totalStake,
                      activeStake,
                      unlocking,
                      claimedRewards,
                      nominations,
                      validatorPrefsSet,
                      role,
                    }

                    return position
                  })
                  .filter((position) => hasStake(position))
              })
            )
          })
        )
      })
    )
  }, [api?.isConnected, JSON.stringify(allAccounts.map((a) => a.address))])
}
