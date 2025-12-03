import BN from 'bn.js'
import { map, of, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'

export interface NominatorInfo {
  isNominating: boolean
  targets: string[]
  activeStake: BN
  totalStake: BN
}

export const useNominatorInfo = (address: string): NominatorInfo | undefined => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api || !address) return of(undefined)

    const nominators$ = api.query.staking.nominators(address).pipe(
      map((nominations) => {
        if (nominations.isEmpty) {
          return { isNominating: false, targets: [] }
        }
        return {
          isNominating: true,
          targets: nominations.unwrap().targets.map((target) => target.toString()),
        }
      })
    )

    const ledger$ = api.query.staking.bonded(address).pipe(
      switchMap((bonded) => {
        if (bonded.isNone) {
          return of({ activeStake: BN_ZERO, totalStake: BN_ZERO })
        }
        const controller = bonded.unwrap().toString()
        return api.query.staking.ledger(controller).pipe(
          map((ledger) => {
            if (ledger.isNone) {
              return { activeStake: BN_ZERO, totalStake: BN_ZERO }
            }
            const ledgerData = ledger.unwrap()
            return {
              activeStake: ledgerData.active.toBn(),
              totalStake: ledgerData.total.toBn(),
            }
          })
        )
      })
    )

    return nominators$.pipe(
      switchMap((nominatorData) =>
        ledger$.pipe(
          map((ledgerData) => ({
            ...nominatorData,
            ...ledgerData,
          }))
        )
      )
    )
  }, [api?.isConnected, address])
}
