import { catchError, first, map, of, switchMap } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export interface UsedControllerAccounts {
  stashAccounts: Set<string>
  controllerAccounts: Set<string>
  restrictedAccounts: Set<string>
}

export const useUsedControllerAccounts = (): UsedControllerAccounts | undefined => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  return useObservable(() => {
    if (!api || !allAccounts.length) {
      return of({
        stashAccounts: new Set<string>(),
        controllerAccounts: new Set<string>(),
        restrictedAccounts: new Set<string>(),
      })
    }
    const addresses = allAccounts.map((acc) => acc.address)
    return api.query.staking.bonded.multi(addresses).pipe(
      switchMap((bondedEntries) => {
        const stashAccounts = new Set<string>()

        // Find all accounts that are already stash accounts (have a controller set)
        bondedEntries.forEach((bonded, index) => {
          if (bonded.isSome) {
            stashAccounts.add(addresses[index])
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

        if (controllers.length === 0) {
          return of({
            stashAccounts,
            controllerAccounts: new Set<string>(),
            restrictedAccounts: new Set<string>(stashAccounts),
          })
        }

        return api.query.staking.ledger.multi(controllers).pipe(
          map((ledgers) => {
            const controllerAccounts = new Set<string>()
            ledgers.forEach((ledger, index) => {
              if (ledger.isNone) return
              const ledgerData = ledger.unwrap()
              const activeStake = ledgerData.active.toBn()
              const totalStake = ledgerData.total.toBn()
              const hasUnlocking = ledgerData.unlocking.length > 0
              if (!activeStake.isZero() || !totalStake.isZero() || hasUnlocking) {
                controllerAccounts.add(controllers[index])
              }
            })
            return {
              stashAccounts,
              controllerAccounts,
              restrictedAccounts: new Set<string>([...stashAccounts, ...controllerAccounts]),
            }
          }),
          first(),
          catchError(() =>
            of({
              stashAccounts,
              controllerAccounts: new Set<string>(),
              restrictedAccounts: new Set<string>(stashAccounts),
            })
          )
        )
      }),
      first(),
      catchError(() =>
        of({
          stashAccounts: new Set<string>(),
          controllerAccounts: new Set<string>(),
          restrictedAccounts: new Set<string>(),
        })
      )
    )
  }, [api?.isConnected, JSON.stringify(allAccounts.map((a) => a.address))])
}
