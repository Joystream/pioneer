import { catchError, first, map, of, switchMap } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

/**
 * Hook that returns a Set of account addresses that cannot be used as controllers.
 * This includes:
 * - Accounts that are already stash accounts (have a controller set)
 * - Accounts that are actively being used as controllers (have active stake)
 */
export const useUsedControllerAccounts = (): Set<string> | undefined => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  return useObservable(() => {
    if (!api || !allAccounts.length) return of(new Set<string>())
    const addresses = allAccounts.map((acc) => acc.address)
    return api.query.staking.bonded.multi(addresses).pipe(
      switchMap((bondedEntries) => {
        const usedSet = new Set<string>()

        // Find all accounts that are already stash accounts (have a controller set)
        bondedEntries.forEach((bonded, index) => {
          if (bonded.isSome) {
            usedSet.add(addresses[index])
          }
        })

        // Find all controllers that are actively being used
        const controllers = bondedEntries
          .map((bonded, index) => ({
            stash: addresses[index],
            controller: bonded.isSome ? bonded.unwrap().toString() : undefined,
          }))
          .filter((item): item is { stash: string; controller: string } => !!item.controller)
          .map((item) => item.controller)

        if (controllers.length === 0) return of(usedSet)

        return api.query.staking.ledger.multi(controllers).pipe(
          map((ledgers) => {
            ledgers.forEach((ledger, index) => {
              if (ledger.isNone) return
              const ledgerData = ledger.unwrap()
              const activeStake = ledgerData.active.toBn()
              const totalStake = ledgerData.total.toBn()
              const hasUnlocking = ledgerData.unlocking.length > 0
              if (!activeStake.isZero() || !totalStake.isZero() || hasUnlocking) {
                usedSet.add(controllers[index])
              }
            })
            return usedSet
          }),
          first(),
          catchError(() => of(usedSet))
        )
      }),
      first(),
      catchError(() => of(new Set<string>()))
    )
  }, [api?.isConnected, JSON.stringify(allAccounts.map((a) => a.address))])
}

